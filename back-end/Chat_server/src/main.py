from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from tortoise.contrib.fastapi import register_tortoise
from src.utils.ConnectionManager import ConnectionManager
from fastapi.staticfiles import StaticFiles
from src.api.v1.api import api_router


app = FastAPI(title="Chat server for CMS")

manager = ConnectionManager()

register_tortoise(
    app,
    db_url="postgres://postgres:mota@localhost:5777/postgres",
    modules={"models": ["src.models.Models"]},
    generate_schemas=True, # Automatically creates tables on startup (dev only)
    add_exception_handlers=True,
)

app.include_router(api_router)

@app.websocket("/ws/chat/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    # 1. Connect and Broadcast New User
    await manager.connect(websocket)
    await manager.broadcast(f"User #{client_id} joined the chat.")

    try:
        while True:
            # 2. Receive message from client
            data = await websocket.receive_text()
            
            # 3. Format message
            message = f"User #{client_id}: {data}"
            
            # 4. Broadcast message to all clients
            await manager.broadcast(message)

    except WebSocketDisconnect:
        # 5. Handle Disconnect
        manager.disconnect(websocket)
        await manager.broadcast(f"User #{client_id} left the chat.")

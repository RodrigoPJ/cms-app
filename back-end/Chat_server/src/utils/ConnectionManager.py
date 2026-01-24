from typing import List
from fastapi import WebSocket


class ConnectionManager:
    """Manages active WebSocket connections and broadcasting messages."""
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        print(f"test-websocket: {websocket}")
        await websocket.accept()
        self.active_connections.append(websocket)
        print(f"Client connected: {websocket.client}")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        print(f"Client disconnected: {websocket.client}")

    def getConnections(self):
        return self.active_connections

    async def broadcast(self, message: str):
        """Sends a message to all active connections."""
        for connection in self.active_connections:
            await connection.send_text(message)

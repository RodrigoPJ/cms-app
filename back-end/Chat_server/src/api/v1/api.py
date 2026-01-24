from fastapi import APIRouter
from src.api.v1.endpoints import conversations, messages, api_examples, users

api_router = APIRouter()
api_router.include_router(messages.router, tags=["messages"])

api_router.include_router(conversations.router, tags=["conversations"])
api_router.include_router(users.router, tags=["users"])
api_router.include_router(api_examples.router, tags=["examples"])

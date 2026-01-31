from fastapi import APIRouter, HTTPException, status
from typing import List
from uuid import UUID
from src.models.Models import Message, Conversation
from src.schemas.schemas import (
    Message_Pydantic_Out, 
    Message_Pydantic_In,
    MessageCreate
)

router = APIRouter()

# 1. Get all messages for a specific conversation
@router.get("/messages/{conversation_id}", response_model=List[Message_Pydantic_Out])
async def get_conversation_messages(conversation_id: UUID):
    """Gets all the messages for a given conversation id and orders it by date of creation"""
    print(conversation_id)
    # Check if conversation exists first
    exists = await Conversation.filter(conversation_id=conversation_id).exists()
    if not exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Conversation not found"
        )
    
    return await Message_Pydantic_Out.from_queryset(
        Message.filter(conversation_id=conversation_id).order_by("created_at")
    )

@router.post("/messages", response_model=Message_Pydantic_Out)
async def create_message(message_in: MessageCreate):
    """Creates a new message for a given conversation"""
    message_data = message_in.model_dump(exclude_unset=True)
    print(message_data)

    conversation = message_data["conversation_id"]
    print(conversation)
    exists = await Conversation.filter(conversation_id=conversation).exists()

    if not exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Conversation not found"
        )
    message_obj = await Message.create(**message_data)
    
    # Convert Tortoise object to Pydantic for the response
    return await Message_Pydantic_Out.from_tortoise_orm(message_obj)
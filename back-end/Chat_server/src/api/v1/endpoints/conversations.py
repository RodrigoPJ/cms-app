import json
from uuid import UUID
from fastapi import APIRouter, HTTPException, status
from typing import List
from src.models.Models import Conversation, User, ConversationParticipant
from src.schemas.schemas import (
    Conversation_Pydantic_Out,
    Conversation_Pydantic_In,
    ConversationCreate
)

router = APIRouter()

@router.get("/conversations/{id}", response_model=List[Conversation_Pydantic_Out])
async def get_conversation(id: str):
    """This is a function that returns all the conversations for a given user"""
    try:
      validated_id = UUID(id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user ID format. Authentication required."
        )

    user_conversations = await Conversation.filter(
            participants__participant_id=validated_id
        ).all()

    return  user_conversations

@router.post("/conversation", response_model=Conversation_Pydantic_Out)
async def create_conversation(convo: ConversationCreate):
    """Creates a new conversation and its relation to the users involved"""
    convo_data = convo.model_dump(exclude_unset=True)
    initiator_id = convo_data.pop("conversation_starter")
    newConversation = await Conversation.create(initiator_id=initiator_id)
    participant_ids = convo_data.pop("participant_ids", [])
    for participant_id in participant_ids:
        await ConversationParticipant.create(
            conversation_id=newConversation.conversation_id,
            participant_id=participant_id)

    return newConversation
    
@router.get("/conversations")
async def get_conversations():
    """Gets all the conversations in the database, meant for admin and maintenance, not client use"""
    conversations = await Conversation.filter().all()
    return conversations


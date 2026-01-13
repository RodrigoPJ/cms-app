import json
from uuid import UUID
from fastapi import APIRouter, HTTPException, status
from typing import List
from src.models.Models import Conversation
from src.schemas.schemas import (
    Conversation_Pydantic_Out,
    Conversation_Pydantic_In,
    ConversationCreate
)

router = APIRouter()

# Get all conversations
@router.get("/conversations/{id}", response_model=List[Conversation_Pydantic_Out])
async def get_all_conversations(id: str):
    try:
      validated_id = UUID(id)
    except ValueError:
    # 2. Return 401 if the string is not a valid UUID
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user ID format. Authentication required."
        )

    user_conversations = await Conversation.filter(participants__id=validated_id).all()

    return  user_conversations

@router.post("/conversations")
async def post_conversation(convo: ConversationCreate):
    convo_data = convo.model_dump(exclude_unset=True)

    if "participant_ids" in convo_data and isinstance(convo_data["participant_ids"], List):
        convo_data["userids"] = json.dumps(convo_data["participant_ids"])
    # .create() returns the Tortoise object
    conversation = await Conversation.create(**convo_data)

    # Convert Tortoise object to Pydantic for the response
    return await Conversation_Pydantic_Out.from_tortoise_orm(conversation)
    
from tortoise.contrib.pydantic import pydantic_model_creator
from src.models.Models import Conversation, Message, User
from typing import List
from pydantic import BaseModel
from uuid import UUID

class MessageCreate(BaseModel):
    message: str
    conversation_id: UUID
    sender_id: UUID

class   ConversationCreate(BaseModel):
    participant_ids: List[str]
    conversation_starter: str

class UserCreate(BaseModel):
    user_id: UUID

# here we have the pydantic modes created form our database objects
Conversation_Pydantic_Out = pydantic_model_creator(Conversation, name="ConversationOut")
Message_Pydantic_Out = pydantic_model_creator(Message, name="MessageOut")
User_Pydantic_Out = pydantic_model_creator(User, name="UserOut")

Message_Pydantic_In = pydantic_model_creator(Message, name="MessageIn", exclude_readonly=True)
Conversation_Pydantic_In = pydantic_model_creator(Conversation, name="ConverstionIn", exclude_readonly=True)
Users_Pydantic_In = pydantic_model_creator(User, name="UserIn", exclude_readonly=True)

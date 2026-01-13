from fastapi import APIRouter, HTTPException, status
from typing import List
from uuid import UUID
from src.models.Models import Message, Conversation, User
from src.schemas.schemas import (
    UserCreate,
    User_Pydantic_Out,
    Users_Pydantic_In
)

router = APIRouter()

@router.post("/users")
async def create_user_stub(user_data: UserCreate):
    # Simply store the UUID so it can be used for foreign keys
    return await User.create(**user_data.model_dump())

@router.get("/users")
async def get_all_users():
    return await User.all()

@router.get("/users/{user_id}", response_model=User_Pydantic_Out)
async def get_user_details(user_id: str):
    # 1. Validate UUID format
    try:
        validated_id = UUID(user_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user ID format."
        )

    # 2. Fetch the user or return 404 if not found in your stub database
    user = await User.get_or_none(id=validated_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found in local system."
        )
    
    return user
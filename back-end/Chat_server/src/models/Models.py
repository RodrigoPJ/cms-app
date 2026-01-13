from tortoise.models import Model
from tortoise import fields

class User(Model):
    # This ID matches the UUID from Auth User
    id = fields.UUIDField(primary_key=True)

    class Meta:  # type: ignore
        table = "external_user_stubs"

class Conversation(Model):
    id = fields.UUIDField(primary_key=True)

    participants = fields.ManyToManyField(
        "models.User", 
        related_name="conversation",
        through="conversation_participants" 
    )

    class Meta:  # type: ignore
        table = "conversation"



class ConversationParticipant(Model):
    # Explicit 'through' model for more control
    conversation = fields.ForeignKeyField("models.Conversation")
    user = fields.ForeignKeyField("models.User")
    joined_at = fields.DatetimeField(auto_now_add=True)

    class Meta:  # type: ignore
        table = "conversation_participants"


class Message(Model):
    id = fields.UUIDField(primary_key=True)
    message = fields.CharField(max_length=255)
    conversation = fields.ForeignKeyField(
        "models.Conversation", 
        related_name="messages",    
        on_delete=fields.CASCADE
    )
    sender = fields.ForeignKeyField("models.User", related_name="sent_messages")

    created_at = fields.DatetimeField(auto_now_add=True)

from tortoise.models import Model
from tortoise import fields

class User(Model):
    # This ID matches the UUID from Auth User
    user_id = fields.UUIDField(primary_key=True)

    class Meta:  # type: ignore
        table = "external_user_stubs"

class Conversation(Model):
    conversation_id = fields.UUIDField(primary_key=True)
    initiator = fields.ForeignKeyField("models.User", related_name="initiator_id")
    date_created = fields.DatetimeField(auto_now_add=True)

    class Meta:  # type: ignore
        table = "conversation"



class ConversationParticipant(Model):
    conversation_participant_id = fields.UUIDField(primary_key=True)
    # Explicit 'through' model for more control
    conversation = fields.ForeignKeyField("models.Conversation", related_name="participants")
    participant = fields.ForeignKeyField("models.User", related_name="participant_id")
    class Meta:  # type: ignore
        table = "conversation_participants"


class Message(Model):
    message_id = fields.UUIDField(primary_key=True)
    message = fields.CharField(max_length=255)
    conversation = fields.ForeignKeyField(
        "models.Conversation", 
        related_name="id",    
        on_delete=fields.CASCADE
    )
    sender = fields.ForeignKeyField("models.User")
    created_at = fields.DatetimeField(auto_now_add=True)

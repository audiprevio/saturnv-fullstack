from marshmallow import Schema, fields, validate
from datetime import datetime

class Date(fields.Field):
    def _serialize(self, value, attr, obj, **kwargs):
        if value is None:
            return None
        return value.isoformat()

    def _deserialize(self, value, attr, data, **kwargs):
        date = datetime.strptime(value, "%Y-%m-%d").date()
        return datetime.combine(date, datetime.min.time())
class LocationSchema(Schema):
    lat = fields.Float(required=True, error_messages={"required": "Latitude is a required field."})
    lng = fields.Float(required=True, error_messages={"required": "Longitude is a required field."})

from marshmallow import Schema, fields, validate

class TaskSchema(Schema):
    taskName = fields.Str(required=True, validate=validate.Length(min=1), error_messages={"required": "Task name is a required field."})
    personInCharge = fields.Str(required=True, validate=validate.Length(min=1), error_messages={"required": "Person in charge is a required field."})
    personInChargeEmail = fields.List(fields.Str(validate=validate.Length(min=1)), required=True, error_messages={"required": "Person in charge email is a required field."})
    supervisor = fields.Str(required=True, validate=validate.Length(min=1), error_messages={"required": "Supervisor is a required field."})
    supervisorInChargeEmail = fields.List(fields.Str(validate=validate.Length(min=1)), required=True, error_messages={"required": "Supervisor in charge email is a required field."})
    createdAt = Date(required=True, error_messages={"required": "Created at is a required field."})
    deadline = Date(required=True, error_messages={"required": "Deadline is a required field."})
    taskLocation = fields.Nested(LocationSchema, required=True, error_messages={"required": "Task location is a required field."})
    taskDescription = fields.Str(required=True, validate=validate.Length(min=1), error_messages={"required": "Task description is a required field."})
    taskStatus = fields.Str(validate=validate.OneOf(['Finished', 'On-Going', 'Overdue', 'Dropped']), missing='On-Going', error_messages={"required": "Task status is a required field."})
    taskPriority = fields.Str(validate=validate.OneOf(['High', 'Medium', 'Low']), missing='Low', error_messages={"required": "Task priority is a required field."})
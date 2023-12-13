from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    email = fields.Email(required=True, error_messages={"required": "Email is a required field."})
    firstName = fields.Str(required=True, validate=validate.Length(min=1), error_messages={"required": "First name is a required field."})
    lastName = fields.Str(required=True, validate=validate.Length(min=1), error_messages={"required": "Last name is a required field."})
    password = fields.Str(required=True, validate=validate.Length(min=1), error_messages={"required": "Password is a required field."})
    jobTitle = fields.Str(required=True, validate=validate.Length(min=1), error_messages={"required": "Job title is a required field."})
    role = fields.Str(validate=validate.OneOf(['staff', 'admin']), missing='staff', error_messages={"required": "Role is a required field."})
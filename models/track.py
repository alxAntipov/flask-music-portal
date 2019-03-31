from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

track_schema = {
    "type": "object",
    "properties": {
        "asrtist": {
            "type": "string",
        },
         "name": {
            "type": "string",
        },
         "path": {
            "type": "string",
        }
    },
    "required": ["path", "name"],
    "additionalProperties": False
}


def validate_track(data):
    try:
        validate(data, track_schema)
    except ValidationError as e:
        return {'status': False, 'message': e}
    except SchemaError as e:
        return {'status': False, 'message': e}
    return {'status': True, 'data': data}
import json
from adapter import Adapter


def cf_handler(request):
    print(request)
    adapter = Adapter(request.json)
    return json.dumps(adapter.result)



# def http(request):
#     """Responds to any HTTP request.
#     Args:
#         request (flask.Request): HTTP request object.
#     Returns:
#         The response text or any set of values that can be turned into a
#         Response object using
#         `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
#     """
#     return f'Hello World!'


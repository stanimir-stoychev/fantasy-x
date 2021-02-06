import json
from adapter import Adapter


def cf_handler(request):
    adapter = Adapter(request.json)
    return json.dumps(adapter.result)

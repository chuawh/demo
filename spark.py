import requests
import json

token="Bearer MjliOTQyMDgtODMzZS00NWZjLWEyOWQtODljYTM2ZGMzN2I4OGE0ZmQzYzItNTk4"
roomName="AAA"

def _url(path):
    return 'https://api.ciscospark.com/v1' + path
    
#POST Requests
def post_createroom(at,title):
    headers = {'Authorization':at, 'content-type':'application/json'}
    payload = {'title':title}
    resp = requests.post(url=_url('/rooms'),json=payload, headers=headers)
    dict = json.loads(resp.text)
    dict['statuscode']=str(resp.status_code)
    return dict
    
post_createroom(token,roomName)

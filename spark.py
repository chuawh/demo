import requests
import urllib2

SPARK_API_TOKEN="Bearer MjliOTQyMDgtODMzZS00NWZjLWEyOWQtODljYTM2ZGMzN2I4OGE0ZmQzYzItNTk4"

def http_post(url,headers,data):
    req = urllib2.Request(url,headers=headers)
    response = urllib2.urlopen(req, json.dumps(data))
    return response


# Auth header for the HTTP requests
headers = {
	"Authorization": "Bearer "+SPARK_API_TOKEN,
	"Content-type": "application/json"
}

##  Create the room
roomInfo = {
	"title": "Tropo Python"
}
response = http_post("https://api.ciscospark.com/v1/rooms",headers,roomInfo)
data = json.load(response)   
log(data["id"])

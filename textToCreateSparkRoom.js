importPackage(java.net);
importPackage(java.io);
importPackage(java.util);

function post(urlString, body) {
    var url = new URL(urlString);
    log("Opening connection.");
    var connection = url.openConnection();
    connection.setRequestMethod("POST");
    connection.setDoOutput(true);
    connection.setRequestProperty('Content-Type', 'application/json');
    connection.setRequestProperty('Authorization', 'Bearer MjliOTQyMDgtODMzZS00NWZjLWEyOWQtODljYTM2ZGMzN2I4OGE0ZmQzYzItNTk4');

    log("Sending output.");
    var output = new DataOutputStream(connection.getOutputStream());
    output.writeBytes(body);
    output.flush();
    output.close();
    
    var responseCode = connection.getResponseCode();
    log("Response is: " + responseCode);

    var scanner = new Scanner(connection.getInputStream(), "UTF-8").useDelimiter("\\A");  
    var result = scanner.next();
    log("Result is: " + result);
    scanner.close();
    return [responseCode, result];  
}

//Get the content from SMS
var str=currentCall.initialText;
//var myStr=str.split(',');
var roomName=str;
var sparkMessage='Testing Spark Demo for Spark for room with name '+ roomName;

//log("roomName is: " + myStr[0]);
//log("The Spark Message is: " + myStr[1]);

//createRoom

function createRoom(str1){
var jsonRoomName={'title':str1};
log("********** The Room Name is ----> " + roomName + "*******************");
var httpResponse= post("https://api.ciscospark.com/v1/rooms",JSON.stringify(jsonRoomName));
log("ResponseCode is:" + httpResponse[0]);
log("The Spark Response is:" + httpResponse[1]);

var room=eval ("(" + httpResponse[1] + ")");
log("The Spark Room ID is:" + room.id);

if (httpResponse[0]==200) {
message("The Spark Room named " + roomName + " has successfully created." + "The Room id is " + room.id, {
	    to:"+6597809414",
	    network:"SMS"
	});
  }
  postMessage(room.id,sparkMessage);
}


//Post message to room
//function postMessage(str2){
//var messageContent='Welcome to the Spark';
//var roomMessage={'roomId':str2, 'text':messageContent}; 
//var httpResponse1= post("https://api.ciscospark.com/v1/messages",JSON.stringify(roomMessage));
//log("ResponseCode is:" + httpResponse1[0]);
//log("The Spark Response is:" + httpResponse1[1]);
//}

function postMessage(str2,str3){
var messageJson={'roomId':str2, 'text':str3}; 
var httpResponse1= post("https://api.ciscospark.com/v1/messages",JSON.stringify(messageJson));
log("ResponseCode is:" + httpResponse1[0]);
log("The Spark Response is:" + httpResponse1[1]);
}

createRoom(roomName);

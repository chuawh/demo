
importPackage(java.net);
importPackage(java.io);
importPackage(java.util);

function sendHttpRequest(urlString, body,method) {
    var url = new URL(urlString);
    log("Opening connection.");
    var connection = url.openConnection();
    connection.setRequestMethod(method);
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
//var str=currentCall.initialText;
var str=texting;
//var myStr=str.split(',');
var roomName=str;
var sparkMessage='Testing Spark Demo for Spark for room with name '+ roomName;
var filelink='http://media.caranddriver.com/images/media/51/25-cars-worth-waiting-for-lp-ford-gt-photo-658253-s-original.jpg';

//log("roomName is: " + myStr[0]);
//log("The Spark Message is: " + myStr[1]);

//createRoom

function createRoom(str1){
var jsonRoomName={'title':str1};
log("********** The Room Name is ----> " + roomName + "*******************");
var httpResponse=sendHttpRequest("https://api.ciscospark.com/v1/rooms",JSON.stringify(jsonRoomName),"post");
log("ResponseCode is:" + httpResponse[0]);
log("The Spark Response is:" + httpResponse[1]);

var room=eval ("(" + httpResponse[1] + ")");
log("The Spark Room ID is:" + room.id);

/*
if (httpResponse[0]==200) {
message("The Spark Room named " + roomName + " has successfully created." + "The Room id is " + room.id, {
	    to:"+6597809414",
	    network:"SMS"
	});
  }*/
  postMessage(room.id,sparkMessage,filelink);
  addMember(room.id,'weihong.chua@tropo.com');
}


function postMessage(str2,str3,str4){
var messageJson={'roomId':str2, 'text':str3,'files':[str4]}; 
var httpResponse1= sendHttpRequest("https://api.ciscospark.com/v1/messages",JSON.stringify(messageJson),"post");
log("ResponseCode is:" + httpResponse1[0]);
log("The Spark Response is:" + httpResponse1[1]);
}


function addMember(str5, str6){
var addMemberJson={'roomId':str5, 'personEmail':str6}; 
var httpResponse2= sendHttpRequest("https://api.ciscospark.com/v1/memberships",JSON.stringify(addMemberJson),"post");
log("ResponseCode is:" + httpResponse2[0]);
log("The Spark Response is:" + httpResponse2[1]);
}

createRoom(roomName);

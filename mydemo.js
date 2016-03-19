
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

/*
function sendGetHttpRequest(urlString,method) {
    var url = new URL(urlString);
    log("Opening connection.");
    var connection = url.openConnection();
    connection.setRequestMethod(method);
    connection.setDoOutput(true);
    connection.setRequestProperty('Content-Type', 'application/json');
    connection.setRequestProperty('Authorization', 'Bearer MjliOTQyMDgtODMzZS00NWZjLWEyOWQtODljYTM2ZGMzN2I4OGE0ZmQzYzItNTk4');

     log("Sending output.");
     var output = new DataOutputStream(connection.getOutputStream());
   // output.writeBytes(body);
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
*/

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
var httpResponse=sendHttpRequest("https://api.ciscospark.com/v1/rooms",JSON.stringify(jsonRoomName),"POST");
log("createRoom ResponseCode is:" + httpResponse[0]);
log("The createRoom Spark Response is:" + httpResponse[1]);

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
  
  
  var myRoomSipAddress=getRoomDetails(room.id);
  call('sip:whongchu@cisco.com');
  say("please wait while we connect your call");
  transfer(myRoomSipAddress);
}


function postMessage(str2,str3,str4){
var messageJson={'roomId':str2, 'text':str3,'files':[str4]}; 
var httpResponse1= sendHttpRequest("https://api.ciscospark.com/v1/messages",JSON.stringify(messageJson),"POST");
log("postMessage ResponseCode is:" + httpResponse1[0]);
log("The Spark postMessage Response is:" + httpResponse1[1]);
}


function addMember(str5, str6){
var addMemberJson={'roomId':str5, 'personEmail':str6}; 
var httpResponse2= sendHttpRequest("https://api.ciscospark.com/v1/memberships",JSON.stringify(addMemberJson),"POST");
log("addMember ResponseCode is:" + httpResponse2[0]);
log("The Spark addMember Response is:" + httpResponse2[1]);
}


function getRoomDetails(str7){
//var roomDetailsJson=null; 
var httpResponse3= sendHttpRequest("https://api.ciscospark.com/v1/rooms/" + str7 + "?showSipAddress=true",JSON.stringify({'':''}),"GET");
log("getRoomDetails ResponseCode is:" + httpResponse3[0]);
log("The Spark getRoomDetails Response is:" + httpResponse3[1]);
var roomSipAddress=eval ("(" + httpResponse3[1] + ")");
log("The Spark Room SipAddress is: " + roomSipAddress.sipAddress);
return(roomSipAddress.sipAddress);
}

createRoom(roomName);

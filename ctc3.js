//var customerNbr=mobile;
//var agentNbr=agentNumber;


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
    connection.setRequestProperty('Authorization', 'Bearer YzgyY2JmNWYtNmRiOS00MDJiLWJmYWMtNzEwZTkxNjUyOGZhNmYwOTllOTItYzY2');

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


var roomName='Diagnose outcome discussion';
var sparkMessage='Testing Spark Demo for Spark for room with name '+ roomName;
var filelink='http://media.caranddriver.com/images/media/51/25-cars-worth-waiting-for-lp-ford-gt-photo-658253-s-original.jpg';


function createRoom(str1){
var jsonRoomName={'title':str1};
log("********** The Room Name is ----> " + roomName + "*******************");
var httpResponse= post("https://api.ciscospark.com/v1/rooms",JSON.stringify(jsonRoomName));
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
var httpResponse1= post("https://api.ciscospark.com/v1/messages",JSON.stringify(messageJson));
log("ResponseCode is:" + httpResponse1[0]);
log("The Spark Response is:" + httpResponse1[1]);
}


function addMember(str5, str6){
var addMemberJson={'roomId':str5, 'personEmail':str6}; 
var httpResponse2= post("https://api.ciscospark.com/v1/memberships",JSON.stringify(addMemberJson));
log("ResponseCode is:" + httpResponse2[0]);
log("The Spark Response is:" + httpResponse2[1]);
}




 
//Tropo app starts here 
 
call("sip:whongchu@cisco.com" , {
	   timeout:60,
	      onAnswer: function() {
	       log("Obnoxious call complete");
	   },
	   onTimeout: function() {
	       log("Call timed out");
	   },
	   onCallFailure: function() {
	       log("Call could not be completed as dialed");
	   }
	});
	
var result=ask("Welcome to Telemedicine demo.  Please choose from the following option. Press 1 if you want to send a SMS meeting schedule to the doctor , Press 2 if you want to talk to the doctor now", {
              choices:"1,2,3",
              timeout:15,
              mode:"dtmf",
              bargein:true
            });
say("You chose" + result.value);

if (result.value==1)
          message("Please join the webex meeting at http://acecloud.webex.com with Host PIN: 1234" +'\n'
                   + "Patient Number: " + PatientRegistrationNumber +'\n'+ "Case Category: " + CaseCategory +'\n' + "Summary: " + Summary,  {
          to:'+' + DoctorNumber,
          network:"SMS"
          });
 else if  (result.value==2) { 	
 	  message("Patient Details" +'\n'
                   + "Patient Number: " + PatientRegistrationNumber +'\n'+ "Case Category: " + CaseCategory +'\n' + "Summary: " + Summary,  {
          to:'+' + DoctorNumber,
          network:"SMS"
          });
         say("Please wait while we transfer your call to the doctor");
         transfer("sip:whongchu@cisco.com", {
       	        timeout:30,
         	onTimeout: function(event) {
                    say("Sorry, but nobody answered");
                }
        });     
      }
else if  (result.value==3) {
      	createRoom(roomName);
      } 
      else {
            say( "Goodbye" );
            hangup();
       }     

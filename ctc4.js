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
var sparkMessage='Spark room discussion for patient: '+ '\n' + 'Patient Registration Number: ' + PatientRegistrationNumber + '\n' + 'Case Category: ' + CaseCategory + '\n' + 'Summary: ' + Summary; 


function createRoom(str1){
var NurseEmailladd='weihong.chua@tropo.com';	
var jsonRoomName={'title':str1};
var httpResponse= post("https://api.ciscospark.com/v1/rooms",JSON.stringify(jsonRoomName));
log("ResponseCode is:" + httpResponse[0]);
log("The Spark Response is:" + httpResponse[1]);

var room=eval ("(" + httpResponse[1] + ")");
log("The Spark Room ID is:" + room.id);

  postMessage(room.id,sparkMessage);
  addMember(room.id, NurseEmailladd);
}


function postMessage(str2,str3){
var messageJson={'roomId':str2, 'text':str3}; 
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
 
call("sip:whongchu@cisco.com", {
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
	
var result=ask("You have an incoming medical assistance request. Press 1 to speak to the nurse now, press 2 to schedule a meeting via SMS, press 3 to create a Spark room", {
              choices:"1,2,3",
              timeout:15,
              mode:"dtmf",
              bargein:true
            });
say("You chose" + result.value);

if (result.value==1){
	message("Patient Details: " + '\n' + "Patient Registration Number: " + PatientRegistrationNumber + '\n' + "Case Category: " + CaseCategory + '\n' + "Summary: " + Summary,{
         to:'+' + NurseNumber,
          network:"SMS"
          });
          
         say("Please wait while we transfer your call to the nurse");
         transfer('+' + NurseNumber, {
       	        timeout:30,
         	onTimeout: function(event) {
                    say("Sorry, but nobody answered");
                }
        });     
      }
 else if  (result.value==2) { 	
 	
 	 message("Please join the webex meeting with doctor at 4pm. -> http://acecloud.webex.com" +'\n'+ "Guess PIN: 5678", {
          to:'+' + NurseNumber,
          network:"SMS"
          });
        
         message("Meeting schedule with nurse at http://acecloud.webex.com" +'\n'+ "Host PIN: 1234", {
          to:'+' + DoctorNumber,
          network:"SMS"
          });
          
          hangup();
      }
else if  (result.value==3) {
      	createRoom(roomName);
      } 
      else {
            say( "Goodbye" );
            hangup();
       }     

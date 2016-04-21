//var customerNbr=mobile;
//var agentNbr=agentNumber;
 
call("whongchu@cisco.com" , {
	   timeout:60,
	      onAnswer: function() {
	       log("Obnoxious call complete");
	       log("The caller is: " + currentCall.callerID);
	       log("The callee is: " + currentCall.calledID);
	   },
	   onTimeout: function() {
	       log("Call timed out");
	   },
	   onCallFailure: function() {
	       log("Call could not be completed as dialed");
	   }
	});
	
var result=ask("What would like to do? Please choose from the following option. Press 1 if you want to send an SMS to the doctor, Press 2 if you want to
              talk to the doctor now", {
              choices:"1,2",
              timeout:15,
              mode:"both",
              bargein:true
            });
say("You chose" + result.value);

if (result.value==1){
    message("Please join the webex meeting at http://acecloud.webex.com, Host PIN: 1234", {
    to:"+6597809414",
    network:"SMS"
    });
    }elseif (result.value==2){
    say("Please wait while we transfer your call to the doctor");
transfer('+' + customerNbr, {
	callerID:currentCall.calledID,
	onTimeout: function(event) {
        say("Sorry, but nobody answered");
    }
 });
}

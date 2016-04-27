
var customerNbr=mobile;
var agentNbr=agentNumber;
 
call("sip:whongchu@cisco.com" , {
	   timeout:60,
	      onAnswer: function() {
	       say("Please wait while we transfer your call to the customer");
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

transfer('+' + customerNbr, {
	callerID:currentCall.calledID,
	onTimeout: function(event) {
        say("Sorry, but nobody answered");
    }
});



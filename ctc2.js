
var customerNbr=mobile;
var agentNbr=agentNumber;
 
call('+' + agentNbr , {
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

        //transfer('+' + customerNbr, {
	transfer("sip:whongchu@cisco.com", {
	callerID:currentCall.calledID,
	onTimeout: function(event) {
        say("Sorry, but nobody answered");
    }
});



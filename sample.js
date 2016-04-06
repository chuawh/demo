var customerNbr=mobile;
var agentNbr=agentNumber;
 
call('+' + agentNbr , {
	   timeout:60,
	      onAnswer: function() {
	       say("Please wait while we tranfer your call to the customer");
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

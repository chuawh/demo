
var customerNbr=mobile;
var agentNbr=agentNumber;
 
call('+' + agentNbr , {
	   timeout:60,
	      onAnswer: function() {
	       say("Pleawe wait while we tranfer your call to the customer");
	       log("Obnoxious call complete");
	   },
	   onTimeout: function() {
	       log("Call timed out");
	   },
	   onCallFailure: function() {
	       log("Call could not be completed as dialed");
	   }
	});

transfer('+' + customerNbr);

message("The caller number is:" + currentCall.callerID + "The callee is: " + currentCall.calledID, {
	    to:"+6597809414",
	    network:"SMS"
	});

var customerNbr=mobile;
var sparkRommSipUri=sparkNumber;
 
call( sparkRommSipUri, {
	   timeout:60,
	      onAnswer: function() {
	       say("Please wait while we connect your call to Cisco Spark Room");
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

transfer(sparkRommSipUri {
	callerID:currentCall.calledID,
	onTimeout: function(event) {
        say("Sorry, but nobody answered");
    }
});

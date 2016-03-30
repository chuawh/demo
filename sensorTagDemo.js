var nbrToDial=mobile;
 
call('+' + nbrToDial , {
	   timeout:60,
	      onAnswer: function() {
	       say("This is a test call from CC2650 wireless MCU sensor device. An emergency alarm has been activated. Please join the emergency team Spark room now.Thank you");
	       log("Test call complete");
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

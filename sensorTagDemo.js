var nbrToDial=mobile;

call('+' + nbrToDial , {
	   timeout:60,
	      onAnswer: function() {
	       say("This is a test call from C C 2 6 5 0 wireless MCU sensor device. An emergency alarm has been activated. Please join the emergency team Spark room now.Thank you",{voice: "Ava"});
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
	
message("An emergency alarm has been activated. Please join the emergency team Spark room now.Thank you", {
    to:"+6597809414",
    network:"SMS"
});


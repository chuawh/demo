call('sip:whongchu@cisco.com', {
	   timeout:60,
	      onAnswer: function() {
	       say("You have a new insurance query");
	       wait(500);
	       say("The Car Registration Number is" + CarRegistrationNumber);
	       wait(500);
	       say("The estimated car value is" + Carvalue);
	       wait(500);
	       say("The use of vehicle is" + UseofVehicle);
	       wait(500);
	       say("The caller number is:" + moblie);
	       log("Obnoxious call complete");
	   },
	   onTimeout: function() {
	       log("Call timed out");
	   },
	   onCallFailure: function() {
	       log("Call could not be completed as dialed");
	   }
	});

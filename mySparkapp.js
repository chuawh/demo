var customerNbr=mobile;
var sparkRoomSipUri=sparkNumber;
 
message("Received office voice mail", {
    to:"+14075550100",
    network:"SMS"
});

call(customerNbr, {
	   timeout:120,
	      onAnswer: function() {
	       say("Please wait while we connect your call to Cisco Spark Room");
	   },
	   onTimeout: function() {
	       log("Call timed out");
	   },
	   onCallFailure: function() {
	       log("Call could not be completed as dialed");
	   }
	});

transfer(sparkRoomSipUri);

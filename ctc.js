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
	       say("The caller number is:" + mobile);
	       log("Obnoxious call complete");
	   },
	   onTimeout: function() {
	       log("Call timed out");
	   },
	   onCallFailure: function() {
	       log("Call could not be completed as dialed");
	   }
	});
	

/*	
talk(mobile);

function talk(nbrToDial){
var result=ask("If you would like to speak to customer, Then Press 1. Else, press 9 to terminate this call", {
    choices:"1,9",
    terminator:"#",
    timeout:15.0,
    mode:"dtmf",
    interdigitTimeout: 5,});

    if (result.value=="1"){
         say( "Please wait while we transfer your call");
         transfer(nbrToDial, {
            playvalue: "http://www.phono.com/audio/holdmusic.mp3",
            terminator: "*",
            onTimeout: function(event) {
         say("Sorry, but nobody answered");}
         }
       else
            say( "Goodbye" );
            hangup();
    }
}
*/

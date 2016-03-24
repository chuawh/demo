var nbr=mobile;

function say_as(value,type){
    ssml_start="<?xml version='1.0'?><speak>";
    ssml_end="</say-as></speak>";
    ssml ="<say-as interpret-as='vxml:"+ type + "'>" + value+"";
    //ssml_tts="<s>안녕하세요.만아서 반갑습니다.</s>";
    complete_string = ssml_start + ssml + ssml_end;
    log('@@ Say as: ' + complete_string);
    say(complete_string);
}
 
//wait(3000);
/* 
say_as('USD51.33','currency');
say_as('20314253','digits');
say_as('2031.435','number');
say_as('4075551212','phone');
say_as('20090226','date');
say_as('0515a','time');
*/

call('+85292118355' , {
	   timeout:60,
	      onAnswer: function() {
	       say("You have a new insurance query");
	       wait(500);
	      // say("The Car Registration Number is" + CarRegistrationNumber);
	       say("The Car Registration Number is");
	       say_as(CarRegistrationNumber,'digits');
	       wait(500);
	       //say("The estimated car value is" + Carvalue);
	       say("The estimated car value is");
	       say_as(Carvalue,'number');
	       wait(500);
	       say("The use of vehicle is" + UseofVehicle);
	       wait(500);
	       //say("The caller number is:" + mobile);
	       say("The caller number is");
	       say_as(mobile,'phone');
	       wait(1000);
	       log("Obnoxious call complete");
	   },
	   onTimeout: function() {
	       log("Call timed out");
	   },
	   onCallFailure: function() {
	       log("Call could not be completed as dialed");
	   }
	});
	
var result=ask("If you would like to speak to customer, Then Press 1. Else, press 9 to terminate this call", {
    choices:"1,9",
    terminator:"#",
    timeout:15.0,
    mode:"dtmf",
    interdigitTimeout: 5,});

if (result.value==1){
      say( "Please wait while we transfer your call");
      transfer('+442088248488');
      }  
      else {
            say( "Goodbye" );
            hangup();
       }     
       


var smsContent = data;
var mobileNbr=mobile;

message("You have a new Spark Message" + '\n' + smsContent, {
    to:"+" + mobileNbr,
    network:"SMS"
});

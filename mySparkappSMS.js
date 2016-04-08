var smsContent = data;
var mobileNbr=mobile;

message(smsContent, {
    to:mobileNbr,
    network:"SMS"
});

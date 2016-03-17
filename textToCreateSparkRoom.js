importPackage(java.net);
importPackage(java.io);
importPackage(java.util);

function post(urlString, body) {
    var url = new URL(urlString);
    log("Opening connection.");
    var connection = url.openConnection();
    connection.setRequestMethod("POST");
    connection.setDoOutput(true);
    connection.setRequestProperty('Content-Type', 'application/json');
    connection.setRequestProperty('Authorization', 'Bearer MjliOTQyMDgtODMzZS00NWZjLWEyOWQtODljYTM2ZGMzN2I4OGE0ZmQzYzItNTk4');

    log("Sending output.");
    var output = new DataOutputStream(connection.getOutputStream());
    output.writeBytes(body);
    output.flush();
    output.close();
    
    var responseCode = connection.getResponseCode();
    log("Response is: " + responseCode);

    var scanner = new Scanner(connection.getInputStream(), "UTF-8").useDelimiter("\\A");  
    var result = scanner.next();
    log("Result is: " + result);
    scanner.close();
    return [responseCode, result];  
}

var roomName=currentCall.initialText;
var jsonRoomName={'title':roomName};
log("********** The Room Name is ----> " + roomName + "*******************");
var httpResponse= post("https://api.ciscospark.com/v1/rooms",JSON.stringify(jsonRoomName));
log("ResponseCode is:" + httpResponse[0]);
log("The Spark Response is:" + httpResponse[1]);


if (httpResponse[0]==200) {
message("The Spark Room named " + roomName + " has successfully created", {
	    to:"+6597809414",
	    network:"SMS"
	});
}

importPackage(java.net);
importPackage(java.io);
importPackage(java.util);

function sendHttpRequest(urlString, body,method) {
    var url = new URL(urlString);
    log("Opening connection.");
    var connection = url.openConnection();
    connection.setRequestMethod(method);
    connection.setDoOutput(true);
    connection.setRequestProperty('Content-Type', 'application/json');
    connection.setRequestProperty('Authorization', '');

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


//http post to IOT demo app
function triggerIOTdemo(){
var jsonData={
               'name':"Test Event-1",
               'geo':"123, Street 17 , Ave 2",
               'DateTimePlus4': "18:00",
               'building':"Tower A, East Wing",
               'level': "23th floor",
                'atag':"E23-03c"
              };
var httpResponse=sendHttpRequest("http://iotdemo.tpcall.me/iotevent",JSON.stringify(jsonData),"POST");
log("IOT demo app ResponseCode is:" + httpResponse[0]);
log("IOT demo app Response is:" + httpResponse[1]);
}








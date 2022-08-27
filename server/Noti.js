export async function sendNoti(token,username) {
    var myHeaders = new Headers();
myHeaders.append("Host", "exp.host");
myHeaders.append("Accept", "application/json");
myHeaders.append("Accept-Encoding", "gzip, deflate");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("auth_key", "Francisco.Klocko15@yahoo.com");

var raw = JSON.stringify({
  "to": token,
  "title": "attention !!",
  "body": username+" entered in your zone !!"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://exp.host/--/api/v2/push/send", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
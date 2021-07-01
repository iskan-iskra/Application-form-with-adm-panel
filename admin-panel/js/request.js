
const request = new XMLHttpRequest();
const url = "http://localhost:8000/users";
var resultResponse;   
request.open('GET', url, true);
request.setRequestHeader('Content-Type', 'application/json');
request.addEventListener("load", () => {
    if (request.readyState === 4 && request.status === 200) {
        resultResponse = JSON.parse(request.response);
    }
    getUsers(resultResponse);
});
request.send();

function objectDelete(id){
    request.open('DELETE', url+'/'+id, true);
    request.setRequestHeader('Content-Type', 'application/json');
    reloadPage();
    request.send();
}

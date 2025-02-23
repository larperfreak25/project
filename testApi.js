function sendAPI() {
    fetch('/testjson', {
        method: 'GET' //use HTTP GET method
    })
    .then(response => {
        return response.json(); //Parse the JSON response into JavaScript object
    })
    .then(obj => {
        console.log(obj); //Print out the response using console.log.
        var paraElement = document.getElementById("para"); 
        paraElement.innerHTML = obj.message;
    })
    .catch(error => {
        console.error('Error encountered:', error); // Handle errors
    });
}

function sendAPIText() {
    fetch('/testtext', {
        method: 'GET' //use HTTP GET method
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('The response from server is not OK!');
        }
        return response.text(); //Parse the text response
    })
    .then(obj => {
        console.log(obj); //Print out the response using console.log.
        var paraElement = document.getElementById("para");
        paraElement.innerHTML = obj;
    })
    .catch(error => {
        console.error('Error encountered:', error); // Handle errors
    });
}
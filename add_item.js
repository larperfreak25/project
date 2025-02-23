function addItemData() {
    var formElement = document.getElementById('insertForm');
    var formData = new FormData(formElement);
    var itemData = Object.fromEntries(formData.entries());
    var jsonString = JSON.stringify(itemData)
    fetch('/item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonString
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error: The response was not ok, please check logs for error message.');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            location.href = "/item.html";
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
}
function setItemDetail(item) {
    // Set the values of the form fields using the item object
    document.getElementById('item_id').value = item.item_id;
    document.getElementById('item_name').value = item.item_name;
    document.getElementById('item_cost').value = item.item_cost;
    document.getElementById('item_image').value = item.item_image;
    document.getElementById('availability').value = item.availability;
    document.getElementById('item_quantity').value = item.item_quantity;
}

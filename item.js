// function loadItemData() {

//     var itemArray = [];

//     fetch('/item', {
//         method: 'GET'
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Error: The response was not ok, please check logs for error message.');
//             }
//             return response.json(); // Parse the JSON response
//         })
//         .then(data => {
//             //retrieve response and store it in restaurantArray
//             itemArray = data
//             //print out the array in console
//             insertDynamicItems(itemArray);
//         })
//         .catch(error => {
//             console.error('Error:', error); // Handle errors
//         });
// }
// function insertDynamicItems(arrayOfItem) {
//     var dynamicItemList = document.getElementById("dynamicItemDetails");
//     console.log(dynamicItemList);
//     var newContent = "<table><tr>";
//     // Loop through the restaurantArray elements
//     for (var i = 0; i < arrayOfItem.length; i++) {
//         // Log the current restaurant object to the console

//         // Build up the HTML string for this restaurant
//         newContent +=
//             "<td><h4>" + arrayOfItem[i].item_name + "</h4>" +
//             "<img src='images/" + arrayOfItem[i].item_image + "' width='150'><br>" +
//             "Cost: " + arrayOfItem[i].item_cost + "<br>" +
//             "Availability: " + arrayOfItem[i].availability + "<br>" +
//             "Quantity: " + arrayOfItem[i].item_quantity + "<br>" +
//             "<button type='button' onclick='editItem(this)' restId='" + arrayOfItem[i].item_id + "'>Edit</button>" +
//             "<button type='button' onclick='deleteItemData(this)' restId='" + arrayOfItem[i].item_id + "'>Delete</button>" +
//             "</td>";
//         // After every third restaurant, end the current row and start a new one
//         if ((i + 1) % 3 === 0 && i < arrayOfItem.length - 1) {
//             newContent += "</tr><tr>";
//         }
//     }
//     newContent += "</tr></table>"
//     dynamicItemList.innerHTML = newContent;
// }

function navigate() {
    location.href = "add_item.html"
}
function deleteItemData(buttonElement) {
    var id = buttonElement.getAttribute("restId");
    var api_url = "/item/" + id;

    fetch(api_url, {
        method: 'DELETE'
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
function editItem(btnElement) {
    var id = btnElement.getAttribute("restId");
    location.href = "/update_item.html?id=" + id;
}
function loadItemData() {

    var itemArray = [];

    fetch('/item', {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error: The response was not ok, please check logs for error message.');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            //retrieve response and store it in restaurantArray
            itemArray = data
            //print out the array in console
            insertDynamicItems(itemArray);
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
}
function insertDynamicItems(arrayOfItem) {
    var dynamicItemList = document.getElementById("dynamicItemDetails");
    var newContent = "<table><tr>";

    for (var i = 0; i < arrayOfItem.length; i++) {
        newContent += `
            <td>
                <h4>${arrayOfItem[i].item_name}</h4>
                <img src='images/${arrayOfItem[i].item_image}' width='150'><br>
                Cost: ${arrayOfItem[i].item_cost}<br>
                Availability: ${arrayOfItem[i].availability}<br>
                Quantity: ${arrayOfItem[i].item_quantity}<br>
                <button onclick="editItem(${arrayOfItem[i].item_id})">Edit</button>
                <button onclick="deleteItemData(${arrayOfItem[i].item_id})">Delete</button>
            </td>`;

        if ((i + 1) % 3 === 0 && i < arrayOfItem.length - 1) {
            newContent += "</tr><tr>";
        }
    }

    newContent += "</tr></table>";
    dynamicItemList.innerHTML = newContent;
}
function navigate() {
    location.href = "add_item.html"
}
function deleteItemData(buttonElement) {
    var id = buttonElement.getAttribute("restId");
    var api_url = "/item/" + id;

    fetch(api_url, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                console.log(response.error)
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
function editItem(itemId) {
    console.log("Received itemId:", itemId); // ✅ Debugging log
    location.href = `/update_item.html?id=${itemId}`;
}

function loadItemDetails() {
    var itemArray = [];
    var params = new URLSearchParams(location.search);
    var id = params.get("item_id");
    var api_url = '/item';
    //+ item_id;
    fetch(api_url, {
        method: 'GET' // Specify the HTTP method (GET in this case)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error: The response was not ok, please check logs for error message.');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            //retrieve response and store it in restaurantArray
            arrayOfItem = data;
            //print out the restaurantArray in console to see the data.
            console.log(arrayOfItem);
            insertDynamicItems(arrayOfItem);
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
}
function loadUpdateItemDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    console.log("Extracted Item ID:", id); // ✅ Debugging log

    if (!id) {
        console.error("Error: Item ID is missing from URL.");
        alert("Invalid item ID.");
        return;
    }

    fetch(`/item/${id}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("Item not found.");
                }
                throw new Error(`Error fetching item: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data) {
                console.error("Error: No item data found.");
                alert("Error: No item found with this ID.");
                return;
            }
            setItemDetail(data);
        })
        .catch(error => {
            console.error("Error fetching item:", error);
            alert("Failed to load item details.");
        });
}

function setItemDetail(item) {
    if (!item) {
        console.error("Error: Item data is undefined.");
        alert("Error: No item details found.");
        return;
    }

    // Set the values of the form fields using the item object
    document.getElementById('item_id').value = item.item_id || "";
    document.getElementById('item_name').value = item.item_name || "";
    document.getElementById('item_cost').value = item.item_cost || "";
    document.getElementById('item_image').value = item.item_image || "";
    document.getElementById('availability').value = item.availability || "";
    document.getElementById('item_quantity').value = item.item_quantity || "";
}

function updateItemData() {
    // Retrieve the item ID from the URL
    var params = new URLSearchParams(location.search);
    var id = params.get("id"); // Ensure the URL parameter is "id"

    if (!id) {
        console.error("Item ID not found in the URL.");
        return;
    }

    // Construct the API URL
    var api_url = '/item/' + id;

    // Retrieve the form element
    var formElement = document.getElementById('updateItemForm');

    // Create FormData object from the form
    var formData = new FormData(formElement);

    // Convert FormData to a plain object
    var itemData = Object.fromEntries(formData.entries());

    // Convert the object to a JSON string
    var jsonString = JSON.stringify(itemData);

    // Perform the API call
    fetch(api_url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' // Specify the content type as JSON
        },
        body: jsonString // Send the JSON string in the request body
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error: The response was not ok, please check logs for error message.');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            console.log("Item updated successfully:", data);
            alert("Item updated successfully!");
            location.href = "/item.html"; // Redirect to the item list page
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
            alert("Failed to update item. Please check the console for details.");
        });
}
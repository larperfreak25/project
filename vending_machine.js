// Fetch all vending machines
function loadVendingMachines() {
    fetch('/vending_machine')
        .then(response => response.json())
        .then(data => {
            insertDynamicVendingMachines(data);
        })
        .catch(error => console.error('Error:', error));
}

// Insert vending machines into the HTML
function insertDynamicVendingMachines(arrayOfVendingMachines) {
    const dynamicList = document.getElementById("dynamicVendingMachineDetails");
    let newContent = "";

    arrayOfVendingMachines.forEach(vm => {
        newContent +=
            `<div>
                <h4>${vm.vendor_name}</h4>
                <p>Location ID: ${vm.location_id}</p>
                <p>Status ID: ${vm.status_id}</p>
                <button onclick='editVendingMachine(${vm.vending_machine_id})'>Edit</button>
                <button onclick='deleteVendingMachine(${vm.vending_machine_id})'>Delete</button>
                <button onclick="location.href='item.html?vending_machine_id=${vm.vending_machine_id}'">View Items</button>
            </div>`;
    });

    dynamicList.innerHTML = newContent;
}

// Add a new vending machine
function addVendingMachine() {
    const vendor_name = document.getElementById("vendor_name").value;
    const location_id = document.getElementById("location_id").value;
    const status_id = document.getElementById("status_id").value;

    fetch('/vending_machine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vendor_name, location_id, status_id }),
    })
        .then(response => response.json())
        .then(data => {
            alert("Vending Machine added successfully!");
            location.href = "/vending_machine.html";
        })
        .catch(error => console.error('Error:', error));
}

// Update a vending machine
function updateVendingMachine() {
    const vending_machine_id = document.getElementById("vending_machine_id").value;
    const vendor_name = document.getElementById("vendor_name").value;
    const location_id = document.getElementById("location_id").value;
    const status_id = document.getElementById("status_id").value;

    fetch(`/vending_machine/${vending_machine_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vendor_name, location_id, status_id }),
    })
        .then(response => response.json())
        .then(data => {
            alert("Vending Machine updated successfully!");
            location.href = "/item.html"; // Redirect to items page
        })
        .catch(error => console.error('Error:', error));
}

// Delete a vending machine
function deleteVendingMachine(vendingMachineId) {
    if (!confirm("Are you sure you want to delete this vending machine?")) return;

    fetch(`/vending_machine/${vendingMachineId}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) throw new Error(`Failed to delete vending machine: ${response.status}`);
            return response.json();
        })
        .then(() => {
            alert("Vending machine deleted successfully.");
            location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error deleting vending machine. Please try again.");
        });
}

// Navigate to the update page
function editVendingMachine(vending_machine_id) {
    location.href = `/update_vending_machine.html?id=${vending_machine_id}`;
}
//document.addEventListener('DOMContentLoaded', async () => {
//    const token = localStorage.getItem('jwtToken');
//    const username = localStorage.getItem('username');
//
//    if (!token || !username) {
//        window.location.href = '/welcome';
//    }
//
//    await loadCustomers();
//
//    // Event listeners for buttons
//    document.getElementById('addCustomerButton').addEventListener('click', () => {
//        resetAddCustomerModal();
//        $('#addCustomerModal').modal('show');
//    });
//
//    document.getElementById('syncButton').addEventListener('click', syncCustomers);
//    document.getElementById('searchButton').addEventListener('click', searchCustomers);
//
//    document.getElementById('addCustomerForm').addEventListener('submit', async (e) => {
//        e.preventDefault();
//        await addCustomer();
//        await loadCustomers();
//        $('#addCustomerModal').modal('hide');
//    });
//
//    document.getElementById('editCustomerForm').addEventListener('submit', async (e) => {
//        e.preventDefault();
//        await updateCustomer();
//        await loadCustomers();
//        $('#editCustomerModal').modal('hide');
//    });
//});
//
//// Load customers from the API and display them
//async function loadCustomers() {
//    const response = await fetch('/home/getAllCustomers', {
//        headers: {
//            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
//        }
//    });
//    const customers = await response.json();
//    const tbody = document.getElementById('customerTableBody');
//    tbody.innerHTML = '';
//
//    customers.forEach(customer => {
//        const row = document.createElement('tr');
//        row.innerHTML = `
//            <td>${customer.firstName}</td>
//            <td>${customer.lastName}</td>
//            <td>${customer.address}</td>
//            <td>${customer.city}</td>
//            <td>${customer.state}</td>
//            <td>${customer.email}</td>
//            <td>${customer.phone}</td>
//            <td>
//                <button class="btn btn-sm btn-warning edit-button" data-id="${customer.id}">✏️</button>
//                <button class="btn btn-sm btn-danger delete-button" data-id="${customer.id}">❌</button>
//            </td>
//        `;
//        tbody.appendChild(row);
//    });
//
//    document.querySelectorAll('.edit-button').forEach(button => {
//        button.addEventListener('click', async (e) => {
//            const id = e.target.getAttribute('data-id');
//            await openEditCustomerModal(id);
//        });
//    });
//
//    document.querySelectorAll('.delete-button').forEach(button => {
//        button.addEventListener('click', async (e) => {
//            const id = e.target.getAttribute('data-id');
//            await deleteCustomer(id);
//            await loadCustomers();
//        });
//    });
//}
//
//// Add a new customer
//async function addCustomer() {
//    const newCustomer = {
//        firstName: document.getElementById('addFirstName').value,
//        lastName: document.getElementById('addLastName').value,
//        street: document.getElementById('addStreet').value,
//        address: document.getElementById('addAddress').value,
//        city: document.getElementById('addCity').value,
//        state: document.getElementById('addState').value,
//        email: document.getElementById('addEmail').value,
//        phone: document.getElementById('addPhone').value
//    };
//
//    const response = await fetch('/home/createCustomer', {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json',
//            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
//        },
//        body: JSON.stringify(newCustomer)
//    });
//
//    if (!response.ok) {
//        alert('Error adding customer.');
//    }
//}
//
//// Open the edit modal with customer details
//async function openEditCustomerModal(id) {
//    const response = await fetch(`/home/${id}`, {
//        headers: {
//            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
//        }
//    });
//    const customer = await response.json();
//
//    document.getElementById('editCustomerId').value = customer.id;
//    document.getElementById('editFirstName').value = customer.firstName;
//    document.getElementById('editLastName').value = customer.lastName;
//    document.getElementById('editStreet').value = customer.street;
//    document.getElementById('editAddress').value = customer.address;
//    document.getElementById('editCity').value = customer.city;
//    document.getElementById('editState').value = customer.state;
//    document.getElementById('editEmail').value = customer.email;
//    document.getElementById('editPhone').value = customer.phone;
//
//    $('#editCustomerModal').modal('show');
//}
//
//// Update an existing customer
//async function updateCustomer() {
//    const id = document.getElementById('editCustomerId').value;
//
//    const updatedCustomer = {
//        firstName: document.getElementById('editFirstName').value,
//        lastName: document.getElementById('editLastName').value,
//        street: document.getElementById('editStreet').value,
//        address: document.getElementById('editAddress').value,
//        city: document.getElementById('editCity').value,
//        state: document.getElementById('editState').value,
//        email: document.getElementById('editEmail').value,
//        phone: document.getElementById('editPhone').value
//    };
//
//    const response = await fetch(`/home/updateCustomer/${id}`, {
//        method: 'PUT',
//        headers: {
//            'Content-Type': 'application/json',
//            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
//        },
//        body: JSON.stringify(updatedCustomer)
//    });
//
//    if (!response.ok) {
//        alert('Error updating customer.');
//    }
//}
//
//// Delete a customer
//async function deleteCustomer(id) {
//    const response = await fetch(`/home/deleteCustomer/${id}`, {
//        method: 'DELETE',
//        headers: {
//            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
//        }
//    });
//
//    if (!response.ok) {
//        alert('Error deleting customer.');
//    }
//}
//
//// Sync customers with remote API (Placeholder)
//async function syncCustomers() {
//    try {
//        const response = await fetch('/home/syncCustomers', {
//            method: 'GET',
//            headers: {
//                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
//            }
//        });
//
//        if (!response.ok) {
//            const errorText = await response.text(); // Retrieve error message from the response
//            throw new Error(`Failed to sync customers: ${errorText}`);
//        }
//
//        alert('Customers synced successfully!');
//        await loadCustomers();
//    } catch (error) {
//        console.error('Error syncing customers:', error);
//        alert(`Error syncing customers: ${error.message}`);
//    }
//}
//
//
//// Search customers based on criteria
//async function searchCustomers() {
//    const searchType = document.getElementById('searchBy').value;
//    const searchText = document.getElementById('searchText').value;
//
//    const response = await fetch(`/home/search?searchType=${searchType}&searchText=${searchText}`, {
//        headers: {
//            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
//        }
//    });
//
//    const customers = await response.json();
//    const tbody = document.getElementById('customerTableBody');
//    tbody.innerHTML = '';
//
//    customers.forEach(customer => {
//        const row = document.createElement('tr');
//        row.innerHTML = `
//            <td>${customer.firstName}</td>
//            <td>${customer.lastName}</td>
//            <td>${customer.street}</td>
//            <td>${customer.address}</td>
//            <td>${customer.city}</td>
//            <td>${customer.state}</td>
//            <td>${customer.email}</td>
//            <td>${customer.phone}</td>
//            <td>
//                <button class="btn btn-sm btn-warning edit-button" data-id="${customer.id}">✏️</button>
//                <button class="btn btn-sm btn-danger delete-button" data-id="${customer.id}">❌</button>
//            </td>
//        `;
//        tbody.appendChild(row);
//    });
//
//    document.querySelectorAll('.edit-button').forEach(button => {
//        button.addEventListener('click', async (e) => {
//            const id = e.target.getAttribute('data-id');
//            await openEditCustomerModal(id);
//        });
//    });
//
//    document.querySelectorAll('.delete-button').forEach(button => {
//        button.addEventListener('click', async (e) => {
//            const id = e.target.getAttribute('data-id');
//            await deleteCustomer(id);
//            await loadCustomers();
//        });
//    });
//}
//
//// Reset the Add Customer Modal
//function resetAddCustomerModal() {
//    document.getElementById('addFirstName').value = '';
//    document.getElementById('addLastName').value = '';
//    document.getElementById('addStreet').value = '';
//    document.getElementById('addAddress').value = '';
//    document.getElementById('addCity').value = '';
//    document.getElementById('addState').value = '';
//    document.getElementById('addEmail').value = '';
//    document.getElementById('addPhone').value = '';
//}
//
//
//

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('jwtToken');
    const username = localStorage.getItem('username');

    if (!token || !username) {
        window.location.href = '/welcome';
    }

    await loadCustomers();

    // Event listeners for buttons
    document.getElementById('addCustomerButton').addEventListener('click', () => {
        resetAddCustomerModal();
        $('#addCustomerModal').modal('show');
    });

    document.getElementById('syncButton').addEventListener('click', syncCustomers);
    document.getElementById('searchButton').addEventListener('click', searchCustomers);

    document.getElementById('addCustomerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await addCustomer();
        await loadCustomers();
        $('#addCustomerModal').modal('hide');
    });

    document.getElementById('editCustomerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await updateCustomer();
        await loadCustomers();
        $('#editCustomerModal').modal('hide');
    });
});

// Load customers from the API and display them
async function loadCustomers(page = 0, size = 10, sortBy = 'firstName', sortDir = 'asc') {
    const response = await fetch(`/home/getAllCustomers?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
    });
    const customers = await response.json();
    const tbody = document.getElementById('customerTableBody');
    tbody.innerHTML = '';

    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.street}</td>
            <td>${customer.address}</td>
            <td>${customer.city}</td>
            <td>${customer.state}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>
                <button class="btn btn-sm btn-warning edit-button" data-id="${customer.id}">✏️</button>
                <button class="btn btn-sm btn-danger delete-button" data-id="${customer.id}">❌</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            await openEditCustomerModal(id);
        });
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            await deleteCustomer(id);
            await loadCustomers(page, size, sortBy, sortDir);
        });
    });
}

// Add a new customer
async function addCustomer() {
    const newCustomer = {
        firstName: document.getElementById('addFirstName').value,
        lastName: document.getElementById('addLastName').value,
        street: document.getElementById('addStreet').value,
        address: document.getElementById('addAddress').value,
        city: document.getElementById('addCity').value,
        state: document.getElementById('addState').value,
        email: document.getElementById('addEmail').value,
        phone: document.getElementById('addPhone').value
    };

    const response = await fetch('/home/createCustomer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify(newCustomer)
    });

    if (!response.ok) {
        alert('Error adding customer.');
    }
}

// Open the edit modal with customer details
async function openEditCustomerModal(id) {
    const response = await fetch(`/home/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
    });
    const customer = await response.json();

    document.getElementById('editCustomerId').value = customer.id;
    document.getElementById('editFirstName').value = customer.firstName;
    document.getElementById('editLastName').value = customer.lastName;
    document.getElementById('editStreet').value = customer.street;
    document.getElementById('editAddress').value = customer.address;
    document.getElementById('editCity').value = customer.city;
    document.getElementById('editState').value = customer.state;
    document.getElementById('editEmail').value = customer.email;
    document.getElementById('editPhone').value = customer.phone;

    $('#editCustomerModal').modal('show');
}

// Update an existing customer
async function updateCustomer() {
    const id = document.getElementById('editCustomerId').value;

    const updatedCustomer = {
        firstName: document.getElementById('editFirstName').value,
        lastName: document.getElementById('editLastName').value,
        street: document.getElementById('editStreet').value,
        address: document.getElementById('editAddress').value,
        city: document.getElementById('editCity').value,
        state: document.getElementById('editState').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value
    };

    const response = await fetch(`/home/updateCustomer/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        },
        body: JSON.stringify(updatedCustomer)
    });

    if (!response.ok) {
        alert('Error updating customer.');
    }
}

// Delete a customer
async function deleteCustomer(id) {
    const response = await fetch(`/home/deleteCustomer/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
    });

    if (!response.ok) {
        alert('Error deleting customer.');
    }
}

// Sync customers with remote API (Placeholder)
async function syncCustomers() {
    try {
        const response = await fetch('/home/syncCustomers', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text(); // Retrieve error message from the response
            throw new Error(`Failed to sync customers: ${errorText}`);
        }

        alert('Customers synced successfully!');
        await loadCustomers();
    } catch (error) {
        console.error('Error syncing customers:', error);
        alert(`Error syncing customers: ${error.message}`);
    }
}

// Search customers based on criteria
async function searchCustomers() {
    const searchType = document.getElementById('searchBy').value;
    const searchText = document.getElementById('searchText').value;

    const response = await fetch(`/home/search?searchType=${searchType}&searchText=${searchText}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
    });

    const customers = await response.json();
    const tbody = document.getElementById('customerTableBody');
    tbody.innerHTML = '';

    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.street}</td>
            <td>${customer.address}</td>
            <td>${customer.city}</td>
            <td>${customer.state}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>
                <button class="btn btn-sm btn-warning edit-button" data-id="${customer.id}">✏️</button>
                <button class="btn btn-sm btn-danger delete-button" data-id="${customer.id}">❌</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            await openEditCustomerModal(id);
        });
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            await deleteCustomer(id);
            await loadCustomers();
        });
    });
}

// Reset the Add Customer Modal
function resetAddCustomerModal() {
    document.getElementById('addFirstName').value = '';
    document.getElementById('addLastName').value = '';
    document.getElementById('addStreet').value = '';
    document.getElementById('addAddress').value = '';
    document.getElementById('addCity').value = '';
    document.getElementById('addState').value = '';
    document.getElementById('addEmail').value = '';
    document.getElementById('addPhone').value = '';
}

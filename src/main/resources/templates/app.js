document.getElementById('login-form').addEventListener('submit', login);
document.getElementById('customer-form').addEventListener('submit', addCustomer);

function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Fetch API to handle login
    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = 'customer-list.html';
        } else {
            alert('Login failed');
        }
    });
}

function addCustomer(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('customer-form'));

    const customer = {};
    formData.forEach((value, key) => {
        customer[key] = value;
    });

    fetch('/api/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(customer)
    })
    .then(response => response.json())
    .then(data => {
        alert('Customer added successfully');
        window.location.href = 'customer-list.html';
    });
}

function fetchCustomers(page = 0, size = 10, sortBy = 'firstName') {
    fetch(`/api/customers?page=${page}&size=${size}&sortBy=${sortBy}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        const tbody = document.getElementById('customer-tbody');
        tbody.innerHTML = '';
        data.content.forEach(customer => {
            const row = `<tr>
                <td>${customer.firstName}</td>
                <td>${customer.city}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>
                    <button onclick="editCustomer(${customer.id})">Edit</button>
                    <button onclick="deleteCustomer(${customer.id})">Delete</button>
                </td>
            </tr>`;
            tbody.innerHTML += row;
        });
    });
}

function searchCustomers() {
    const searchType = document.getElementById('search-type').value;
    const searchText = document.getElementById('search-text').value;

    fetch(`/api/customers/search?searchType=${searchType}&searchText=${searchText}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        const tbody = document.getElementById('customer-tbody');
        tbody.innerHTML = '';
        data.content.forEach(customer => {
            const row = `<tr>
                <td>${customer.firstName}</td>
                <td>${customer.city}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>
                    <button onclick="editCustomer(${customer.id})">Edit</button>
                    <button onclick="deleteCustomer(${customer.id})">Delete</button>
                </td>
            </tr>`;
            tbody.innerHTML += row;
        });
    });
}

function deleteCustomer(id) {
    fetch(`/api/customers/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(() => {
        alert('Customer deleted successfully');
        fetchCustomers();
    });
}

function editCustomer(id) {
    // Code to fetch and edit customer details
}

function syncCustomers() {
    // Code to call remote API and sync customers
}

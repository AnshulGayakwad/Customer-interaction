// Show login modal when the login button is clicked
document.getElementById('loginButton').addEventListener('click', () => {
    resetLoginModal();
    $('#loginModal').modal('show');
});

document.getElementById('loginButtonJumbotron').addEventListener('click', () => {
    resetLoginModal();
    $('#loginModal').modal('show');
});

// Show register modal when the register button is clicked
document.getElementById('registerButton').addEventListener('click', () => {
    resetRegisterModal();
    $('#registerModal').modal('show');
});

document.getElementById('registerButtonJumbotron').addEventListener('click', () => {
    resetRegisterModal();
    $('#registerModal').modal('show');
});

// Handle login form submission
document.getElementById('loginSubmit').addEventListener('click', async () => {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const loginError = document.getElementById('loginError');

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('username', data.username);
            localStorage.setItem('jwtToken', data.jwtToken);
            window.location.href = '/customerHome';
        }
        else if (response.NOT_FOUND){
                      loginError.classList.remove('d-none');
                      loginError.textContent = 'Invalid credentials. Please try again.';
                  }
    } catch (error) {
        loginError.classList.remove('d-none');
        loginError.textContent = 'Invalid credentials. Please try again.';
//        loginError.textContent = 'An error occurred. Please try again later.';
    }
});

// Handle register form submission
document.getElementById('registerSubmit').addEventListener('click', async () => {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const registerError = document.getElementById('registerError');
    const registerSuccess = document.getElementById('registerSuccess');

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.status === 409) {
            registerError.classList.remove('d-none');
            registerError.textContent = 'Username already exists. Please choose a different username.';
        } else if (response.ok) {
            registerSuccess.classList.remove('d-none');
            registerSuccess.textContent = 'Registration successful. Please login with your credentials.';
            setTimeout(() => {
                $('#registerModal').modal('hide');
                $('#loginModal').modal('show');
            }, 2000);
        } else {
            registerError.classList.remove('d-none');
            registerError.textContent = 'An error occurred. Please try again later.';
        }
    } catch (error) {
        registerError.classList.remove('d-none');
        registerError.textContent = 'An error occurred. Please try again later.';
    }
});

// Reset login modal
function resetLoginModal() {
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('loginError').classList.add('d-none');
    document.getElementById('loginError').textContent = '';
}

// Reset register modal
function resetRegisterModal() {
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('registerError').classList.add('d-none');
    document.getElementById('registerError').textContent = '';
    document.getElementById('registerSuccess').classList.add('d-none');
    document.getElementById('registerSuccess').textContent = '';
}

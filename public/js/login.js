const loginFormHandler = async (event) => {
    event.preventDefault();

    //collecting values for login
    const username = document.querySelector('#username-input-login').value.trim();
    const password = document.querySelector('#password-input-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        //if ok, take to dahsboard
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to log in');
        }
    }
};


document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);
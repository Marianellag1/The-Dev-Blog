const loginForm = async (event) => {
    event.preventDefault();

    //collecting values for login
    const username = document.querySelector('#username-input-login').value.trim();
    const password = document.querySelector('#password-input-login').value.trim();

    if (username && password) {
        const response = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        //if ok, take to dahsboard
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('#login-form')
    .addEventListener('submit', loginForm);

    //taken from notes act.
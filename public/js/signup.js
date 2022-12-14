const signUpFormHandler = async (event) => {
    event.preventDefault();

    // getting from signup.handlebars
    const username = document.querySelector("#username-input-signup").value.trim();
    const password = document.querySelector("#password-input-signup").value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST', //userRoutes.js
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert('Failed to sign up.')
        }
    }
};

document
.querySelector('.signup-form')
.addEventListener("submit", signUpFormHandler);
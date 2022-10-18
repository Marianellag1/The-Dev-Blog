const signUpForm = async (event) => {
    event.preventDefault();
// getting from signup.handlebars
    const username = document.querySelector("#username-input-signup").value.trim();
    const password = document.querySelector("#password-input-signup").value.trim();

    if (username && password) {
        const res = await fetch("/api/users", {
            method: "POST", //userRoutes.js
            body: JSON.stringify({ username, password }),
            headers: {"Content-Type": "application/json"},
        });
        if (res.ok) {
            document.location.replace("/dashboard")//may have to change to dashboard
        }else {
            alert(res.statusText)
        }
    }
};

document
.querySelector('.btn')// || #signup-btn  (id)
.addEventListener("submit", signUpForm);
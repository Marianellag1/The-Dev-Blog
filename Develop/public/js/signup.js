const signUpForm = async (event) => {
    event.preventDefault();

    const name = document.querySelector("#username-input-signup").value.trim();
    const password = document.querySelector("#password-input-signup").value.trim();

    if (name && password) {
        const res = await fetch("/api/users", {
            method: "POST", //userRoutes.js
            body: JSON.stringify({ name, password }),
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
.querySelector(".signup-form")//id
.addEventListener("submit", signUpForm)
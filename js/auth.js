// AUTH PAGE JS STARTED
// No remembered session — every visit requires submitting a valid form to get in.

const loginTabButton = document.getElementById("loginTabButton");
const signupTabButton = document.getElementById("signupTabButton");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const switchToSignup = document.getElementById("switchToSignup");
const switchToLogin = document.getElementById("switchToLogin");

function showLoginForm() {
    loginForm.classList.remove("authFormHidden");
    signupForm.classList.add("authFormHidden");
    loginTabButton.classList.add("authTabActive");
    signupTabButton.classList.remove("authTabActive");
}

function showSignupForm() {
    signupForm.classList.remove("authFormHidden");
    loginForm.classList.add("authFormHidden");
    signupTabButton.classList.add("authTabActive");
    loginTabButton.classList.remove("authTabActive");
}

loginTabButton.addEventListener("click", showLoginForm);
signupTabButton.addEventListener("click", showSignupForm);
switchToSignup.addEventListener("click", showSignupForm);
switchToLogin.addEventListener("click", showLoginForm);


// VALIDATION HELPERS

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+\-\s()]{7,15}$/;

function setAuthError(fieldId, message) {
    document.getElementById(fieldId + "Error").textContent = message;
}

function clearAuthErrors(fieldIds) {
    fieldIds.forEach(function (fieldId) {
        setAuthError(fieldId, "");
    });
}


// LOGIN FORM SUBMIT

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    clearAuthErrors(["loginEmail", "loginPassword"]);

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    let hasError = false;

    if (!emailPattern.test(email)) {
        setAuthError("loginEmail", "Enter a valid email address.");
        hasError = true;
    }

    if (password.length < 6) {
        setAuthError("loginPassword", "Password must be at least 6 characters.");
        hasError = true;
    }

    if (hasError) {
        return;
    }

    const session = {
        name: email.split("@")[0],
        email: email,
        loggedIn: true
    };

    showLoadingTransition("home.html");
});


// SIGN UP FORM SUBMIT

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    clearAuthErrors(["signupName", "signupEmail", "signupPhone", "signupPassword", "signupConfirmPassword", "signupCity"]);

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const phone = document.getElementById("signupPhone").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;
    const city = document.getElementById("signupCity").value.trim();

    let hasError = false;

    if (name.length < 2) {
        setAuthError("signupName", "Enter your full name.");
        hasError = true;
    }

    if (!emailPattern.test(email)) {
        setAuthError("signupEmail", "Enter a valid email address.");
        hasError = true;
    }

    if (!phonePattern.test(phone)) {
        setAuthError("signupPhone", "Enter a valid phone number.");
        hasError = true;
    }

    if (password.length < 6) {
        setAuthError("signupPassword", "Password must be at least 6 characters.");
        hasError = true;
    }

    if (confirmPassword !== password) {
        setAuthError("signupConfirmPassword", "Passwords do not match.");
        hasError = true;
    }

    if (city.length < 2) {
        setAuthError("signupCity", "Enter your city.");
        hasError = true;
    }

    if (hasError) {
        return;
    }

    const session = {
        name: name,
        email: email,
        phone: phone,
        city: city,
        loggedIn: true
    };

    showLoadingTransition("home.html");
});

// AUTH PAGE JS ENDED
// CONTACT PAGE JS STARTED

document.addEventListener("DOMContentLoaded", function () {

    const contactEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactPhonePattern = /^[0-9+\-\s()]{7,15}$/;

    const contactForm = document.getElementById("contactForm");
    const successOverlay = document.getElementById("contactSuccessOverlay");
    const successCloseButton = document.getElementById("contactSuccessCloseButton");

    function setContactError(fieldId, message) {
        document.getElementById(fieldId + "Error").textContent = message;
    }

    function clearContactErrors(fieldIds) {
        fieldIds.forEach(function (fieldId) {
            setContactError(fieldId, "");
        });
    }

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        clearContactErrors(["contactName", "contactEmail", "contactPhone", "contactCity", "contactMessage"]);

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const phone = document.getElementById("contactPhone").value.trim();
        const city = document.getElementById("contactCity").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        let hasError = false;

        if (name.length < 2) {
            setContactError("contactName", "Enter your full name.");
            hasError = true;
        }

        if (!contactEmailPattern.test(email)) {
            setContactError("contactEmail", "Enter a valid email address.");
            hasError = true;
        }

        if (!contactPhonePattern.test(phone)) {
            setContactError("contactPhone", "Enter a valid phone number.");
            hasError = true;
        }

        if (city.length < 2) {
            setContactError("contactCity", "Enter your city.");
            hasError = true;
        }

        if (message.length < 10) {
            setContactError("contactMessage", "Message should be at least 10 characters.");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        successOverlay.classList.add("contactSuccessOverlayVisible");
    });

    successCloseButton.addEventListener("click", function () {
        contactForm.reset();
        successOverlay.classList.remove("contactSuccessOverlayVisible");
    });

});

// CONTACT PAGE JS ENDED
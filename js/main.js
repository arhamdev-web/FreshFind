// SHARED FETCH HELPER

function fetchJSON(path) {
    return fetch(path).then(function (response) {
        if (!response.ok) throw new Error("Failed to load " + path);
        return response.json();
    });
}


// LOADING TRANSITION (shared — plays assets/animations/loading.json before navigating)

function showLoadingTransition(destinationUrl, minDurationMs) {
    const overlay = document.getElementById("loadingOverlay");

    if (!overlay || typeof lottie === "undefined") {
        window.location.href = destinationUrl;
        return;
    }

    overlay.classList.add("loadingOverlayActive");

    lottie.loadAnimation({
        container: document.getElementById("loadingAnimation"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "assets/animations/loading.json"
    });

    setTimeout(function () {
        window.location.href = destinationUrl;
    }, minDurationMs || 1500);
}


// SHARED NAVBAR + FOOTER

function renderNavbarAndFooter() {
    const navbarPlaceholder = document.getElementById("navbarPlaceholder");
    const footerPlaceholder = document.getElementById("footerPlaceholder");

    if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = `
            <nav class="navbar">
                <a href="home.html" class="navbarBrand">
                    <img src="assets/logo/freshfindLogo.webp" alt="FreshFind Logo" class="navbarLogo">
                    <span>FreshFind</span>
                </a>
                <div class="navbarLinks">
                    <a href="home.html" class="navLink" data-page="home.html">Home</a>
                    <a href="findMarket.html" class="navLink" data-page="findMarket.html">Find Market</a>
                    <a href="marketDirectory.html" class="navLink" data-page="marketDirectory.html">Market Directory</a>
                    <a href="produceGuide.html" class="navLink" data-page="produceGuide.html">Produce Guide</a>
                    <a href="seasonal.html" class="navLink" data-page="seasonal.html">Seasonal Produce</a>
                    <a href="about.html" class="navLink" data-page="about.html">About</a>
                    <a href="contact.html" class="navLink" data-page="contact.html">Contact</a>
                </div>
            </nav>
        `;

        const currentPage = window.location.pathname.split("/").pop();

        navbarPlaceholder.querySelectorAll(".navLink").forEach(function (link) {
            if (link.getAttribute("data-page") === currentPage) {
                link.classList.add("navLinkActive");
            }
        });
    }

    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
            <footer class="footerSection">
                <div class="footerContent">
                    <div class="footerBrand">
                        <img src="assets/logo/freshfindLogo.webp" alt="FreshFind Logo" class="footerLogo">
                        <h2>FreshFind</h2>
                        <p>Fresh All Along — helping residents discover nearby farmers markets and what's in season.</p>
                    </div>
                    <div class="footerLinks">
                        <h3>Explore</h3>
                        <a href="home.html">Home</a>
                        <a href="findMarket.html">Find Market</a>
                        <a href="marketDirectory.html">Market Directory</a>
                        <a href="produceGuide.html">Produce Guide</a>
                        <a href="seasonal.html">Seasonal Produce</a>
                    </div>
                    <div class="footerLinks">
                        <h3>Learn More</h3>
                        <a href="about.html">About Us</a>
                        <a href="contact.html">Contact Us</a>
                    </div>
                    <div class="footerCTA">
                        <h3>Ready to find fresh?</h3>
                        <p>Browse markets near you and see what's in season.</p>
                        <a href="marketDirectory.html">Explore Markets</a>
                    </div>
                </div>
                <div class="footerBottom">
                    <p>© 2026 FreshFind. All rights reserved.</p>
                    <p>Fresh All Along</p>
                </div>
            </footer>
        `;
    }
}


// DOM-DEPENDENT SETUP

document.addEventListener("DOMContentLoaded", function () {

    renderNavbarAndFooter();

    // LANDING PAGE EXPLORE BUTTON

    const exploreButton = document.getElementById("exploreButton");

    if (exploreButton) {
        exploreButton.addEventListener("click", function () {
            document.body.classList.add("pageExit");

            setTimeout(function () {
                window.location.href = "auth.html";
            }, 600);
        });
    }

});
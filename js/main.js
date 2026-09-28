// SHARED FETCH HELPER

function fetchJSON(path) {
    return fetch(path).then(function (response) {
        if (!response.ok) throw new Error("Failed to load " + path);
        return response.json();
    });
}

// TIME CATEGORY HELPER

function getTimeCategory(opensTime) {
    const hour = parseInt(opensTime.split(":")[0], 10);
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    if (hour < 21) return "Evening";
    return "Night";
}


// SHARED MARKET CARD BUILDER

function createMarketCardElement(market, actionType) {
    const card = document.createElement("div");
    card.classList.add("marketCard");

    const firstSchedule = market.schedule[0];

    const action = actionType === "expand"
        ? `<button type="button" class="directoryExpandButton" data-market-id="${market.id}">Expand</button>`
        : `<a class="marketCardLink" href="marketDetails.html?id=${market.id}">See Details</a>`;

    card.innerHTML = `
        <div class="marketCardImage">
            <img src="${market.image}" alt="${market.name}">
        </div>
        <div class="marketCardContent">
            <h3 class="marketCardName">${market.name}</h3>
            <div class="marketCardMeta">
                <span><i class="fa-solid fa-location-dot"></i> ${market.area}, ${market.city}</span>
                <span><i class="fa-solid fa-clock"></i> ${firstSchedule.day}, ${firstSchedule.opens}–${firstSchedule.closes}</span>
            </div>
            <div class="marketCardProduce">
                ${market.produce.map(function (item) { return "<span>" + item + "</span>"; }).join("")}
            </div>
            ${action}
        </div>
    `;

    return card;
}


// SHARED PRODUCE CARD BUILDER

function createProduceCardElement(produce) {
    const card = document.createElement("div");
    card.classList.add("produceCard");

    card.innerHTML = `
        <div class="produceCardImage">
            <img src="${produce.image}" alt="${produce.name}">
        </div>
        <div class="produceCardContent">
            <span class="produceCardCategory">${produce.category}</span>
            <h3 class="produceCardName">${produce.name}</h3>
            <p class="produceCardDescription">${produce.description}</p>
            <button type="button" class="produceCardButton" data-produce-id="${produce.id}">Learn More</button>
        </div>
    `;

    return card;
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
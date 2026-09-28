// HOME PAGE JS STARTED

document.addEventListener("DOMContentLoaded", function () {

    const featuredMarketsContainer = document.getElementById("featuredMarketsContainer");

    if (featuredMarketsContainer) {
        fetchJSON("data/markets.json").then(function (data) {
            const featuredMarkets = data.markets.filter(function (market) {
                return market.featured === true;
            }).slice(0, 4);

            featuredMarkets.forEach(function (market) {
                featuredMarketsContainer.appendChild(createMarketCardElement(market));
            });
        });
    }

    // HERO SEARCH BAR — carries the search term to Find Market

    const homeSearchForm = document.getElementById("homeSearchForm");
    const homeSearchInput = document.getElementById("homeSearchInput");

    if (homeSearchForm) {
        homeSearchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const query = homeSearchInput.value.trim();
            window.location.href = "findMarket.html" + (query ? "?query=" + encodeURIComponent(query) : "");
        });
    }

});

// HOME PAGE JS ENDED
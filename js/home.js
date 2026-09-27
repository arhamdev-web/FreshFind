// HOME PAGE JS STARTED

document.addEventListener("DOMContentLoaded", function () {

    const featuredMarketsContainer = document.getElementById("featuredMarketsContainer");

    if (featuredMarketsContainer) {
        fetchJSON("data/markets.json").then(function (data) {
            const featuredMarkets = data.markets.filter(function (market) {
                return market.featured === true;
            }).slice(0, 4);

            featuredMarkets.forEach(function (market) {
                const card = document.createElement("div");
                card.classList.add("marketCard");

                const firstSchedule = market.schedule[0];

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
                        <a class="marketCardLink" href="marketDetails.html?id=${market.id}">See Details</a>
                    </div>
                `;

                featuredMarketsContainer.appendChild(card);
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
// MARKET DIRECTORY PAGE JS STARTED

let freshFindDirectoryMarkets = [];

document.addEventListener("DOMContentLoaded", function () {

    const cardsContainer = document.getElementById("marketDirectoryGrid");
    const mapContainer = document.getElementById("marketDirectoryMap");
    const expandOverlay = document.getElementById("marketExpandOverlay");
    const expandCloseButton = document.getElementById("marketExpandCloseButton");
    const expandImage = document.getElementById("marketExpandImage");
    const expandBody = document.getElementById("marketExpandBody");

    fetchJSON("data/markets.json").then(function (data) {
        freshFindDirectoryMarkets = data.markets;

        renderDirectoryCards();
        renderDirectoryMap();
    });

    function renderDirectoryCards() {
        freshFindDirectoryMarkets.forEach(function (market) {
            cardsContainer.appendChild(createMarketCardElement(market, "expand"));
        });

        cardsContainer.querySelectorAll(".directoryExpandButton").forEach(function (button) {
            button.addEventListener("click", function () {
                const market = freshFindDirectoryMarkets.find(function (m) {
                    return m.id === button.getAttribute("data-market-id");
                });
                openExpandModal(market);
            });
        });
    }

    function openExpandModal(market) {
        expandImage.innerHTML = `<img src="${market.image}" alt="${market.name}">`;

        expandBody.innerHTML = `
            <h3>${market.name}</h3>
            <p class="marketExpandAddress"><i class="fa-solid fa-location-dot"></i> ${market.address}</p>
            <p class="marketExpandDescription">${market.description}</p>
            <div class="marketExpandSchedule">
                <h4>Schedule</h4>
                ${market.schedule.map(function (s) {
                    return `<div class="marketExpandScheduleRow"><span>${s.day}</span><span>${s.opens}–${s.closes}</span></div>`;
                }).join("")}
            </div>
            <div class="marketCardProduce">
                ${market.produce.map(function (item) { return "<span>" + item + "</span>"; }).join("")}
            </div>
            <a class="marketExpandDetailsButton" href="marketDetails.html?id=${market.id}">See Full Details</a>
        `;

        expandOverlay.classList.add("marketExpandOverlayVisible");
    }

    function closeExpandModal() {
        expandOverlay.classList.remove("marketExpandOverlayVisible");
    }

    expandCloseButton.addEventListener("click", closeExpandModal);

    expandOverlay.addEventListener("click", function (event) {
        if (event.target === expandOverlay) {
            closeExpandModal();
        }
    });

    function renderDirectoryMap() {
        const map = L.map(mapContainer).setView([30.3753, 69.3451], 5);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
            maxZoom: 18
        }).addTo(map);

        const markerIcon = L.icon({
            iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
            shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        const markers = [];

        freshFindDirectoryMarkets.forEach(function (market) {
            const marker = L.marker([market.coordinates.lat, market.coordinates.lng], { icon: markerIcon }).addTo(map);

            marker.bindPopup(`
                <strong>${market.name}</strong><br>
                ${market.area}, ${market.city}<br>
                <a href="marketDetails.html?id=${market.id}">See Details</a>
            `);

            markers.push(marker);
        });

        if (markers.length > 0) {
            const group = L.featureGroup(markers);
            map.fitBounds(group.getBounds(), { padding: [30, 30] });
        }
    }

});

// MARKET DIRECTORY PAGE JS ENDED
// MARKET DETAILS PAGE JS STARTED

document.addEventListener("DOMContentLoaded", function () {

    const notFoundSection = document.getElementById("marketNotFoundSection");
    const detailsContent = document.getElementById("marketDetailsContent");

    const urlParams = new URLSearchParams(window.location.search);
    const marketId = urlParams.get("id");

    fetchJSON("data/markets.json").then(function (data) {
        const market = data.markets.find(function (m) {
            return m.id === marketId;
        });

        if (!market) {
            notFoundSection.classList.add("marketNotFoundVisible");
            detailsContent.style.display = "none";
            return;
        }

        renderMarketDetails(market);
        renderMap(market);
    });

    function renderMarketDetails(market) {
        document.title = "FreshFind — " + market.name;

        document.getElementById("marketDetailsBanner").style.backgroundImage = `url("${market.image}")`;
        document.getElementById("marketDetailsName").textContent = market.name;
        document.getElementById("marketDetailsLocationLine").innerHTML = `<i class="fa-solid fa-location-dot"></i> ${market.area}, ${market.city}`;
        document.getElementById("marketDetailsDescription").textContent = market.description;
        document.getElementById("marketDetailsAddress").innerHTML = `<i class="fa-solid fa-map-pin"></i> ${market.address}`;

        const produceGrid = document.getElementById("marketDetailsProduceGrid");
        market.produce.forEach(function (item) {
            const tag = document.createElement("span");
            tag.classList.add("marketDetailsProduceTag");
            tag.textContent = item;
            produceGrid.appendChild(tag);
        });

        const scheduleTable = document.getElementById("marketDetailsScheduleTable");
        market.schedule.forEach(function (entry) {
            const row = document.createElement("div");
            row.classList.add("marketDetailsScheduleRow");
            row.innerHTML = `<span>${entry.day}</span><span>${entry.opens} – ${entry.closes}</span>`;
            scheduleTable.appendChild(row);
        });
    }

    function renderMap(market) {
        const map = L.map("marketDetailsMap").setView([market.coordinates.lat, market.coordinates.lng], 14);

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

        L.marker([market.coordinates.lat, market.coordinates.lng], { icon: markerIcon })
            .addTo(map)
            .bindPopup(`<strong>${market.name}</strong>`)
            .openPopup();
    }

});

// MARKET DETAILS PAGE JS ENDED
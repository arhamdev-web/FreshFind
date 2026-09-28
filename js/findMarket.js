// FIND MARKET PAGE JS STARTED

const weekdayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

let freshFindAllMarkets = [];

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("findMarketSearchInput");
    const citySelect = document.getElementById("findMarketCitySelect");
    const areaSelect = document.getElementById("findMarketAreaSelect");
    const daySelect = document.getElementById("findMarketDaySelect");
    const timeSelect = document.getElementById("findMarketTimeSelect");
    const filtersForm = document.getElementById("findMarketFiltersForm");
    const resetButton = document.getElementById("findMarketResetButton");
    const resultsContainer = document.getElementById("findMarketResultsContainer");
    const emptyState = document.getElementById("findMarketEmptyState");

    fetchJSON("data/markets.json").then(function (data) {
        freshFindAllMarkets = data.markets;

        populateCityOptions();
        populateDayOptions();
        populateAreaOptions("");

        // Pre-fill search if the Home page hero search bar sent a query
        const urlParams = new URLSearchParams(window.location.search);
        const queryParam = urlParams.get("query");

        if (queryParam) {
            searchInput.value = queryParam;
        }

        renderResults();
    });

    function populateCityOptions() {
        const cities = [...new Set(freshFindAllMarkets.map(function (m) { return m.city; }))].sort();

        cities.forEach(function (city) {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }

    function populateAreaOptions(selectedCity) {
        areaSelect.innerHTML = '<option value="">All Areas</option>';

        const relevantMarkets = selectedCity
            ? freshFindAllMarkets.filter(function (m) { return m.city === selectedCity; })
            : freshFindAllMarkets;

        const areas = [...new Set(relevantMarkets.map(function (m) { return m.area; }))].sort();

        areas.forEach(function (area) {
            const option = document.createElement("option");
            option.value = area;
            option.textContent = area;
            areaSelect.appendChild(option);
        });
    }

    function populateDayOptions() {
        const daysPresent = new Set();

        freshFindAllMarkets.forEach(function (market) {
            market.schedule.forEach(function (entry) {
                daysPresent.add(entry.day);
            });
        });

        weekdayOrder.filter(function (day) {
            return daysPresent.has(day);
        }).forEach(function (day) {
            const option = document.createElement("option");
            option.value = day;
            option.textContent = day;
            daySelect.appendChild(option);
        });
    }

    function matchesFilters(market) {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const selectedCity = citySelect.value;
        const selectedArea = areaSelect.value;
        const selectedDay = daySelect.value;
        const selectedTime = timeSelect.value;

        if (searchTerm) {
            const haystack = [
                market.name,
                market.city,
                market.area,
                market.description,
                market.produce.join(" ")
            ].join(" ").toLowerCase();

            if (!haystack.includes(searchTerm)) {
                return false;
            }
        }

        if (selectedCity && market.city !== selectedCity) {
            return false;
        }

        if (selectedArea && market.area !== selectedArea) {
            return false;
        }

        if (selectedDay && !market.schedule.some(function (s) { return s.day === selectedDay; })) {
            return false;
        }

        if (selectedTime && !market.schedule.some(function (s) { return getTimeCategory(s.opens) === selectedTime; })) {
            return false;
        }

        return true;
    }

    function renderResults() {
        resultsContainer.innerHTML = "";

        const filteredMarkets = freshFindAllMarkets.filter(matchesFilters);

        if (filteredMarkets.length === 0) {
            emptyState.classList.add("findMarketEmptyStateVisible");
        } else {
            emptyState.classList.remove("findMarketEmptyStateVisible");
            filteredMarkets.forEach(function (market) {
                resultsContainer.appendChild(createMarketCardElement(market));
            });
        }
    }

    filtersForm.addEventListener("submit", function (event) {
        event.preventDefault();
        renderResults();
    });

    citySelect.addEventListener("change", function () {
        populateAreaOptions(citySelect.value);
        renderResults();
    });

    areaSelect.addEventListener("change", renderResults);
    daySelect.addEventListener("change", renderResults);
    timeSelect.addEventListener("change", renderResults);

    resetButton.addEventListener("click", function () {
        filtersForm.reset();
        populateAreaOptions("");
        renderResults();
    });

});

// FIND MARKET PAGE JS ENDED
// PRODUCE GUIDE PAGE JS STARTED

let freshFindAllProduces = [];

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("produceSearchInput");
    const categorySelect = document.getElementById("produceCategorySelect");
    const filtersForm = document.getElementById("produceFiltersForm");
    const resetButton = document.getElementById("produceResetButton");
    const resultsContainer = document.getElementById("produceResultsContainer");
    const emptyState = document.getElementById("produceEmptyState");

    const expandOverlay = document.getElementById("produceExpandOverlay");
    const expandCloseButton = document.getElementById("produceExpandCloseButton");
    const expandImage = document.getElementById("produceExpandImage");
    const expandBody = document.getElementById("produceExpandBody");

    fetchJSON("data/produces.json").then(function (data) {
        freshFindAllProduces = data.produces;

        populateCategoryOptions();
        renderResults();
    });

    function populateCategoryOptions() {
        const categories = [...new Set(freshFindAllProduces.map(function (p) { return p.category; }))].sort();

        categories.forEach(function (category) {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    function matchesFilters(produce) {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const selectedCategory = categorySelect.value;

        if (searchTerm) {
            const haystack = (produce.name + " " + produce.description + " " + produce.category).toLowerCase();
            if (!haystack.includes(searchTerm)) {
                return false;
            }
        }

        if (selectedCategory && produce.category !== selectedCategory) {
            return false;
        }

        return true;
    }

    function renderResults() {
        resultsContainer.innerHTML = "";

        const filteredProduces = freshFindAllProduces.filter(matchesFilters);

        if (filteredProduces.length === 0) {
            emptyState.classList.add("produceEmptyStateVisible");
        } else {
            emptyState.classList.remove("produceEmptyStateVisible");
            filteredProduces.forEach(function (produce) {
                resultsContainer.appendChild(createProduceCardElement(produce));
            });
        }

        resultsContainer.querySelectorAll(".produceCardButton").forEach(function (button) {
            button.addEventListener("click", function () {
                const produce = freshFindAllProduces.find(function (p) {
                    return p.id === button.getAttribute("data-produce-id");
                });
                openExpandModal(produce);
            });
        });
    }

    function openExpandModal(produce) {
        expandImage.innerHTML = `<img src="${produce.image}" alt="${produce.name}">`;

        expandBody.innerHTML = `
            <span class="produceCardCategory">${produce.category}</span>
            <h3>${produce.name}</h3>
            <p class="produceExpandDescription">${produce.description}</p>
            <div class="produceExpandDetail">
                <h4>How It's Grown</h4>
                <p>${produce.growingProcess}</p>
            </div>
            <div class="produceExpandDetail">
                <h4>How It Reaches the Market</h4>
                <p>${produce.howItReachesMarket}</p>
            </div>
        `;

        expandOverlay.classList.add("produceExpandOverlayVisible");
    }

    function closeExpandModal() {
        expandOverlay.classList.remove("produceExpandOverlayVisible");
    }

    expandCloseButton.addEventListener("click", closeExpandModal);

    expandOverlay.addEventListener("click", function (event) {
        if (event.target === expandOverlay) {
            closeExpandModal();
        }
    });

    filtersForm.addEventListener("submit", function (event) {
        event.preventDefault();
        renderResults();
    });

    categorySelect.addEventListener("change", renderResults);

    resetButton.addEventListener("click", function () {
        filtersForm.reset();
        renderResults();
    });

});

// PRODUCE GUIDE PAGE JS ENDED
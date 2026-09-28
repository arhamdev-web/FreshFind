// SEASONAL DETAILS PAGE JS STARTED

document.addEventListener("DOMContentLoaded", function () {

    const notFoundSection = document.getElementById("seasonNotFoundSection");
    const detailsContent = document.getElementById("seasonalDetailsContent");

    const urlParams = new URLSearchParams(window.location.search);
    const seasonKey = urlParams.get("season");

    fetchJSON("data/seasonal.json").then(function (seasonalData) {
        const season = seasonalData.seasons.find(function (s) {
            return s.season === seasonKey;
        });

        if (!season) {
            notFoundSection.classList.add("marketNotFoundVisible");
            detailsContent.style.display = "none";
            return;
        }

        document.title = "FreshFind — " + season.displayName + " Produce";
        document.getElementById("seasonalDetailsHeading").textContent = season.displayName + " Produce";
        document.getElementById("seasonalDetailsSubheading").textContent = season.produceIds.length + " items typically in season right now.";
        document.getElementById("seasonalDetailsHero").classList.add("seasonal-" + season.season);

        fetchJSON("data/produces.json").then(function (produceData) {
            const itemsGrid = document.getElementById("seasonalItemsGrid");

            season.produceIds.forEach(function (produceId) {
                const produce = produceData.produces.find(function (p) {
                    return p.id === produceId;
                });

                if (!produce) {
                    return;
                }

                const item = document.createElement("div");
                item.classList.add("seasonalItemCard");
                item.innerHTML = `
                    <div class="seasonalItemImage">
                        <img src="${produce.image}" alt="${produce.name}">
                    </div>
                    <h3>${produce.name}</h3>
                    <p>${produce.description}</p>
                `;

                itemsGrid.appendChild(item);
            });
        });
    });

});

// SEASONAL DETAILS PAGE JS ENDED
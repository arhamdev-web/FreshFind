// SEASONAL PAGE JS STARTED

const seasonIcons = {
    winter: "fa-snowflake",
    summer: "fa-sun",
    autumn: "fa-leaf",
    spring: "fa-seedling"
};

document.addEventListener("DOMContentLoaded", function () {

    const seasonalGrid = document.getElementById("seasonalGrid");

    fetchJSON("data/seasonal.json").then(function (data) {
        data.seasons.forEach(function (season) {
            const card = document.createElement("a");
            card.classList.add("seasonCard", "seasonCard-" + season.season);
            card.href = "seasonalDetails.html?season=" + season.season;

            card.innerHTML = `
                <div class="seasonCardIcon">
                    <i class="fa-solid ${seasonIcons[season.season]}"></i>
                </div>
                <h2>${season.displayName}</h2>
                <p>${season.produceIds.length} items in season</p>
                <span class="seasonCardLink">Explore ${season.displayName} <i class="fa-solid fa-arrow-right"></i></span>
            `;

            seasonalGrid.appendChild(card);
        });
    });

});

// SEASONAL PAGE JS ENDED
// ABOUT PAGE JS STARTED

function animateCounter(element, target, durationMs) {
    const startTime = performance.now();

    function step(currentTime) {
        const progress = Math.min((currentTime - startTime) / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.round(eased * target).toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", function () {

    const statMarkets = document.getElementById("statMarkets");
    const statCities = document.getElementById("statCities");
    const statProduce = document.getElementById("statProduce");
    const statUsers = document.getElementById("statUsers");

    Promise.all([
        fetchJSON("data/markets.json"),
        fetchJSON("data/produces.json")
    ]).then(function (results) {
        const markets = results[0].markets;
        const produces = results[1].produces;

        const cityCount = new Set(markets.map(function (m) { return m.city; })).size;

        statMarkets.setAttribute("data-target", markets.length);
        statCities.setAttribute("data-target", cityCount);
        statProduce.setAttribute("data-target", produces.length);

        setupCounterObserver();
    });

    function setupCounterObserver() {
        const statCards = document.querySelectorAll(".aboutStatCard");
        let hasAnimated = false;

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;

                    document.querySelectorAll(".aboutStatNumber").forEach(function (numberElement) {
                        const target = parseInt(numberElement.getAttribute("data-target"), 10);
                        animateCounter(numberElement, target, 1500);
                    });
                }
            });
        }, { threshold: 0.4 });

        if (statCards.length > 0) {
            observer.observe(statCards[0].parentElement);
        }
    }

});

// ABOUT PAGE JS ENDED
document.addEventListener("DOMContentLoaded", function() {
    const container = $("#planets-container");
    const planets = Array.from(container.children);
    const degree = 360 / planets.length;
    const startingDegree = 90;
    const speed = 10;
    const centerX = container.clientWidth/2 - 25;
    const centerY = container.clientHeight/2 - 25;
    const radius = Math.min(centerX, centerY);

    let rotation = 0;

    planets.forEach((planet, i) => {
        planet.degree = (degree * i + startingDegree);
        const theta = planet.degree * Math.PI / 180;
        const x = centerX + radius * Math.cos(theta);
        const y = centerY + radius * Math.sin(theta);
        planet.style.transform = "translate("+x+"px, "+y+"px)";
    });

    $("#rotate").onclick = () => {
        let i = 0;
        rotation++;
        if (rotation > 1) return;
        const intervalId = setInterval(() => {

            planets.forEach((planet) => {
                const theta = (i + planet.degree) * Math.PI / 180;
                const x = centerX + radius * Math.cos(theta);
                const y = centerY + radius * Math.sin(theta);
                planet.style.transform = "translate("+x+"px, "+y+"px)";
            });

            i++;

            if (i === degree * rotation) {
                planets.forEach(planet => {
                    planet.degree += i;
                });
                rotation = 0;
                clearInterval(intervalId);
            }
        }, speed);
    }
});


function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
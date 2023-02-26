document.addEventListener("DOMContentLoaded", function() {
    //Init dom selection
    const planetsContainer = $("#planets-container");
    const planetsDescriptionContainer = $("#planets-description-container");
    
    if (planetsContainer === undefined) {
        console.error("Planets container not found")
    }
    if (planetsDescriptionContainer === undefined) {
        console.error("Planets description container not found")
    }
    
    const planets = Array.from(planetsContainer.children);
    const descriptions = Array.from(planetsDescriptionContainer.children);
    
    if (planets.length !== descriptions.length) {
        console.error("Planets and descriptions length don't match");
        return;
    }
    if (!planets.length) {
        console.error("No planets/Description found");
        return;
    }
    
    //Init Constants
    const DEGREE = 360 / planets.length;
    const SPEED = 10;

    //Planets
    const PLANET_SIZE = planets[0].clientWidth; //take the planet with the default width
    const PLANET_CONTAINER_CENTER_X = (planetsContainer.clientWidth - PLANET_SIZE) / 2;
    const PLANET_CONTAINER_CENTER_Y = (planetsContainer.clientHeight - PLANET_SIZE) / 2;
    const PLANET_CONTAINER_RADIUS = PLANET_CONTAINER_CENTER_X;
    //OR const PLANET_CONTAINER_RADIUS = Math.min(PLANET_CONTAINER_CENTER_X, PLANET_CONTAINER_CENTER_Y);

    //Descriptions
    const DESCRIPTION_SIZE = descriptions[0].clientWidth; //take the description with the default width
    const DESCRIPTION_CONTAINER_CENTER_X = (planetsDescriptionContainer.clientWidth - DESCRIPTION_SIZE) / 2;
    const DESCRIPTION_CONTAINER_CENTER_Y = (planetsDescriptionContainer.clientHeight - DESCRIPTION_SIZE) / 2;
    const DESCRIPTION_CONTAINER_RADIUS = DESCRIPTION_CONTAINER_CENTER_X*3;
    //OR const DESCRIPTION_CONTAINER_RADIUS = Math.min(DESCRIPTION_CONTAINER_CENTER_X, DESCRIPTION_CONTAINER_CENTER_Y);

    let currentDegree = 90;//Also starting degree (change it if you want to change the initial rotation)

    addWidthToPlanetsWithCircle(['Saturn', 'Uranus'], planets);

    setupPosition(planets, DEGREE, currentDegree, PLANET_CONTAINER_CENTER_X, PLANET_CONTAINER_CENTER_Y, PLANET_CONTAINER_RADIUS);
    setupPosition(descriptions, DEGREE, -currentDegree, DESCRIPTION_CONTAINER_CENTER_X, DESCRIPTION_CONTAINER_CENTER_Y, DESCRIPTION_CONTAINER_RADIUS);

    $$('.rotate').forEach((button, index) => button.onclick = () => rotate(index));

    let targetDegree = currentDegree;
    let i, rotating = false;
    function rotate(direction) {
        targetDegree += direction ? DEGREE : -DEGREE;
        if (rotating) {
            return;
        }
        rotating = true;
        const intervalId = setInterval(() => {
            if (targetDegree === currentDegree) {
                clearInterval(intervalId);
                rotating = false;
                return;
            }
            (targetDegree > currentDegree) ? i = 1 : i = -1;
            currentDegree += i;
            planets.forEach((planet) => {
                const theta = (i + planet.degree) * Math.PI / 180;
                const x = PLANET_CONTAINER_CENTER_X + PLANET_CONTAINER_RADIUS * Math.cos(theta);
                const y = PLANET_CONTAINER_CENTER_Y + PLANET_CONTAINER_RADIUS * Math.sin(theta);
                planet.style.transform = "translate("+x+"px, "+y+"px)";
                planet.degree += i;
            });
            i = -i;
            descriptions.forEach((description) => {
                const theta = (i + description.degree) * Math.PI / 180;
                const x = DESCRIPTION_CONTAINER_CENTER_X + DESCRIPTION_CONTAINER_RADIUS * Math.cos(theta);
                const y = DESCRIPTION_CONTAINER_CENTER_Y + DESCRIPTION_CONTAINER_RADIUS * Math.sin(theta);
                description.style.transform = "translate("+x+"px, "+y+"px)";
                description.degree += i;
            });
        }, SPEED);
    }
});

function addWidthToPlanetsWithCircle(planetWithCircle, planets) {
    planets.forEach(planet => {
        if(planetWithCircle.includes(planet.getAttribute('alt'))) {
            planet.style.width = planet.clientWidth + 30 + 'px';
        }
    });
}

function setupPosition(elements, DEGREE, STARTING_DEGREE, CENTER_X, CENTER_Y, RADIUS) {
    elements.forEach((element, i) => {
        element.degree = (DEGREE * i + STARTING_DEGREE);
        const theta = element.degree * Math.PI / 180;
        const x = CENTER_X + RADIUS * Math.cos(theta);
        const y = CENTER_Y + RADIUS * Math.sin(theta);
        element.style.transform = "translate("+x+"px, "+y+"px)";
    });
}


/* Some default functions to make things simple  (POV: I like the jquery approach) */
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
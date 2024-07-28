const planetsContainer = $("#planets-container");
const planetsDescriptionContainer = $("#planets-description-container");

planetsContainer.innerHTML = planets.map((planet) => {
    return `<img src="${planet.src}" alt="${planet.name}">`;
}).join('');
const planetImages = Array.from(planetsContainer.children);
planets.forEach((planet, i) => {if(planet.width) planetImages[i].style.width = planet.width + "px"})
planets.reverse();
planets.unshift(planets.pop());
planetsDescriptionContainer.innerHTML = planets.map((planet) => {
    return `<div class="planet-description ${planet.name.toLowerCase()}" >
                <h1>${planet.name}</h1>
                <h2 >${planet.description}</h2>
            </div>`;
}).join('');
const planetDescriptions = Array.from(planetsDescriptionContainer.children);

let visibleImageIndex = 0, visibleDescriptionIndex = 0;
planetImages[visibleImageIndex].classList.add('visible');
planetDescriptions[visibleDescriptionIndex].classList.add('visible');

const count = planetImages.length;
const STEP = 360 / count;
let target = 90, current = 90, direction = 1, rotating = false;

$$('.rotate').forEach((button) => button.onclick = () => {
    target += button.classList.contains('right') ? STEP : -STEP;
    direction = current < target ? 1 : -1;
    planetImages[visibleImageIndex].classList.remove('visible');
    planetDescriptions[visibleDescriptionIndex].classList.remove('visible');
    visibleImageIndex = (visibleImageIndex + (direction * -1) + count) % count;
    visibleDescriptionIndex = (visibleDescriptionIndex + (-direction * -1) + count) % count;
    planetImages[visibleImageIndex].classList.add('visible');
    planetDescriptions[visibleDescriptionIndex].classList.add('visible');
    if (!rotating) {
        rotating = true;
        rotate();
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        target += event.key === 'ArrowRight' ? STEP : -STEP;
        direction = current < target ? 1 : -1;
        planetImages[visibleImageIndex].classList.remove('visible');
        planetDescriptions[visibleDescriptionIndex].classList.remove('visible');
        visibleImageIndex = (visibleImageIndex + (direction * -1) + count) % count;
        visibleDescriptionIndex = (visibleDescriptionIndex + (-direction * -1) + count) % count;
        planetImages[visibleImageIndex].classList.add('visible');
        planetDescriptions[visibleDescriptionIndex].classList.add('visible');
        if (!rotating) {
            rotating = true;
            rotate();
        }
    }
});

const setupPosition = (element, i) => {
    const RADIUS = window.innerWidth / 2;
    const SIZE = element.clientWidth;
    const ANGEL = (current + (i * STEP)) * (Math.PI / 180);
    const x = RADIUS * Math.cos(ANGEL) - SIZE / 2;
    const y = RADIUS * Math.sin(ANGEL) - SIZE / 2;
    element.style.transform = "translate("+x+"px, "+y+"px)";
}
const setupDescriptionPosition = (element, i) => {
    const RADIUS = window.innerWidth / 2;
    const SIZE = element.clientWidth;
    const ANGEL = (-current + (i * STEP)) * (Math.PI / 180);
    const x = RADIUS * Math.cos(ANGEL) - SIZE / 2;
    const y = RADIUS * Math.sin(ANGEL) - SIZE / 2;
    element.style.transform = "translate("+x+"px, "+y+"px)";
}
function rotate() {
    planetImages.forEach(setupPosition);
    planetDescriptions.forEach(setupDescriptionPosition);
    current += direction;
    if (current === target) {
        rotating = false;
        return;
    }
    requestAnimationFrame(rotate);
}

$('#planets-container').style.top = -(window.innerWidth / 2 - 150) + "px";
const bottom = window.innerHeight > window.innerWidth ? 250 : 150
$('#planets-description-container').style.bottom = -(window.innerWidth / 2 - bottom) + "px";
planetImages.forEach(setupPosition);
planetDescriptions.forEach(setupDescriptionPosition);



/* Some default functions to make things simple  (POV: I like the jquery approach) */
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}

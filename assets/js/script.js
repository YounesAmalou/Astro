const radius = 225;
const centerX = 225;
const centerY = 225;

let i = 0;

const image = document.querySelector('.image');
const intervalId = setInterval(() => {

    const theta = i * Math.PI / 180;
    const x = centerX + radius * Math.cos(theta);
    const y = centerY + radius * Math.sin(theta);

    image.style.transform = "translate("+x+"px, "+y+"px)";

    i++;

    if (i === 360) {
        clearInterval(intervalId);
    }
}, 10);

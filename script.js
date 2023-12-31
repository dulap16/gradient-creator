const canvas = document.getElementById("canvas");
const slider = document.getElementById("slider");
const randomButton = document.getElementById("button");
const pen = canvas.getContext("2d");

let colors = [];
colors[0] = "#ff0008";
colors[1] = "#0022ff";
colors[2] = "#83f6ab";
colors[3] = "#098ba9";
colors[4] = "#fa89ec";
colors[5] = "#ff0008";

let nrOfColors = colors.length;
const x = 0;
const y = 0;
let currentHeight = 50;
const maxHeight = canvas.clientHeight;
const length = canvas.clientWidth;

let individualLength = length / (nrOfColors - 1);

class RGB {
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
}

document.getElementById("button").addEventListener("click", randomGradient);

function initAll() {
    initCanvas();
    initSlider();
}

function initCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    pen.lineWidth = 2;
    pen.strokeStyle = "#ffffff";
}

function initSlider() {
    slider.min = 0;
    slider.max = maxHeight;
    slider.value = currentHeight;
}

function checkIfSliderChanged() {
    if (currentHeight != slider.value)
        return true;
    return false;
}

function updateHeightToSlider() {
    currentHeight = slider.value;
}


function createRandomColorHex() {
    let rgb = new RGB(Math.random(3) * 255, Math.random(1) * 255, Math.random(2) * 255)
    rgb = formatColor(rgb);

    return rgbToHex(rgb);
}

function randomGradient() {
    console.log("press");

    nrOfColors = Math.floor(Math.random(10) * 5 + 2);
    colors = [];

    for (let i = 0; i < nrOfColors; i++) {
        colors[i] = createRandomColorHex();
    }

    individualLength = length / (nrOfColors - 1);
}


function hexToRGB(hex) {
    let redHex = hex.substr(1, 2);
    let greenHex = hex.substr(3, 2);
    let blueHex = hex.substr(5, 2);

    return new RGB(hexColorToInt(redHex), hexColorToInt(greenHex), hexColorToInt(blueHex));
}

function hexToInt(hex) {
    let val = hex.charCodeAt(0);

    if (val >= '0'.charCodeAt(0) && val <= '9'.charCodeAt(0))
        val = val - '0'.charCodeAt(0);
    else val = val - 'a'.charCodeAt(0) + 10;

    return val;
}

function hexColorToInt(hex) {
    return 16 * hexToInt(hex.substr(0, 1)) + hexToInt(hex.substr(1, 1));
}

function intToHex(nr) {
    let code = nr + '0'.charCodeAt(0);
    if (nr >= 10) {
        code = 'a'.charCodeAt(0) + (nr - 10);
    }

    return String.fromCharCode(code);
}

function intToColor(nr) {
    let code = intToHex(nr / 16);
    code = code + intToHex(nr % 16);

    return code;
}

function rgbToHex(color) {
    let code = "#";
    code = code + intToColor(color.red) + intToColor(color.green) + intToColor(color.blue);

    return code;
}

function calcSpeedFromHex(color1, color2, length) {
    let color1rgb = hexToRGB(color1);
    let color2rgb = hexToRGB(color2);

    return calcSpeedFromRGB(color1rgb, color2rgb, length);
}

function calcSpeedFromRGB(color1, color2, length) {
    let red = (color2.red - color1.red) / length;
    let green = (color2.green - color1.green) / length;
    let blue = (color2.blue - color1.blue) / length;

    return new RGB(red, green, blue);
}

function updateColor(current, speed) {
    let newColor = current;

    newColor.red = parseFloat((current.red + speed.red).toFixed(8));
    newColor.green = parseFloat((current.green + speed.green).toFixed(8));
    newColor.blue = parseFloat((current.blue + speed.blue).toFixed(8));

    return newColor;
}

function formatColor(color) {
    let newColor = color;
    newColor.red = Math.floor(newColor.red);
    newColor.green = Math.floor(newColor.green);
    newColor.blue = Math.floor(newColor.blue);

    color = newColor;
    return newColor;
}

function setPenToColor(color) {
    pen.strokeStyle = color;
}

function drawOneColumn(x, y, height) {
    pen.beginPath();
    pen.moveTo(x, y);
    pen.lineTo(x, y + height);
    pen.stroke();
}

function drawOneColorredColumn(x, y, height, color) {
    setPenToColor(color);
    drawOneColumn(x, y, height);
}


function drawGradient() {
    pen.clearRect(0, 0, canvas.width, canvas.height);
    if (checkIfSliderChanged) {
        updateHeightToSlider();
    }
    for (let j = 0; j < nrOfColors - 1; j++) {
        let speed = calcSpeedFromHex(colors[j], colors[j + 1], individualLength);
        let current = hexToRGB(colors[j]);

        for (let i = 0; i < individualLength; i++) {
            current = updateColor(current, speed);

            let formattedColor = new RGB(current.red, current.green, current.blue);
            formattedColor = formatColor(formattedColor);
            drawOneColorredColumn(x + i + j * individualLength, y, currentHeight, rgbToHex(formattedColor));
        }
    }

    requestAnimationFrame(drawGradient);
}



function main() {
    initAll();
    drawGradient();
}

main();
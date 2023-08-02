const canvas = document.getElementById("canvas");
const gradientPlaceholder = document.getElementById("gradient");
const pen = canvas.getContext("2d");
const gradientPos = gradientPlaceholder.getClientRects();

let colors = [];
colors[0] = "#ff0008";
colors[1] = "#0022ff";

class RGB {
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
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


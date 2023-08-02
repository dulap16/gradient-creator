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


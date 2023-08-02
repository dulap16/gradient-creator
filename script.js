const canvas = document.getElementById("canvas");
const gradientPlaceholder = document.getElementById("gradient");
const pen = canvas.getContext("2d");
const gradientPos = gradientPlaceholder.getClientRects();

let colors = [];
colors[0] = "#ff0008";
colors[1] = "#0022ff";


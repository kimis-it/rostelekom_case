if(!canvas) { const canvas = document.querySelector(".canvas"); }
const containerElem = document.querySelector(".container");
const ctx = canvas.getContext("2d");
const drawingButton = document.querySelector(".drawing_button");
const erasingButton = document.querySelector(".erasing_button");

let coord = { x: 0, y: 0 };
let drawingMode = false;

let toggleDrawingMode = () => {
    canvas.classList.toggle("canvas-active");
    drawingButton.classList.toggle("drawing_button-active");
    drawingMode ? drawingMode = false : drawingMode = true;
}

let exitDrawingMode = () => {
    canvas.style.zIndex = -1000;
    canvas.style.cursor = "default";
}

let resize = () => {
  ctx.save();
  ctx.canvas.width = containerElem.offsetWidth + containerElem.style.paddingLeft + containerElem.style.paddingRight;
  ctx.canvas.height = containerElem.offsetHeight;
  ctx.restore();
}

let reposition = (e) =>  {
  coord.x = e.clientX - canvas.offsetLeft - canvas.getBoundingClientRect().left;
  coord.y = e.clientY - canvas.offsetTop - canvas.getBoundingClientRect().top;
}

let start = (e) => {
  document.addEventListener("mousemove", draw);
  reposition(e);
}
let stop = () => {
  document.removeEventListener("mousemove", draw);
}

let eraseCanvas = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

let draw = (e) => {
    if(drawingMode) {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.strokeStyle = "rgb(240, 73, 17)";
        ctx.moveTo(coord.x, coord.y);
        reposition(e);
        ctx.lineTo(coord.x, coord.y);
        ctx.stroke();
    }
}

resize();

drawingButton.addEventListener("click", toggleDrawingMode);
erasingButton.addEventListener("click", eraseCanvas);

document.addEventListener("mousedown", start);
document.addEventListener("mouseup", stop);
window.addEventListener("resize", resize);
addRowButton.addEventListener("click", resize);
//window.addEventListener("click", resize);

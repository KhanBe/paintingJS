const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
   painting = true;
}

// 누르지않는동안에 path라는 안보이는 좌표가 움직인다.
// 누르면 path좌표 부터 lineto좌표까지 stroke(선을 긋는다).
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } 
  else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}
function handleRangeChange(event){
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(){
  if(filling){
    filling = false;
    mode.innerText = "Fill";
  }
  else{
    filling = true;
    mode.innerText = "Paint";
  }
}

 if (canvas) {
   canvas.addEventListener("mousemove", onMouseMove);
   canvas.addEventListener("mousedown", startPainting);
   canvas.addEventListener("mouseup", stopPainting);
   canvas.addEventListener("mouseleave", stopPainting);
 }

 Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
  );

  if(range){
    range.addEventListener("input",handleRangeChange);
  }

  if(mode){
    mode.addEventListener("click",handleModeClick);
  }
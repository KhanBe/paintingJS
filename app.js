const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
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
    ctx.fillStyle = color;
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

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event){
  event.preventDefault();//메뉴안뜨게하기
}

function handleSaveClick(){
  const image = canvas.toDataURL();//"image/jpeg"를 넣으면 jpeg 디폴트는png
  const link = document.createElement("a");
  link.href = image;
  link.download = "Painting"
  link.click();
}
 if (canvas) {
   canvas.addEventListener("mousemove", onMouseMove);
   canvas.addEventListener("mousedown", startPainting);
   canvas.addEventListener("mouseup", stopPainting);
   canvas.addEventListener("mouseleave", stopPainting);
   canvas.addEventListener("mousedown", handleCanvasClick);
   canvas.addEventListener("contextmenu",handleCM);//우클릭메뉴입력시
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

  if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
  }
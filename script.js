let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let drawing = false;
let tool = "brush";
let color = "#000000";
let brushSize = 3;

let startX,startY;

let history = [];

document.getElementById("colorPicker").addEventListener("change",(e)=>{
color = e.target.value;
});

document.getElementById("brushSize").addEventListener("change",(e)=>{
brushSize = e.target.value;
});

function setTool(t){
tool = t;
}

function saveState(){
history.push(canvas.toDataURL());
}

canvas.addEventListener("mousedown",(e)=>{

saveState();

drawing = true;

startX = e.offsetX;
startY = e.offsetY;

ctx.beginPath();
ctx.moveTo(startX,startY);

});

canvas.addEventListener("mouseup",(e)=>{

drawing = false;

let endX = e.offsetX;
let endY = e.offsetY;

if(tool==="rect"){

ctx.strokeStyle = color;
ctx.lineWidth = brushSize;

ctx.strokeRect(startX,startY,endX-startX,endY-startY);

}

if(tool==="circle"){

let radius = Math.sqrt(
Math.pow(endX-startX,2)+
Math.pow(endY-startY,2)
);

ctx.beginPath();
ctx.arc(startX,startY,radius,0,Math.PI*2);
ctx.strokeStyle = color;
ctx.lineWidth = brushSize;
ctx.stroke();

}

ctx.beginPath();

});

canvas.addEventListener("mousemove",(e)=>{

if(!drawing) return;

if(tool==="brush"){

ctx.lineWidth = brushSize;
ctx.lineCap = "round";
ctx.strokeStyle = color;

ctx.lineTo(e.offsetX,e.offsetY);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(e.offsetX,e.offsetY);

}

if(tool==="eraser"){

ctx.lineWidth = brushSize;
ctx.lineCap = "round";
ctx.strokeStyle = "white";

ctx.lineTo(e.offsetX,e.offsetY);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(e.offsetX,e.offsetY);

}

});

function undo(){

if(history.length>0){

let img = new Image();
img.src = history.pop();

img.onload=function(){

ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.drawImage(img,0,0);

}

}

}

function clearCanvas(){
ctx.clearRect(0,0,canvas.width,canvas.height);
}

function downloadImage(){

let link=document.createElement("a");
link.download="drawing.png";
link.href=canvas.toDataURL();
link.click();

}
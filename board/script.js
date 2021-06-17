//pen variable
let penBtn = document.querySelector(".pen");
let penOptions = document.querySelector(".pen-options");
let penSizeRangeBtn = document.querySelector(".thickness");
let penFlag = false;
//eraser variable
let eraseBtn = document.querySelector(".eraser");
let isErasePressed = false;
let eraserFlag = false;
let eraserActive = false;
//shape variables
let shapeOptions = document.querySelector(".shape-options");
let typeOfShape = document.querySelectorAll(".shape-options>*");
let shape = document.querySelector(".shapes");
let shapeFlag = false;
//clear canvas variable
let clearCanvas = document.querySelector(".clear");
//undo and redo on canvas
let undoBtn = document.querySelector(".undo");
let redoBtn = document.querySelector(".redo");
let undoRedoTracker = [];
let track = -1;
//download variable
let save = document.querySelector(".save");
//canvas variable
let canvas = document.querySelector("canvas");
let tool = canvas.getContext("2d");
let isPressed = false;

let pencilColor = "black";
let colors = document.querySelectorAll(".color");

canvas.width = Number(window.innerWidth); //canvas width
canvas.height = Number(window.innerHeight); //canvas hight

let x; //for x-cordinate
let y; //for y-cordinates

canvas.addEventListener("mousedown", brushDown, false);
canvas.addEventListener("mousemove", brushMove, false);
canvas.addEventListener("mouseup", brushUp, false);

let background = new Image();
background.onload = function () {
  tool.drawImage(background, 0, 0);
};

function getCoordinates(canvas, e) {
  return {
    x: e.clientX,
    y: e.clientY,
  };
}

function brushDraw(canvas, x, y) {
  if (isPressed) {
    tool.lineTo(x, y);
    tool.stroke();
    canvas.style.cursor = "crosshair";
  }
}

function brushDown(e) {
  isPressed = true;
  let coordinates = getCoordinates(canvas, e);
  tool.lineWidth = 5;
  x = coordinates.x; //draw where cursor is moved
  y = coordinates.y;
  tool.beginPath();
  tool.moveTo(x, y);
  tool.lineTo(x, y);
  tool.stroke();
  tool.closePath();
}

function brushMove(e) {
  let coordinates = getCoordinates(canvas, e);
  x = coordinates.x;
  y = coordinates.y;
  brushDraw(canvas, x, y);
}

function brushUp(e) {
  isPressed = false;
  undoRedoTracker.push(canvas.toDataURL());
  track = undoRedoTracker.length - 1;
}

clearCanvas.addEventListener("click", function () {
  removeOptions();
  tool.clearRect(0, 0, canvas.width, canvas.height);
});
// pick pencil color to draw
for (let i = 0; i < colors.length; i++) {
  colors[i].addEventListener("click", function () {
    tool.strokeStyle = colors[i].style.color;
     });
}
penBtn.addEventListener("click", function () {
  if (shapeFlag) {    // agr phle s shape options dispay ho rhe h toh unhe display  none krdo
    shapeOptions.style.display = "none";
    shapeFlag = !shapeFlag;
  }
  if (penFlag == false) {  // first time click on pencil
    penOptions.style.display = "flex";
  } else {
    penOptions.style.display = "none";
    let penColor = document.querySelector(".randomCol");
    pencilColor = penColor.value;
    tool.strokeStyle = personalbar;
  }
  penFlag = !penFlag;
  canvas.addEventListener("mousedown", brushDown, false);
  canvas.addEventListener("mousemove", brushMove, false);
  canvas.addEventListener("mouseup", brushUp, false);
});

shape.addEventListener("click", function (e) {
  if (penFlag) { //agr phle s pen options dispay ho rhe h toh unhe display  none krdo
    penOptions.style.display = "none";
    penFlag = !penFlag;
  }
  if (shapeFlag) {
    shapeOptions.style.display = "none";
  } else {
    shapeOptions.style.display = "flex";
    for (let i = 0; i < typeOfShape.length; i++) {
      typeOfShape[i].addEventListener("click", function (e) {
        let shapeTodraw = e.target.classList[0];
        console.log(shapeTodraw);
        if (shapeTodraw == "circle") {  //draw a circle
          tool.arc(200, 300, 50, 0, 2 * Math.PI);
          tool.stroke();
        } else if (shapeTodraw == "square") { //draw a square
          tool.rect(200, 170, 70, 70);
          tool.stroke();
        } else if (shapeTodraw == "triangle") { ///draw a triangle
          tool.beginPath();
          tool.moveTo(400, 300);
          tool.lineTo(500, 300);
          tool.lineTo(300, 200);
          tool.lineTo(400, 300);
          tool.stroke();
        } else {  //draw rectanglr
          tool.rect(120, 170, 60, 60);
          tool.stroke();
        }
      });
    }
  }
  shapeFlag = !shapeFlag;
});

eraseBtn.addEventListener("click", function () {
  removeOptions();  //agr phle s shape options ya phir pen options dispay ho rhe h toh unhe display  none krdo
  pencilColor = "white";
  tool.strokeStyle = pencilColor;
  eraserActive = true;
  canvas.addEventListener("mousedown", brushDown, false);
  canvas.addEventListener("mousemove", brushMove, false);
  canvas.addEventListener("mouseup", brushUp, false);
});

//saving the drawn image into gallery
/*
let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", function () {
  tool.drawImage(canvas, 0, 0);
  addMediaToGallery(canvas.toDataURL(), "img");
});*/

undoBtn.addEventListener("click", (e) => {
  //canvas.addEventListener("mouseup",brushUp, false);
  removeOptions();
  if (track >= 0) track--;
 tool.clearRect(0, 0, canvas.width, canvas.height);
  let img = new Image();
  img.src = undoRedoTracker[track];
  img.onload = (e) => {
    tool.drawImage(img, 0, 0, img.width, img.height);
  };
});

redoBtn.addEventListener("click", (e) => {
  //canvas.addEventListener("mouseup",brushUp, false);
  removeOptions();
  if (track < undoRedoTracker.length - 1) track++;
 let img = new Image();
  img.src = undoRedoTracker[track];
  img.onload = (e) => {
    tool.clearRect(0, 0, canvas.width, canvas.height);
    tool.drawImage(img, 0, 0, img.width, img.height);
  };
});

//active buttons
let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    buttons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
  });
});

let input = document.querySelector("input");
input.addEventListener("click", function () {
  this.classList.toggle("active");
});
function removeOptions() {
  if (penFlag) {
    penOptions.style.display = "none";
    penFlag != penFlag;
  }
  if (shapeFlag) {
    shapeOptions.style.display = "none";
    shapeFlag = !shapeFlag;
  }
}

save.addEventListener("click", function(){
    let a=document.createElement("a");
    // tool.scale(scaleLevel,scaleLevel);
   // tool.fillStyle="white";
   // tool.fillRect(0,0,board.width,board.height);
      let url=canvas.toDataURL();
      a.href=url;
      a.download="file.jpeg";
      
      a.click();
      a.remove();
})
const myCanvas = document.getElementById("my-canvas");
// Note: context has all the methods for drawing things
const ctx = myCanvas.getContext("2d");
  // console.log(ctx); //test if connected

// global variables:
let highScore = 0;
let shotClock = 24;
let timeOut = false;

// basketball court background image:
const courtImg = new Image();
courtImg.src = "./images/full-court-wood.png";

let courtX = 800;
let courtY = 500;

function drawBackground(){
  // ctx.drawImage(courtImg, courtX, courtY);
  // ctx.fillStyle = "beige";
  // ctx.fillRect(0, 0, 800, 500);
  // High score board:
  // Shot clock timer:
  ctx.fillStyle = "black"
  ctx.font = "30px Arial"
  ctx.fillText(`HIGH SCORE: ${highScore} `, 550, 490)
  ctx.fillText(`SHOT CLOCK: ${shotClock} `, 550, 30)
}
// drawBackground();

const basketballImg = new Image();
const hoopImg = new Image();

basketballImg.src = "./images/basketball.png";
hoopImg.src = "./images/hoop-backboard.png";

let basketballX = 600;
let basketballY = 200;

let hoopX = 0;
let hoopY = 150;

courtImg.onload = function(){
  // ctx.drawImage(whichImg, x, y, width, height)
  ctx.drawImage(courtImg, courtX, courtY, 800, 500);
}

basketballImg.onload = function(){
    // ctx.drawImage(whichImg, x, y, width, height)
    ctx.drawImage(basketballImg, basketballX, basketballY, 33, 33);
  }

hoopImg.onload = function(){
    // ctx.drawImage(whichImg, x, y, width, height)
    ctx.drawImage(hoopImg, hoopX, hoopY, 150, 190);
  }

// Moving the hoop!
// ----------------

document.onkeydown = function(event){
  // check console inspector to find keyCode
  console.log(event.keyCode);
  switch(event.keyCode){
    // left:
    case 37:
      hoopX -= 10;
      break;
    // right:
    case 39:
      hoopX += 10;
      break;
    // up:
    case 38: 
      hoopY -= 20;
      break;
    // down:
    case 40:
      hoopY += 20;
      break;
  }
}

// Animate the Canvas / Basketball Court:
// --------------------------------------
function drawingLoop(){
  // clear canvas
  ctx.clearRect(0, 0, 1000, 500);

  drawBackground();
  // move basketball by changing X coordinate in every loop call
  basketballX -= 8;

  // once the basketball disappears from the canvas:
  if(basketballX < -33){
    basketballX = 800;
    basketballY = Math.floor(Math.random() * 477);
  }
  
  drawFullCourt();
  if(timeOut === false){
    // redraw the whole court with callback function
    requestAnimationFrame(function(){
      // recursive loop
      drawingLoop();
    })
  }

}

function drawFullCourt(){
  // ctx.drawImage(whichImg, imgX, imgY, width, height)
  ctx.drawImage(basketballImg, basketballX, basketballY, 33, 33);
  ctx.drawImage(hoopImg, hoopX, hoopY, 150, 190);
  if(swishCollision(hoopX, hoopY, basketballX, basketballY)){
    console.log("SCORE!");
  }
  if (swishCollision === true){
    highScore+2;
  }
}

function swishCollision(obj1X, obj1Y, obj2X, obj2Y){
  // hoopY + hoop-height >= basketballY
  return obj1Y + 150 - 33 >= obj2Y
    // hoopY + basketballY + basketball-height
    && obj1Y <= obj2Y + 33
    // hoopX + hoop-width >= basketballX
    && obj1X + 190 - 33 >= obj2X
    // hoopX <= basketballX + basketball-width
    && obj1X <= obj2X + 33
}

// call drawingLoop(); to activate/start looping!
drawingLoop();
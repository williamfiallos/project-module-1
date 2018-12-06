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

let courtX = 0;
let courtY = 0;

function drawBackground(){
  // ctx.drawImage(courtImg, courtX, courtY);
  // ctx.fillStyle = "beige";
  // ctx.fillRect(0, 0, 800, 500);
  // High score board:
  // Shot clock timer:
  // courtImg.onload = function(){
    // ctx.drawImage(whichImg, x, y, width, height)
    ctx.drawImage(courtImg, courtX, courtY, 1000, 600);
  // }
  ctx.fillStyle = "black"
  ctx.font = "30px Arial"
  ctx.fillText(`HIGH SCORE: ${highScore} `, 730, 560)
  ctx.fillText(`SHOT CLOCK: ${shotClock} `, 710, 60)
}
// drawBackground();

const basketballImg = new Image();
const hoopImg = new Image();

basketballImg.src = "./images/basketball.png";
hoopImg.src = "./images/hoop-backboard.png";

let basketballX = 500;
let basketballY = 290;

let hoopX = 0;
let hoopY = 210;



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
    // // left:
    // case 37:
    //   hoopX -= 10;
    //   break;
    // // right:
    // case 39:
    //   hoopX += 10;
    //   break;
    // up:
    case 38: 
      hoopY -= 15;
      break;
    // down:
    case 40:
      hoopY += 15;
      break;
  }
  // console.log("hoopX: ", hoopX, "hoopY: ", hoopY);
}

// Animate the Canvas / Basketball Court:
// --------------------------------------
function drawingLoop(){
  // clear canvas
  ctx.clearRect(0, 0, 1000, 600);

  drawBackground();
  // move basketball by changing X coordinate in every loop call
  basketballX -= 8;

  // once the basketball disappears from the canvas:
  if(basketballX < -33){
    basketballX = 1000;
    basketballY = Math.floor(Math.random() * 577);
  }
  
  // when basketball swishes:
  // if(swishCollision === true && basketballX < 140){
  //   basketballX = 800;
  // }

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
  // if(hoopY + 90 >= basketballY && hoopY + 80 <= basketballY){
  //   console.log("hoopY: "+hoopY, "basketballY: "+basketballY);
  // }

  if(swishCollision(hoopX, hoopY, basketballX, basketballY)){
    console.log("SCORE!");
  }
  if (swishCollision(hoopX, hoopY, basketballX, basketballY)){
    highScore+=2;
  }
}

// true or false function
function swishCollision(obj1X, obj1Y, obj2X, obj2Y){
  // hoopY + hoopY-length >= basketballY && hoopY + hoopY-length <= basketballY
  return obj1Y + 100 >= obj2Y && obj1Y + 60 <= obj2Y 
  // hoopX + hoopX-length >= basketballX && hoopX + hoopX-length <= basketballX
    && obj1X + 150 >= obj2X && obj1X + 143 <= obj2X
        
}

// call drawingLoop(); to activate/start looping!
drawingLoop();
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
  // ctx.drawImage(whichImg, x, y, width, height)
  ctx.drawImage(courtImg, courtX, courtY, 1000, 600);
  // ctx.drawImage(basketballImg, basketballX, basketballY, 33, 33);
  // ctx.drawImage(hoopImg, hoopX, hoopY, 150, 190);
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


courtImg.onload = function(){
  // ctx.drawImage(whichImg, x, y, width, height)
  // ctx.drawImage(courtImg, courtX, courtY, 1000, 600);

  drawBackground();

  // basketballImg.onload = function(){
      // ctx.drawImage(whichImg, x, y, width, height)
      ctx.drawImage(basketballImg, basketballX, basketballY, 33, 33);
  // }

  // hoopImg.onload = function(){
      // ctx.drawImage(whichImg, x, y, width, height)
      ctx.drawImage(hoopImg, hoopX, hoopY, 150, 190);
  // }
  
}

// Moving the hoop!
// ----------------

let hoopUp = false;
let hoopDown = false;

document.onkeydown = function(event){
  // check console inspector to find keyCode
  console.log(event.keyCode);
  let i = 0;

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
      // hoopY -= 15;
      hoopUp = true;
      break;
    // down:
    case 40:
      // hoopY += 15;
      hoopDown = true;
      break;
  }
  // console.log("hoopX: ", hoopX, "hoopY: ", hoopY);
}
document.onkeyup = function(event){
  // check console inspector to find keyCode
  console.log(event.keyCode);
  let i = 0;

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
      // hoopY -= 15;
      hoopUp = false;
      break;
    // down:
    case 40:
      // hoopY += 15;
      hoopDown = false;
      break;
  }
}

// Animate the Canvas / Basketball Court:
// --------------------------------------
function drawingLoop(){
  // clear canvas
  ctx.clearRect(0, 0, 1000, 600);

  drawBackground();
  // move basketball by changing X coordinate in every loop call
  basketballX -= 8;

  switch(true){
    case hoopUp:
    hoopY -= 8;
    break;
    case hoopDown:
    hoopY += 8;
    break;
  } 

  // once the basketball disappears from the canvas:
  if(basketballX < -33){
    basketballX = 1000;
    basketballY = Math.floor(Math.random() * 577);
  } 

  drawEverything();
  
  if(timeOut === false){
    // redraw the whole court with callback function
    requestAnimationFrame(function(){
      // recursive loop
      drawingLoop();
    })
  }
  
  
  // setInterval(drawingLoop, 50);
}

function drawEverything(){
  // ctx.drawImage(whichImg, imgX, imgY, width, height)
  ctx.drawImage(basketballImg, basketballX, basketballY, 33, 33);
  ctx.drawImage(hoopImg, hoopX, hoopY, 150, 190);
  if(swishCollision(hoopX, hoopY, basketballX, basketballY, 100, 60)){
    // console.log("SCORE!");
    highScore+=2;
    basketballX = -33;
  } if(swishCollision(hoopX, hoopY, basketballX, basketballY, 170, -10)){
    basketballX = -33;
  }
}

// when scoring a swish. true or false function
function swishCollision(obj1X, obj1Y, obj2X, obj2Y, bottomY, topY){
  // hoopY + hoopY-length >= basketballY && hoopY + hoopY-length <= basketballY
  return obj1Y + bottomY >= obj2Y && obj1Y + topY <= obj2Y 
  // hoopX + hoopX-length >= basketballX && hoopX + hoopX-length <= basketballX
    && obj1X + 110 >= obj2X && obj1X + 100 <= obj2X
}

function gameOver(){
  // clear canvas to stop receiving basketballs
  ctx.clearRect(0, 0, 1000, 600);
  // redraw full court to see court
  // drawBackground();
  // create Sadbron face image
  const sadbronImg = new Image();
  sadbronImg.src = "./images/sadbron.png";
  

  // change the value of timeOut to true
  timeOut = true;
  // display Game Over
  setTimeout(function(){
  ctx.font = "bold 50px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("GAME OVER", 340, 100);
  ctx.drawImage(sadbronImg, 350, 130, 300, 400);
  }, 300)
  
  // sadbronImg.onload = function(){
    
  // }
}

let startTimer = setInterval(function(){
  shotClock--;
  if(shotClock === 0){
    gameOver();
  }
}, 1000);

// call drawingLoop(); to activate/start looping!
// drawBackground();
// drawingLoop();

// JUMP BALL! BUTTON (Start Game)
// ------------------------------
let button = document.getElementById("button");
button.onclick = drawingLoop;

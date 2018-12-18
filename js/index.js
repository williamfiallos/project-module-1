const myCanvas = document.getElementById("my-canvas");
// Note: context has all the methods for drawing things
const ctx = myCanvas.getContext("2d");
  // console.log(ctx); //test if connected



  
// global variables:
let highScore = 0;
let shotClock = 24;
let timeOut = false;
let startTimer;




function shotClockTimer(){
  startTimer = setInterval(function(){
  shotClock--;
  if(shotClock === 0){
    gameOver();
    clearInterval(startTimer);
  }
}, 1000);}




// basketball court background image:
const courtImg = new Image();
courtImg.src = "./images/miami-heat.png";

let courtX = 0;
let courtY = 0;

function drawBackground(){
  // ctx.drawImage(whichImg, x, y, width, height)
  ctx.drawImage(courtImg, courtX, courtY, 1000, 600);
  // ctx.drawImage(basketballImg, basketballX, basketballY, 33, 33);
  // ctx.drawImage(hoopImg, hoopX, hoopY, 150, 190);
  ctx.fillStyle = "rgb(1, 183, 255)"
  ctx.font = "30px Roboto Condensed"
  ctx.fillText(`HIGH SCORE: ${highScore} `, 510, 100)
  ctx.fillStyle = "black"
  ctx.fillText(`SHOT CLOCK: ${shotClock} `, 510, 70)
}

// drawBackground();

const basketballImg = new Image();
const hoopImg = new Image();

basketballImg.src = "./images/basketball.png";
hoopImg.src = "./images/hoop-backboard.png";

let basketballX = 485;
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

// on key down:
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
// on key up:
document.onkeyup = function(event){
  // check console inspector to find keyCode
  console.log(event.keyCode);
  let i = 0;
  // on key up:
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
    if(hoopY > -70){
    hoopY -= 8};
    break;
    case hoopDown:
    if(hoopY < 480){
    hoopY += 8};
    break;
  } 
  // once the basketball disappears from the canvas, 
  // enter new balls randomly:
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
}




function drawEverything(){
  // ctx.drawImage(whichImg, imgX, imgY, width, height)
  ctx.drawImage(basketballImg, basketballX, basketballY, 33, 33);
  ctx.drawImage(hoopImg, hoopX, hoopY, 150, 190);
  if(swishCollision(hoopX, hoopY, basketballX, basketballY, 100, 60)){
    // console.log("SCORE!"); to test if it works
    highScore+=2;
    basketballX = -33;
  } if(swishCollision(hoopX, hoopY, basketballX, basketballY, 170, -10)){
    basketballX = -33;
  }
}




// scoring a swish. This is a true or false function
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
  ctx.font = "bold 30px Roboto Condensed";
  ctx.fillStyle = "rgb(230, 67, 135)";
  ctx.fillText("GAME OVER", 510, 130);
  ctx.drawImage(sadbronImg, 350, 130, 300, 400);
  }, 300)
}




// JUMP BALL! BUTTON (Start Game)
// ------------------------------

// call drawingLoop(); to activate/start looping!
// call shotClockTimer(); to begin count down!
function startGame(){
  drawingLoop();
  shotClockTimer();
}
let button = document.getElementById("button");
button.onclick = startGame;

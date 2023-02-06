let mapWidth = document.querySelector("#inputRows");
let mapHigth = document.querySelector("#inputCols");
let gameWindow = document.querySelector("#gameWindow");
let playGameButton = document.querySelector("#playGame");

let gameMap;
let timerId;
////////////////////////

let aTrap = new Audio("../assests/sound/trap.wav");
///////////

function RandomRange(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}

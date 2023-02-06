let mapWidth = document.querySelector("#inputRows");
let mapHigth = document.querySelector("#inputCols");
let gameWindow = document.querySelector("#gameWindow");
let playGameButton = document.querySelector("#playGame");
let audioSpan = document.querySelector("#audio");

let gameMap;
let timerId;
////////////////////////

const mainMusic = new Audio("./Data/assests/music/CHIPTUNE_The_Bards_Tale.mp3");
const loopMusic = new Audio("./Data/assests/music/The Crypt Loop.wav");

const aTrap = new Audio("./Data/assests/sound/trap.wav");
const aHit = new Audio("./Data/assests/sound/hit.wav");
const aSpawn = new Audio("./Data/assests/sound/spawn.wav");
const aStep = new Audio("./Data/assests/sound/step.wav");
const aDie = new Audio("./Data/assests/sound/die.wav");

///////////

function RandomRange(a, b) {
  return Math.floor(Math.random() * (b - a + 1) + a);
}

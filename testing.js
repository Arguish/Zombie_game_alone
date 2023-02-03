console.log("JS ONLINE");

let mapWith = document.querySelector("#inputRows").valueAsNumber;
let mapHigth = document.querySelector("#inputCols").valueAsNumber;
let gameWindow = document.querySelector("#gameWindow");

let terrain = ["", "wall"];
let map = [];

console.log(mapWith);
console.log(mapHigth);
console.log(gameWindow);

function mapGenerator() {
  let b = [];
  for (let i = 0; i < mapWith; i++) {
    b = [];
    for (let j = 0; j < mapHigth; j++) {
      b.push([terrain[Math.round(Math.random())]]);
    }
    map.push(b);
  }
}

mapGenerator();
console.log(map);
console.log(map[5][7]);

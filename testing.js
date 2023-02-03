console.log("JS ONLINE");

let mapWidth = document.querySelector("#inputRows").valueAsNumber || 10;
let mapHigth = document.querySelector("#inputCols").valueAsNumber || 10;
let gameWindow = document.querySelector("#gameWindow");

let terrain = ["", "wall"];

console.log(mapWidth);
console.log(mapHigth);
console.log(gameWindow);

function mapGenerator(width, height) {
  let matrix = [];
  let table = document.createElement("table");
  table.setAttribute("id", "gameTable");
  gameWindow.appendChild(table);
  let tempTr;
  let tempTd;
  for (let i = 0; i < width; i++) {
    tempTr = document.createElement("tr");
    tempTr.setAttribute("id", `row${i}`);
    for (let j = 0; j < height; j++) {
      tempTd = document.createElement("td");
      tempTd.setAttribute("id", `col${j}`);
      tempTr.appendChild(tempTd);
      matrix.push(new Cell(j, i, tempTd));
    }
    table.appendChild(tempTr);
  }
  return matrix;
}

function putWall(array, width, height) {
  array.map((a) => {
    if (a.x === 0 || a.y === 0) {
      a.ref.classList.add("wall");
    }
    if (a.x === width - 1 || a.y === height - 1) {
      a.ref.classList.add("wall");
    }
  });
}

function updateMap(array) {
  array.map((a) => {
    a.ref.setAttribute("class", a.inside[0]);
  });
}

function Cell(x, y, ref) {
  this.x = x;
  this.y = y;
  this.ref = ref;
  this.inside = ["soldier"];
}

Cell.prototype.add = function (entity) {
  this.inside.push(entity);
};
Cell.prototype.remove = function (id) {
  this.inside.splice(
    this.inside.findIndex((e) => {
      e.id === id;
    }),
    1
  );
};

let gameMap = mapGenerator(mapWidth, mapHigth);
console.log(gameMap);
//console.log(map[5][7]);
putWall(gameMap, mapWidth, mapHigth);

function mapConstructor(array) {}

console.log(
  Date().slice(0, 24).replaceAll(":", "").replaceAll(" ", "") +
    Math.random().toString().replace(".", "")
);

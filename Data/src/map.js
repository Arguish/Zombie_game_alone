function Map(width = 10, height = 10) {
  this.width = width;
  this.height = height;
  this.gameOn = false;
  this.entities = [];
  this.matrix = [];
}

Map.prototype.uniqueId = function () {
  return (
    Date().slice(0, 24).replaceAll(":", "").replaceAll(" ", "") +
    Math.random().toString().replace(".", "")
  );
};

Map.prototype.mapGenerator = function () {
  let table = document.createElement("table");
  table.setAttribute("id", "gameTable");
  gameWindow.appendChild(table);
  let tempTr;
  let tempTd;
  for (let i = 0; i < this.width; i++) {
    tempTr = document.createElement("tr");
    tempTr.setAttribute("id", `row${i}`);
    for (let j = 0; j < this.height; j++) {
      tempTd = document.createElement("td");
      tempTd.setAttribute("id", `col${j}`);
      tempTr.appendChild(tempTd);
      this.matrix.push(new Cell(j, i, tempTd));
    }
    table.appendChild(tempTr);
  }
};

Map.prototype.clean = function (x, y) {
  this.getCell(x, y).inside.pop();
};

Map.prototype.putWall = function () {
  this.matrix.map((a) => {
    if (a.x === 0 || a.y === 0) {
      this.entities.push(new Wall(a.x, a.y, "wall", this.uniqueId()));
    }
    if (a.x === this.width - 1 || a.y === this.height - 1) {
      this.entities.push(new Wall(a.x, a.y, "wall", this.uniqueId()));
    }
  });
};

Map.prototype.getCell = function (x, y) {
  let a;
  for (let i = 0; i < this.matrix.length; i++) {
    if (this.matrix[i].x === x && this.matrix[i].y === y) {
      a = this.matrix[i];
    }
  }
  return a;
};

Map.prototype.newPlayer = function (x, y) {
  this.entities.push(new Soldier(x, y, "soldier", this.uniqueId()));
};

Map.prototype.getPlayer = function () {
  return this.entities.find((a) => a.type === "soldier");
};

Map.prototype.newEnemy = function (x, y) {
  this.entities.push(new Zombie(x, y, "zombie", this.uniqueId()));
};

Map.prototype.moveAllEnemies = function () {
  this.entities.map((a) => {
    if (a.type === "zombie") {
      a.move();
    }
  });
};

Map.prototype.updateMap = function () {
  this.matrix.map((a) => {
    a.ref.setAttribute("class", "");
    a.inside = [""];
  });
  this.entities.map((a) => {
    this.getCell(a.x, a.y).ref.setAttribute("class", a.type);
    this.getCell(a.x, a.y).inside.pop();
    this.getCell(a.x, a.y).add(a);
  });
};

Map.prototype.loop = function (a) {
  this.overlap();
  this.updateMap();
  this.getPlayer().move(a);
  this.moveAllEnemies();
  this.updateMap();
  //this.overlap();
};

Map.prototype.overlap = function () {
  for (let i = 0; i < this.entities.length; i++) {
    for (let j = 0; j < this.entities.length; j++) {
      if (this.entities[i].id !== this.entities[j].id) {
        if (
          this.entities[i].x === this.entities[j].x &&
          this.entities[i].y === this.entities[j].y
        ) {
          if (
            this.entities[i].type === "wall" &&
            this.entities[j].type === "wall"
          ) {
            this.entities.splice(j, 1);
          }
          if (
            this.entities[i].type === "zombie" &&
            this.entities[j].type === "soldier"
          ) {
            //window.alert("GAME OVER");
            location.reload();
          }
        }
      }
    }
  }
};

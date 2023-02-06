function Map(width = 10, height = 10) {
  this.width = width;
  this.height = height;
  this.gameOn = false;
  this.entities = [];
  this.matrix = [];
  this.bloodMoon = 0;
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

Map.prototype.shoot = function (keyInput, shootSword = false) {
  let spawnPoint = { x: 0, y: 0 };
  let direction = { x: 0, y: 0 };
  if (keyInput === "ArrowUp") {
    direction = { x: 0, y: -1 };
    spawnPoint.x = this.getPlayer().x;
    spawnPoint.y = this.getPlayer().y - 1;
  } else if (keyInput === "ArrowLeft") {
    direction = { x: -1, y: 0 };
    spawnPoint.x = this.getPlayer().x - 1;
    spawnPoint.y = this.getPlayer().y;
  } else if (keyInput === "ArrowDown") {
    direction = { x: 0, y: 1 };
    spawnPoint.x = this.getPlayer().x;
    spawnPoint.y = this.getPlayer().y + 1;
  } else if (keyInput === "ArrowRight") {
    direction = { x: 1, y: 0 };
    spawnPoint.x = this.getPlayer().x + 1;
    spawnPoint.y = this.getPlayer().y;
  }
  if (shootSword) {
    this.entities.push(
      new Sword(
        spawnPoint.x,
        spawnPoint.y,
        "sword",
        this.uniqueId(),
        direction.x,
        direction.y
      )
    );
  }
};

Map.prototype.moveProyectiles = function (shooting) {
  if (!shooting) {
    this.entities.map((a) => {
      if (a.type === "sword") {
        a.move();
      }
    });
  }
};

Map.prototype.landTrap = function (x, y) {
  this.entities.push(new Trap(x, y, "trap", this.uniqueId()));
};

Map.prototype.spawnGrave = function (num) {
  for (let index = 0; index < num; index++) {
    this.entities.push(
      new Spawn(
        RandomRange(1, 19),
        RandomRange(1, 19),
        "spawn",
        this.uniqueId()
      )
    );
  }
};

Map.prototype.spawnEnemy = function () {
  if (this.bloodMoon <= 0) {
    this.entities.map((a) => {
      if (a.type === "spawn") {
        this.newEnemy(a.x, a.y);
      }
    });
    this.bloodMoon = 20;
  } else {
    this.bloodMoon--;
  }
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

Map.prototype.searchAndDestroy = function (id) {
  let num = this.entities.findIndex((a) => a.id === id);
  this.entities.splice(num, 1);
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
            this.searchAndDestroy(this.entities[j].id);
          }
          if (
            this.entities[i].type === "zombie" &&
            this.entities[j].type === "soldier"
          ) {
            //window.alert("GAME OVER");
            location.reload();
          }
          if (
            this.entities[i].type === "sword" &&
            this.entities[j].type === "zombie"
          ) {
            this.searchAndDestroy(this.entities[j].id);
          }
          if (
            this.entities[i].type === "wall" &&
            this.entities[j].type === "sword"
          ) {
            this.searchAndDestroy(this.entities[j].id);
          }
          if (
            this.entities[i].type === "sword" &&
            this.entities[j].type === "sword"
          ) {
            this.landTrap(this.entities[i].x, this.entities[i].y);
            let tempI = this.entities[i].id;
            let tempJ = this.entities[j].id;
            this.searchAndDestroy(tempI);
            this.searchAndDestroy(tempJ);
            aTrap.play();
          }
          if (
            this.entities[i].type === "trap" &&
            this.entities[j].type === "zombie"
          ) {
            let tempI = this.entities[i].id;
            let tempJ = this.entities[j].id;
            this.searchAndDestroy(tempI);
            this.searchAndDestroy(tempJ);
          }
        }
      }
    }
  }
};

Map.prototype.loop = function (a, b) {
  this.overlap();
  this.updateMap();
  this.shoot(a, b);
  this.moveProyectiles(b);
  this.getPlayer().move(a);
  this.spawnEnemy();
  this.moveAllEnemies();
  this.updateMap();
  //this.overlap();
};

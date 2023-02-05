let mapWidth = document.querySelector("#inputRows").valueAsNumber || 10;
let mapHigth = document.querySelector("#inputCols").valueAsNumber || 10;
let gameWindow = document.querySelector("#gameWindow");
let playGameButton = document.querySelector("#playGame");

let gameMap;
////////////////////////

function Map(width, height) {
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

///////
//GESTION DE CELDA
//////
function Cell(x, y, ref) {
  this.x = x;
  this.y = y;
  this.ref = ref;
  this.inside = [];
}

Cell.prototype.add = function (entity) {
  this.inside.push(entity);
};
Cell.prototype.remove = function (id) {
  this.inside.splice(
    this.inside.findIndex((e) => {
      e.id === id;
    })
  );
};

//////////////////
//OBJETO personaje
///////////////////

function Pawn(x, y, type, id) {
  this.x = x;
  this.y = y;
  this.type = type;
  this.id = id;
  this.canMove = {
    up: true,
    left: true,
    rigth: true,
    down: true,
  };
  this.seeAround = {
    up: "",
    left: "",
    rigth: "",
    down: "",
  };
  this.blockedTerrain = [];
  this.target = [];
}

Pawn.prototype.hide = function () {
  gameMap.getCell(this.x, this.y).remove(this.id);
};

Pawn.prototype.move = function () {
  //console.log("Empty function, define by children");
};

Pawn.prototype.whatAround = function () {
  this.seeAround.up = gameMap.getCell(this.x, this.y - 1).inside[0];
  this.seeAround.left = gameMap.getCell(this.x - 1, this.y).inside[0];
  this.seeAround.down = gameMap.getCell(this.x, this.y + 1).inside[0];
  this.seeAround.rigth = gameMap.getCell(this.x + 1, this.y).inside[0];
};

Pawn.prototype.canGo = function () {
  this.whatAround();
  this.canMove.up = true;
  this.canMove.left = true;
  this.canMove.down = true;
  this.canMove.rigth = true;
  for (let index = 0; index < this.blockedTerrain.length; index++) {
    if (this.seeAround.up.type === this.blockedTerrain[index]) {
      this.canMove.up = false;
    }
    if (this.seeAround.left.type === this.blockedTerrain[index]) {
      this.canMove.left = false;
    }
    if (this.seeAround.down.type === this.blockedTerrain[index]) {
      this.canMove.down = false;
    }
    if (this.seeAround.rigth.type === this.blockedTerrain[index]) {
      this.canMove.rigth = false;
    }
  }
};

// Soldado
function Soldier(x, y, type, id) {
  Pawn.call(this, x, y, type, id);
  this.blockedTerrain = ["wall", "zombie"];
}
Soldier.prototype = Object.create(Pawn.prototype);
Soldier.prototype.constructor = Soldier;

Soldier.prototype.move = function (keyInput) {
  this.whatAround();
  this.canGo();
  if (keyInput === "a" && this.canMove.left) {
    this.x--;
  } else if (keyInput === "d" && this.canMove.rigth) {
    this.x++;
  } else if (keyInput === "w" && this.canMove.up) {
    this.y--;
  } else if (keyInput === "s" && this.canMove.down) {
    this.y++;
  }
};

// ZOMBIE
function Zombie(x, y, type, id) {
  Pawn.call(this, x, y, type, id);
  this.go = true;
  this.blockedTerrain = ["zombie", "wall"];
  this.target = ["soldier"];
}

Zombie.prototype = Object.create(Pawn.prototype);
Zombie.prototype.constructor = Zombie;

Zombie.prototype.move = function () {
  this.whatAround();
  this.canGo();

  if (this.go) {
    let a =
      Math.abs(this.x - gameMap.getPlayer().x) <=
      Math.abs(this.y - gameMap.getPlayer().y);
    if (!a && this.x > gameMap.getPlayer().x && this.canMove.left) {
      this.x--;
    } else if (!a && this.x < gameMap.getPlayer().x && this.canMove.rigth) {
      this.x++;
    } else if (a && this.y > gameMap.getPlayer().y && this.canMove.up) {
      this.y--;
    } else if (a && this.y < gameMap.getPlayer().y && this.canMove.down) {
      this.y++;
    }
    this.go = false;
  } else {
    this.go = true;
  }
};

function Wall(x, y, type, id) {
  Pawn.call(this, x, y, type, id);
  this.type = "wall";
}

gameMap = new Map(mapWidth, mapHigth);
gameMap.mapGenerator();
gameMap.putWall();
gameMap.newPlayer(1, 1);
gameMap.newEnemy(4, 4);
gameMap.updateMap();

let timerId = setInterval((e) => {
  gameMap.updateMap();
}, 333);

window.addEventListener("keydown", (e) => {
  console.log(e.key);
  if ((e.key === "w") | (e.key === "a") | (e.key === "s") | (e.key === "d")) {
    gameMap.loop(e.key);
  }
  if (
    (e.key === "ArrowUp") |
    (e.key === "ArrowLeft") |
    (e.key === "ArrowDown") |
    (e.key === "ArrowRight")
  ) {
    gameMap.loop(e.key);
  }
});

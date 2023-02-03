//VARIABLES

//FUNCIONES SALVAJES
function getCell(col, row) {
  return document.querySelector(`#row${row}>#col${col}`);
} // INPUT: (x,y) OUTPUT: (Referencia a celda)

function getCellClass(x, y) {
  let a = getCell(x, y);
  return a.getAttribute("class");
}

///////////////////

function Game() {
  this.entities = [];
  this.loop = [];
  this.gameOn = false;
}

Game.prototype.uniqueId = function () {
  return (
    Date().slice(0, 24).replaceAll(":", "").replaceAll(" ", "") +
    Math.random().toString().replace(".", "")
  );
};

Game.prototype.startGame = function () {
  this.addPlayer();
  this.addEnemy(3);
  this.entities.map((a) => a.show());
  this.gameOn = true;
};

Game.prototype.stopLoop = function () {
  this.gameOn = false;
};

Game.prototype.runLoop = function (keyInput) {
  if (this.gameOn) {
    if (this.entities.length > 0) this.entities.map((b) => b.move(keyInput));
  }
};

Game.prototype.addPlayer = function () {
  if (!this.entities.includes(this.getPlayer())) {
    this.entities.push(new Soldier(2, 2, "soldier", this.uniqueId()));
  }
};

Game.prototype.getPlayer = function () {
  return this.entities.filter((a) => a.type === "soldier")[0];
};

Game.prototype.addEnemy = function (num) {
  for (let index = 0; index < num; index++) {
    this.entities.push(new Zombie(4 + index, 8, "zombie", this.uniqueId()));
  }
};

Game.prototype.overlap = function () {
  let mapMatrix = [];
  let b = [];
  for (let i = 1; i < gameMap.x; i++) {
    b = [];
    for (let j = 1; j < gameMap.y; j++) {
      b.push([getCellClass(i, j)]);
    }
    mapMatrix.push(b);
  }
  console.log(mapMatrix);
  return mapMatrix;
};

//////////////////

//OBJETO

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

Pawn.prototype.show = function () {
  this.canGo();
  getCell(this.x, this.y).classList.add(this.type);
  this.whatAround();
};

Pawn.prototype.hide = function () {
  this.canGo();
  getCell(this.x, this.y).classList.remove(this.type);
  this.whatAround();
};

Pawn.prototype.move = function () {
  this.hide();
  //console.log("Empty function, define by children");
  this.show();
};

Pawn.prototype.whatAround = function () {
  this.seeAround.up = getCellClass(this.x, this.y - 1);
  this.seeAround.left = getCellClass(this.x - 1, this.y);
  this.seeAround.down = getCellClass(this.x, this.y + 1);
  this.seeAround.rigth = getCellClass(this.x + 1, this.y);
};

Pawn.prototype.canGo = function () {
  this.canMove.up = true;
  this.canMove.left = true;
  this.canMove.down = true;
  this.canMove.rigth = true;
  for (let index = 0; index < this.blockedTerrain.length; index++) {
    if (this.seeAround.up === this.blockedTerrain[index]) {
      this.canMove.up = false;
    }
    if (this.seeAround.left === this.blockedTerrain[index]) {
      this.canMove.left = false;
    }
    if (this.seeAround.down === this.blockedTerrain[index]) {
      this.canMove.down = false;
    }
    if (this.seeAround.rigth === this.blockedTerrain[index]) {
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
  this.hide();
  if (keyInput === "a" && this.canMove.left) {
    this.x--;
  } else if (keyInput === "d" && this.canMove.rigth) {
    this.x++;
  } else if (keyInput === "w" && this.canMove.up) {
    this.y--;
  } else if (keyInput === "s" && this.canMove.down) {
    this.y++;
  }
  this.show();
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
  this.hide();

  if (this.go) {
    let a =
      Math.abs(this.x - newGame.getPlayer().x) <=
      Math.abs(this.y - newGame.getPlayer().y);
    if (!a && this.x > newGame.getPlayer().x && this.canMove.left) {
      this.x--;
    } else if (!a && this.x < newGame.getPlayer().x && this.canMove.rigth) {
      this.x++;
    } else if (a && this.y > newGame.getPlayer().y && this.canMove.up) {
      this.y--;
    } else if (a && this.y < newGame.getPlayer().y && this.canMove.down) {
      this.y++;
    }
    this.go = false;
  } else {
    this.go = true;
  }
  this.show();
};

//LLAMADAS

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

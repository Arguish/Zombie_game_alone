// Drunked
function Vagabond(x, y, type, id) {
  Pawn.call(this, x, y, type, id);
  this.blockedTerrain = ["hunter", "vagabond", "wall"];
  this.target = ["soldier"];
}

Vagabond.prototype = Object.create(Pawn.prototype);
Vagabond.prototype.constructor = Vagabond;

Vagabond.prototype.move = function () {
  this.whatAround();
  this.canGo();

  if (this.go) {
    let a = RandomRange(1, 4);
    if (a === 1 && this.canMove.left) {
      this.x--;
    } else if (a === 2 && this.canMove.rigth) {
      this.x++;
    } else if (a === 3 && this.canMove.up) {
      this.y--;
    } else if (a === 4 && this.canMove.down) {
      this.y++;
    }
    this.go = false;
  } else {
    this.go = true;
  }
};

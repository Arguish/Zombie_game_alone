console.log("Sword ¿art? ONLINE");

function Sword(x, y, type, id, dx, dy) {
  Pawn.call(this, x, y, type, id);
  this.blockedTerrain = [""];
  this.direccion = { x: dx, y: dy };
}

Sword.prototype = Object.create(Pawn.prototype);
Sword.prototype.constructor = Sword;

Sword.prototype.move = function () {
  this.x += this.direccion.x;
  this.y += this.direccion.y;
};

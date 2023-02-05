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

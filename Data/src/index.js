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

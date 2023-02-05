playGameButton.addEventListener("click", gameStart);

function gameStart() {
  gameMap = new Map(mapWidth.valueAsNumber, mapHigth.valueAsNumber);
  gameMap.mapGenerator();
  gameMap.putWall();
  gameMap.newPlayer(1, 1);
  gameMap.newEnemy(4, 4);
  gameMap.updateMap();
  timerId = setInterval((e) => {
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
}

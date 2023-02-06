playGameButton.addEventListener("click", gameStart);
mainMusic.play();

function gameStart() {
  mainMusic.pause();
  loopMusic.play();
  gameMap = new Map(20, 20);
  gameMap.mapGenerator();
  gameMap.putWall();
  gameMap.newPlayer(1, 1);
  gameMap.spawnGrave(1);
  gameMap.updateMap();
  timerId = setInterval((e) => {
    gameMap.updateMap();
  }, 333);
  window.addEventListener("keydown", (e) => {
    console.log(e.key);
    if ((e.key === "w") | (e.key === "a") | (e.key === "s") | (e.key === "d")) {
      gameMap.loop(e.key, false);
    }
    if (
      (e.key === "ArrowUp") |
      (e.key === "ArrowLeft") |
      (e.key === "ArrowDown") |
      (e.key === "ArrowRight")
    ) {
      gameMap.loop(e.key, true);
    }
  });
}

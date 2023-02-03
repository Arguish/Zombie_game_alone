function calculateX() {
  let x = parseInt(document.querySelector("#cols").value);
  if (!x || x < 10) {
    x = 10;
  } else if (x > 30) {
    x = 30;
  } else {
    x = x;
  }
  return x;
}

function calculateY() {
  let y = parseInt(document.querySelector("#rows").value);
  if (!y || y < 10) {
    y = 10;
  } else if (y > 20) {
    y = 20;
  } else {
    y = y;
  }
  return y;
}

let map = {
  x: calculateX(),
  y: calculateY(),
  createMap: function () {
    x = calculateX();
    y = calculateY();
    const parent = document.getElementsByTagName("body")[0];
    let table = document.createElement("table");
    // INICIO
    let row = document.createElement("tr");
    row.setAttribute("id", `row1`);
    for (let b = 1; b <= this.x; b++)
      row.innerHTML += `<td class="wall" id="col${b}"></td>`;
    table.appendChild(row);
    // MEDIO
    for (let a = 2; a < this.y; a++) {
      row = document.createElement("tr");
      row.setAttribute("id", `row${a}`);
      // FIRST
      row.innerHTML += `<td class="wall" id="col1"></td>`;
      for (let b = 2; b < this.x; b++)
        row.innerHTML += `<td class="" id="col${b}"></td>`;
      // LAST
      row.innerHTML += `<td class="wall" id="col${this.x}"></td>`;
      table.appendChild(row);
    }
    // FINAL
    row = document.createElement("tr");
    row.setAttribute("id", `row${this.y}`);
    for (let b = 1; b <= this.x; b++)
      row.innerHTML += `<td class="wall" id="col${b}"></td>`;
    table.appendChild(row);
    parent.appendChild(table);
  },
};

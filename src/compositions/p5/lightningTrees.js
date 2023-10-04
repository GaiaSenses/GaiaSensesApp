// inspired by: https://openprocessing.org/sketch/1203202

const { lightning } = window.App;
const lightningCount = lightning?.count;

let colors = ['#793FDF', '#5800FF', '#2FA4FF', '#72FFFF'];

let r;
let w;
let k = 30;
let grid = [];
let active = [];
let nCols, nRows;

function setup() {

  if (lightningCount == 0 ) {
    r = 25;
    speed = 1;
  } else if (lightningCount >= 50) {
    r = 5;
    speed = 50;
  } else {
    r = round(lightningCount / 5 + 5);
    speed = lightningCount;
  }
  createCanvas(windowWidth, windowHeight);
  background('#000000');
  strokeWeight(r * 0.2);
  strokeCap(ROUND);
  w = r / sqrt(2);

  nCols = round(windowWidth / w);
  nRows = round(windowHeight / w);
  for (let i = 0; i < nRows; i++) {
    let newRow = [];
    for (let j = 0; j < nCols; j++) {
      newRow.push(undefined);
    }
    grid.push(newRow);
  }

  let nColors = colors.length;
  for (let n = 0; n < nColors; n++) {
    let p = createVector(random(width), random(height));
    let j = round(p.x / w);
    let i = round(p.y / w);
    let pos = createVector(p.x, p.y);
    grid[i][j] = pos;
    active.push({
      pos: pos,
      color: colors[n],
    });
  }
}

function draw() {
  for (var total = 0; total < speed; total++) {
    if (active.length > 0) {
      let randIndex = floor(random(active.length));
      let pos = active[randIndex].pos;
      let color = active[randIndex].color;
      let found = false;
      for (var n = 0; n < k; n++) {
        let sample = p5.Vector.random2D();
        let m = random(r, 2 * r);
        sample.setMag(m);
        sample.add(pos);

        let col = round(sample.x / w);
        let row = round(sample.y / w);

        if (
          col > -1 &&
          row > -1 &&
          col < nCols &&
          row < nRows &&
          !grid[col + row * nCols]
        ) {
          var ok = true;
          for (var i = max(row - 1, 0); i <= min(row + 1, nRows - 1); i++) {
            for (var j = max(col - 1, 0); j <= min(col + 1, nRows - 1); j++) {
              let neighbor = grid[i][j];
              if (neighbor) {
                let d = p5.Vector.dist(sample, neighbor);
                if (d < r) {
                  ok = false;
                }
              }
            }
          }
          if (ok) {
            found = true;
            grid[row][col] = sample;
            active.push({
              pos: sample,
              color: color,
            });
            stroke(color);
            line(sample.x, sample.y, pos.x, pos.y);
            break;
          }
        }
      }

      if (!found) {
        active.splice(randIndex, 1);
      }
    }
  }
}

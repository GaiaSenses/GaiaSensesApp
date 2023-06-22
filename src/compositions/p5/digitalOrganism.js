// inspired by: https://openprocessing.org/sketch/1864228

const DEAD = 0;
const ALIVE = 1;
const n = 500;
let cells;
let zoom;
let g;
let brushSize;

const { weather} = window.App;
const rain = weather.rain['1h'] || 0;

brushSize = ((rain + 3) * 3);

const condition = {
  0: (status, hood0, hood1) => {
    return status ? hood0 != hood1 : hood0 * 2.6 > hood1;
  },
};

function setup() {
	p5.disableFriendlyErrors = true;
  const m = min(windowWidth, windowHeight);
  createCanvas(windowWidth, windowHeight);
  zoom = n / m;

  cells = new Uint8Array(n * n).fill(DEAD);
  g = createGraphics(n, n);
  g.background(0).pixelDensity(1).loadPixels();
}

function draw() {
  frameRate(30);
  background("white");

  const mx = int(constrain(Math.floor(Math.random() * windowWidth) * zoom, 0, n - 1));
  const my = int(constrain(Math.floor(Math.random() * windowHeight) * zoom, 0, n - 1));

	let b = brushSize;
  for (dy = -b; dy <= b; dy++) {
    for (dx = -b; dx <= b; dx++) {
      let d = sqrt(dx ** 2 + dy ** 2);
      if (d > b) continue;
      let x = mx + dx;
      let y = my + dy;
      if (x < 0 || x >= n || y < 0 || y >= n) continue;
      cells[x + y * n] = random(5000) < 1 && b - d < 1 ? ALIVE : DEAD;
    }
  }

  const getNextState = condition[0];
  let next = new Uint8Array(cells);
  for (let y = 4; y < n - 4; y++) {
    for (let x = 4; x < n - 4; x++) {
      const i = x + y * n;

      const hood0 =
        cells[i + 1] +
        cells[i - 1] +
        cells[i - n] +
        cells[i + n] +
        cells[i - 1 - n] +
        cells[i - 1 + n] +
        cells[i + 1 - n] +
        cells[i + 1 + n] +
        cells[i + 2] +
        cells[i + 2 + n] +
        cells[i + 2 - n] +
        cells[i - 2] +
        cells[i - 2 + n] +
        cells[i - 2 - n] +
        cells[i + 2 * n] +
        cells[i + 2 * n - 1] +
        cells[i + 2 * n + 1] +
        cells[i - 2 * n] +
        cells[i - 2 * n + 1] +
        cells[i - 2 * n - 1];

      const hood1 =
        cells[i + 1] +
        cells[i + 2] +
        cells[i + 3] +
        cells[i + 4] +
        cells[i - 1] +
        cells[i - 2] +
        cells[i - 3] +
        cells[i - 4] +
        cells[i - n] +
        cells[i - 2 * n] +
        cells[i - 3 * n] +
        cells[i - 4 * n] +
        cells[i + n] +
        cells[i + 2 * n] +
        cells[i + 3 * n] +
        cells[i + 4 * n] +
        cells[i - n + 1] +
        cells[i - n + 2] +
        cells[i - n + 3] +
        cells[i - n + 4] +
        cells[i - 2 * n + 1] +
        cells[i - 2 * n + 2] +
        cells[i - 2 * n + 3] +
        cells[i - 3 * n + 1] +
        cells[i - 3 * n + 2] +
        cells[i - 4 * n + 1] +
        cells[i + n + 1] +
        cells[i + n + 2] +
        cells[i + n + 3] +
        cells[i + n + 4] +
        cells[i + 2 * n + 1] +
        cells[i + 2 * n + 2] +
        cells[i + 2 * n + 3] +
        cells[i + 3 * n + 1] +
        cells[i + 3 * n + 2] +
        cells[i + 4 * n + 1] +
        cells[i - n - 1] +
        cells[i - n - 2] +
        cells[i - n - 3] +
        cells[i - n - 4] +
        cells[i - 2 * n - 1] +
        cells[i - 2 * n - 2] +
        cells[i - 2 * n - 3] +
        cells[i - 3 * n - 1] +
        cells[i - 3 * n - 2] +
        cells[i - 4 * n - 1] +
        cells[i + n - 1] +
        cells[i + n - 2] +
        cells[i + n - 3] +
        cells[i + n - 4] +
        cells[i + 2 * n - 1] +
        cells[i + 2 * n - 2] +
        cells[i + 2 * n - 3] +
        cells[i + 3 * n - 1] +
        cells[i + 3 * n - 2] +
        cells[i + 4 * n - 1];

      state = getNextState(cells[i], hood0, hood1);
      next[i] = state;
      g.pixels[i * 4 + 3] = state ? 255 : 0;
    }
  }
  cells = next;
  g.updatePixels();
  image(g, 0, 0, width, height);
}
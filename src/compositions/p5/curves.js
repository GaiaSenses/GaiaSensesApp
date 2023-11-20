// inspired by: https://openprocessing.org/sketch/1176431

const FPS_MIN = 5;
const FPS_MAX = 30;

const CRITICAL_RAIN = 10;
const CRITICAL_TEMP = 35;

const [width, height] = [innerWidth, innerHeight];
const { weather } = window.App;

const rainMili = weather?.rain['1h'] || 0;
const temperature = weather?.main.temp || 20;

function setup() {
  createCanvas(width, height);

  const fps = map(rainMili, 0, CRITICAL_RAIN, FPS_MIN, FPS_MAX);
  frameRate(fps);

  background(0);
}

function draw() {
  const red = map(temperature, 0, CRITICAL_TEMP, 50, 255);
  const blue = map(temperature, 0, CRITICAL_TEMP, 255, 50);

  noFill();
  stroke(random(10, red), 10, random(10, blue));

  bezier(
    random(width),
    0,
    random(width),
    random(width),
    random(width),
    random(width),
    random(width),
    height,
  );
}

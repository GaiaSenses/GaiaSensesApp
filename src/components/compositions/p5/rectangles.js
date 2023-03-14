// inspired by: https://openprocessing.org/sketch/1274144

const RECT_MAX_WIDTH = 15;
const RECT_MIN_WIDTH = 5;

const RECT_MAX_HEIGHT = 200;
const RECT_MIN_HEIGHT = 15;

const FPS_MIN = 1;
const FPS_MAX = 60;

const CRITICAL_RAIN_MM = 10;

const [width, height] = [innerWidth, innerHeight];
let rainMili = 0;
let rectWidth = normalize(rainMili, RECT_MIN_WIDTH, RECT_MAX_WIDTH);
let rectHeight = normalize(rainMili, RECT_MIN_HEIGHT, RECT_MAX_HEIGHT);

function normalize(x, min = 0, max = 1) {
  x = Math.min(x, CRITICAL_RAIN_MM);
  x = Math.max(x, 0);
  return ((max - min) / CRITICAL_RAIN_MM) * x + min;
}

function setup() {
  createCanvas(width, height);

  let fps = map(rainMili, 0, CRITICAL_RAIN_MM, FPS_MIN, FPS_MAX);
  frameRate(fps);
  background(0);
}

function draw() {
  noStroke();
  fill(0, 0, random(30, 255));
  rect(random(width), random(height), random(rectWidth), random(rectHeight));

  fill(0, 0, 0);
  rect(random(width), random(height), random(100), random(40));
}

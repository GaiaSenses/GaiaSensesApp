// inspired by: https://openprocessing.org/sketch/1274144

const RECT_MAX_WIDTH = 15;
const RECT_MIN_WIDTH = 5;

const RECT_MAX_HEIGHT = 200;
const RECT_MIN_HEIGHT = 15;

const FPS_MIN = 1;
const FPS_MAX = 60;

const CRITICAL_RAIN = 10;

const [w, h] = [innerWidth, innerHeight];
const { weather } = window.App;

const rain = weather.rain['1h'] || 0;
let rectWidth = 0;
let rectHeight = 0;
let fps = 0;

function setup() {
  createCanvas(w, h);

  rectWidth = map(rain, 0, CRITICAL_RAIN, RECT_MIN_WIDTH, RECT_MAX_WIDTH);
  rectHeight = map(rain, 0, CRITICAL_RAIN, RECT_MIN_HEIGHT, RECT_MAX_HEIGHT);
  fps = map(rain, 0, CRITICAL_RAIN, FPS_MIN, FPS_MAX);

  frameRate(fps);
  background(0);
}

function draw() {
  noStroke();
  fill(0, 0, random(30, 255));
  rect(random(w), random(h), random(rectWidth), random(rectHeight));

  fill(0, 0, 0);
  rect(random(w), random(h), random(100), random(40));
}

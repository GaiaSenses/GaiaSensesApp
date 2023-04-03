// inspired by: https://openprocessing.org/sketch/386391

const CRITICAL_RAIN = 10;

const ELLIPSE_MIN = 15;
const ELLIPSE_MAX = 250;

const FPS_MIN = 2;
const FPS_MAX = 20;

const [w, h] = [innerWidth, innerHeight];
const { weather } = window.App;

const rain = weather.rain['1h'] || 0;
let ellipseSize = 0;
let fps = 0;

function setup() {
  createCanvas(w, h);

  ellipseSize = map(rain, 0, CRITICAL_RAIN, ELLIPSE_MIN, ELLIPSE_MAX);
  fps = map(rain, 0, CRITICAL_RAIN, FPS_MIN, FPS_MAX);

  background(0);
  frameRate(fps);
}

function draw() {
  fill(random(255), random(255), random(255), random(255));
  noStroke();
  ellipse(random(w), random(h), random(ellipseSize), random(ellipseSize));
}

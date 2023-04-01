// inspired by: https://openprocessing.org/sketch/386391

const [w, h] = [innerWidth, innerHeight];
const { weather } = window.App;

const rain = weather.rain['1h'] || 5;

function setup() {
  createCanvas(w, h);
  background(0);
  frameRate(rain);
}

function draw() {
  fill(random(255), random(255), random(255), random(255));
  noStroke();
  ellipse(random(w), random(h), random(100), random(100));
}

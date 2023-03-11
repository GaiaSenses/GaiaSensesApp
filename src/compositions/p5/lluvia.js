// inspired by: https://openprocessing.org/sketch/386391

const [w, h] = [innerWidth, innerHeight];

function setup() {
  createCanvas(w, h);
  background(0);
  frameRate(5);
}

function draw() {
  fill(random(255), random(255), random(255), random(255));
  noStroke();
  ellipse(random(w), random(h), random(250), random(250));
}

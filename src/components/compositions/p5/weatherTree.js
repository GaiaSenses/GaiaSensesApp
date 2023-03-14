// inspired by: https://openprocessing.org/sketch/1780681

const [width, height] = [innerWidth, innerHeight];
let x = -width / 2;
let y = 50;
let theta = 0;
let dir = true;
let posX = 0;
let treeColor;

function setup() {
  createCanvas(width, height);
  background(0);
  frameRate(20);

  treeColor = color(random(255), random(255), random(255));
}

function branch(h) {
  h *= 0.66;
  if (h > 2) {
    strokeWeight(h / 15 + 0.5);
    push(); // Save the current state of transformation (i.e. where are we now)
    rotate(theta); // Rotate by theta
    line(0, 0, 0, -h); // Draw the branch
    translate(0, -h); // Move to the end of the branch
    branch(h); // Ok, now call myself to draw two new branches!!
    pop(); // Whenever we get back here, we "pop" in order to restore the previous matrix state

    // Repeat the same thing, only branch off to the "left" this time!
    push();
    rotate(-theta);
    line(0, 0, 0, -h);
    translate(0, -h);
    branch(h);
    pop();
  }
}

function draw() {
  if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {
    posX = mouseX;
  }
  background(0);

  stroke(treeColor);
  strokeWeight(width / 70);
  // Let's pick an angle 0 to 90 degrees based on the mouse position
  let a = (posX / width) * 90;
  // Convert it to radians
  theta = radians(a);
  // Start the tree from the bottom of the screen
  translate(width / 2, height);
  // Draw a line 120 pixels
  line(0, 0, 0, -width / 3);
  // Move to the end of that line
  translate(0, -width / 3);
  // Start the recursive branching!
  branch(width / 4);
  fill(treeColor);
  ellipse(x, y, 20, 20);
  if (dir) {
    x += 10;
  } else {
    x -= 10;
  }
  if (x > width / 2) {
    dir = false;
  } else if (x < -width / 2) {
    dir = true;
  }
}

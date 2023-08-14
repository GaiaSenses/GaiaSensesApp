// creator: Pedro Trama

let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  //creates new particles
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle());
  }

  //moves, shrinks and changes particle's colors
  for (let particle of particles) {
    particle.update();
    particle.display();
  }

  //removes particles that are too high
  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor() {
    this.x = random(width);
    this.y = height;
    this.radius = floor(random(10, 30));
    this.red = 255;
    this.green = floor(random(0, 255));
    this.blue = 0;
    this.alpha = random(100, 500);
  }

  update() {
    this.y -= random(1, 3);
    this.radius -= 0.1;
    this.green += 0.5;
  }

  display() {
    fill(this.red, this.green, this.blue, this.alpha);
    noStroke();
    ellipse(this.x, this.y, this.radius, this.radius);
  }

  isFinished() {
    return this.radius <= 0;
  }
}

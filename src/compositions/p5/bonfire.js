// creator: Pedro Trama

const { fire } = window.App;
let wildFireCount = fire.count;

let particles = [];
let nParticles = wildFireCount;
let red;
let green;
let blue;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
	
	//colors and number of particles
	if(wildFireCount == 0){
		nParticles = 3;
		red = 0;
		green = 255
		blue = floor(random(0, 255));
	}
	else if (nParticles >=1 && nParticles <=19){
		red = 255;
		green = floor(random(0, 255));
		blue = 0;
	}
	else if(nParticles >= 20){
		nParticles = 20;
		red = 255;
		green = floor(random(0, 255));
		blue = 0;
	}
  
	//creates new particles
  for (let i = 0; i < nParticles; i++) {
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
    this.red = red;
    this.green = green;
    this.blue = blue;
		this.alpha = random(100,500);
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

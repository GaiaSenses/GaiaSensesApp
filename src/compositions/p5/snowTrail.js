// inspired by: https://openprocessing.org/sketch/1919992

//const { weather } = window.App;
const rain = 10//weather.rain['1h'] || 0;
let temperature = -10//= weather?.main?.temp;

var seed = Math.random() * 1000;
var particles = [];
var mySize;
var parNum;
var color_vision;

function setup() {
	randomSeed(seed);
	mySize = min(windowWidth, windowHeight);
	createCanvas(windowWidth, windowHeight);
	colorMode(RGB, 255, 255, 255, 100);
	background("#000000");
	parNum = 1000;
	for (let i = 0; i < parNum; i++) {
		particles.push(new Particle(random(width),height / 2 - tan(random(1,2) * i + random(50)) * height / 30));
	}
	color_vision = random([1, 2, 3, 4, 5])
}

function draw() {
	blendMode(BLEND);
	for (let i = particles.length - 1; i > 0; i--) {
		if (i < particles.length) {
			if (int(seed) % 2 == 0) {
				particles[i].color_vision = color_vision;
			}
			particles[i].update();
			particles[i].show();
			if (particles[i].alpha2 < 30) {
				particles[i].explode();
			}
			if (particles[i].finished()) {
				particles.splice(i, 1);
				seed = Math.random() * 1000;
				color_vision = random([1, 2, 3, 4, 5])
			}
		}
	}
}

function Particle(x, y) {

	this.x = x;
	this.y = y;
	this.pos = createVector(this.x, this.y);
	this.vel = createVector(0,random(1, 0.5) * random(-1, 1));
	this.acc = createVector(0,random(2.5, 3.5) * random(-0.025, 0.025)/random(3,1));
	this.alpha1 = int(random(100));
	this.alpha2 = 100;
	this.r = random(height / random(800,400)) * random(35, 25);
	this.particles2 = [];
	this.color1 = 0;
	this.color2 = 0;
	this.grad = 0;
	this.offset = 1*random(2.0, 1.0);
	this.color_vision =  random([1,2,3,4,5]);

	this.update = function() {
		if (this.color_vision == 1) {
			this.color2 = color(255, 255, 255, this.alpha2);
			this.color1 = color(0, 0, 0, this.alpha1);
		}
		if (this.color_vision == 2) {
			this.color1 = color(242, 68, 68, this.alpha1);
			this.color2 = color(167, 217, 217, this.alpha2);
		}
		if (this.color_vision == 3) {
			this.color1 = color(102, 121, 107, this.alpha1);
			this.color2 = color(222, 239, 87, this.alpha2);
		}
		if (this.color_vision == 4) {
			this.color1 = color(242, 170, 82, this.alpha1);
			this.color2 = color(0, 169, 104, this.alpha2);
		}
		if (this.color_vision == 5) {
			this.color1 = color(146, 241, 222, this.alpha1);
			this.color2 = color(166, 116, 88, this.alpha2);
		}
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.alpha2 -= random(1);
		this.alpha1 += random(1);
		if (this.r > 1) {
			this.r -= 0.025;
		}
	};

	this.show = function() {
		noStroke();
		fill(0);
		
		this.grad = drawingContext.createRadialGradient(this.pos.x + random(-this.offset, this.offset), this.pos.y + random(-this.offset, this.offset), 0,
			this.pos.x + random(-this.offset, this.offset), this.pos.y + random(-this.offset, this.offset), this.r);
		this.grad.addColorStop(0.15, this.color1);
		this.grad.addColorStop(random(0.85,1), this.color2);
		drawingContext.fillStyle = this.grad;
		rectMode(CENTER);
		rect(this.pos.x, this.pos.y, this.r/random(2,5), 4.5*random(0.1, 0.25));
	};

	this.explode = function() {
		this.particles2.push(new Particle2(this.pos.x, this.pos.y));
		for (let i = this.particles2.length - 1; i > 0; i--) {
			this.particles2[i].r = this.r / 10;
			if (this.r < 15) {
				this.r += 0.05;
			}
			this.particles2[i].color1 = this.color1;
			this.particles2[i].color2 = this.color2;
			this.particles2[i].alpha1 = this.alpha1/20;
			this.particles2[i].alpha2 = this.alpha2/20;
			this.particles2[i].show();
			this.particles2[i].update();

			if (this.particles2[i].finished()) {
				this.particles2.splice(i, 1);
			}
		}
	};

	this.finished = function() {
		return this.alpha2 < 10;
	};
}

function Particle2(x, y) {
	this.x = x;
	this.y = y;
	this.explode = new Particle(this.x, this.y);
	this.pos = createVector(this.x, this.y);
	this.vel = createVector(random(-0.25, 0.25),0);
	this.acc = createVector(-random(-0.025, 0.025), 0);
	this.alpha1 = 0;
	this.alpha2 = 0;
	this.r = 1;
	this.color1 = 0;
	this.color2 = 0;
	this.grad = 0;
	this.offset = 0.5;

	this.update = function() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.alpha1 += random(0.5,1);
		this.alpha2 -= random(1);
		this.r += 0.01;
	}

	this.show = function() {
		noStroke();
		fill(0);
		this.grad = drawingContext.createRadialGradient(this.pos.x + random(-this.offset,this.offset), this.pos.y + random(-this.offset,this.offset), 0, 
																										this.pos.x + random(-this.offset,this.offset), this.pos.y + random(-this.offset,this.offset), this.r);
		this.grad.addColorStop(0.25, this.color1);
		this.grad.addColorStop(0.95, this.color2);
		drawingContext.fillStyle = this.grad;
		rectMode(CENTER);
		rect(this.pos.x, this.pos.y,  random(1), this.r);
	}

	this.finished = function() {
		return this.alpha2 < 2;
	};
}
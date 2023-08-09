// inspired by: https://openprocessing.org/sketch/732455

var img,
		particles = [],
		bg;

function preload(){
	img = loadImage('../assets/chaos-tree.png');
}

function setup(){
	createCanvas(windowWidth, windowHeight);
	  img.resize(windowWidth, windowHeight);

	for (let i = 1; i > 0; i -= 0.0001) {
		const x = random(windowWidth),
					y = random(windowHeight),
					size = 40 * Math.pow(random(i), 2) + 8;
		
		if (!particles.some(p => Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2) < Math.pow(size / 2 + p.size / 2 - 2, 2)))
			particles.push(new Particle(x, y, size));
	}
	
	bg = img.get(0, 0);
	
	noStroke();
}

function draw(){
	image(img, 0, 0);
	
	for (const particle of particles) {
		fill(particle.col);
		const t = 1 - 5e-4 * (Math.pow(particle.pos.x - mouseX, 2) + Math.pow(particle.pos.y - mouseY, 2)),
					p = p5.Vector.mult(particle.pos, 1 - t).add(p5.Vector.mult(particle.tgt, t));
		circle(p.x, p.y, particle.size);
	}
}

class Particle {
	constructor(x, y, size){
		this.pos = new p5.Vector(x, y);
		this.tgt = p5.Vector.random2D().add(this.pos);
		this.size = size;
		this.col = img.get(x, y);
	}
}
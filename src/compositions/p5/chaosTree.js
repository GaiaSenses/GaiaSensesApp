// inspired by: https://openprocessing.org/sketch/732455

class Particle {
	constructor(x, y, size, img) {
	  this.pos = createVector(x, y);
	  this.tgt = createVector(random(-1, 1) + x, random(-1, 1) + y);
	  this.size = size;
	  this.col = img.get(x, y);
	}
  }
  
  const [width, height] = [innerWidth, innerHeight];
  let particles = [];
  let imgUrls = [
	"https://i.postimg.cc/Fs3hS5Bh/ipe1.jpg",
	"https://i.postimg.cc/W3HvyKj3/ipe2.jpg",
	"https://i.postimg.cc/1ttSJSk2/ipe3.jpg",
	"https://i.postimg.cc/MHfSJDKY/ipe4.jpg"
  ];
  let img = null;
  
  function isInsideCanvas(x, y) {
	return x < img.width && x > 0 && y < img.height && y > 0;
  }
  
  function distanceSquared(x1, y1, x2, y2) {
	return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
  }
  
  function overlap(x1, y1, diam1, x2, y2, diam2) {
	return (
	  distanceSquared(x1, y1, x2, y2) < Math.pow(diam2 / 2 + diam1 / 2 - 2, 2)
	);
  }
  
  function preload() {
	const randomIndex = Math.floor(Math.random() * imgUrls.length);
	img = loadImage(imgUrls[randomIndex]);
  }
  
  function setup() {
	img.resize(
	  width || window.screen.availWidth,
	  height || window.screen.availHeight - 100,
	);
  
	createCanvas(img.width, img.height);
  
	image(img, 0, 0);
	frameRate(20);
  
	for (let i = 1; i > 0; i -= 0.0001) {
	  const x = random(img.width);
	  const y = random(img.height);
	  const size = 40 * Math.pow(random(i), 2) + 8;
  
	  if (!particles.some((p) => overlap(x, y, size, p.pos.x, p.pos.y, p.size))) {
		particles.push(new Particle(x, y, size, img));
	  }
	}
	noStroke();
  }
  
  function draw() {
	if (isInsideCanvas(mouseX, mouseY)) {
	  image(img, 0, 0);
  
	  for (const particle of particles) {
		const t =
		  1 -
		  5e-4 *
			(Math.pow(particle.pos.x - mouseX, 2) +
			  Math.pow(particle.pos.y - mouseY, 2));
		const p = [
		  (1 - t) * particle.pos.x + particle.tgt.x * t,
		  (1 - t) * particle.pos.y + particle.tgt.y * t,
		];
  
		fill(particle.col);
		circle(p[0], p[1], particle.size);
	  }
	}
  }
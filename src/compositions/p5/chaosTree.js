// inspired by: https://openprocessing.org/sketch/732455

const { weather } = window.App;
let lat = weather?.lat;
let lon = weather?.lon;

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
let biome = [
  [
    'https://i.postimg.cc/Fs3hS5Bh/ipe1.jpg', // default images for all biomes
    'https://i.postimg.cc/W3HvyKj3/ipe2.jpg',
    'https://i.postimg.cc/1ttSJSk2/ipe3.jpg',
    'https://i.postimg.cc/MHfSJDKY/ipe4.jpg',
  ],
  [
    'https://i.postimg.cc/Fs3hS5Bh/ipe1.jpg', 
    'https://i.postimg.cc/W3HvyKj3/ipe2.jpg',
    'https://i.postimg.cc/1ttSJSk2/ipe3.jpg',
    'https://i.postimg.cc/MHfSJDKY/ipe4.jpg', 
	'https://i.postimg.cc/QdQPmX9B/amazonia1.jpg', // amazonia
	'https://i.postimg.cc/76WQhhcR/amazonia2.jpg',
	'https://i.postimg.cc/HLTNPfX6/amazonia3.jpg',
	'https://i.postimg.cc/nLTW801p/amazonia4.jpg',
  ],
  [
    'https://i.postimg.cc/Fs3hS5Bh/ipe1.jpg', 
    'https://i.postimg.cc/W3HvyKj3/ipe2.jpg',
    'https://i.postimg.cc/1ttSJSk2/ipe3.jpg',
    'https://i.postimg.cc/MHfSJDKY/ipe4.jpg', 
    'https://i.postimg.cc/CMmddry3/mata-Atlantica1.jpg', // mata atlantica
    'https://i.postimg.cc/zG9F6X0F/mata-Atlantica2.jpg',
    'https://i.postimg.cc/1tK080Pv/mata-Atlantica3.jpg',
    'https://i.postimg.cc/yYGG6KLk/mata-Atlantica4.jpg',
  ],
  [
    'https://i.postimg.cc/Fs3hS5Bh/ipe1.jpg', 
    'https://i.postimg.cc/W3HvyKj3/ipe2.jpg',
    'https://i.postimg.cc/1ttSJSk2/ipe3.jpg',
    'https://i.postimg.cc/MHfSJDKY/ipe4.jpg',
	'https://i.postimg.cc/BnG0C76v/cerrado1.jpg', // cerrado
	'https://i.postimg.cc/RhkzyXLX/cerrado2.jpg',
	'https://i.postimg.cc/tJZjBLWs/cerrado3.jpg',
	'https://i.postimg.cc/9XKVDQHZ/cerrado4.jpg',

  ],
  [
    'https://i.postimg.cc/Fs3hS5Bh/ipe1.jpg', 
    'https://i.postimg.cc/W3HvyKj3/ipe2.jpg',
    'https://i.postimg.cc/1ttSJSk2/ipe3.jpg',
    'https://i.postimg.cc/MHfSJDKY/ipe4.jpg', 
	'https://i.postimg.cc/0QqnW43V/caatinga1.jpg', // caatinga
	'https://i.postimg.cc/J0rqmkRJ/caatinga2.jpg',
	'https://i.postimg.cc/tTt5L5Gp/caatinga3.jpg',
	'https://i.postimg.cc/D0xczwzN/caatinga4.jpg',
  ],
  [
    'https://i.postimg.cc/Fs3hS5Bh/ipe1.jpg', 
    'https://i.postimg.cc/W3HvyKj3/ipe2.jpg',
    'https://i.postimg.cc/1ttSJSk2/ipe3.jpg',
    'https://i.postimg.cc/MHfSJDKY/ipe4.jpg', 
	'https://i.postimg.cc/pL5TZf7d/pampa1.jpg', // pampa
	'https://i.postimg.cc/5tMxSZLP/pampa2.jpg',
	'https://i.postimg.cc/Qd785X99/pampa3.jpg',
	'https://i.postimg.cc/CLXMzZ1p/pampa4.jpg',
  ],
  [
    'https://i.postimg.cc/Fs3hS5Bh/ipe1.jpg', 
    'https://i.postimg.cc/W3HvyKj3/ipe2.jpg',
    'https://i.postimg.cc/1ttSJSk2/ipe3.jpg',
    'https://i.postimg.cc/MHfSJDKY/ipe4.jpg', 
	'https://i.postimg.cc/fTQLWtgt/pantanal1.jpg', // pantanal
	'https://i.postimg.cc/y6ZxzXnC/pantanal2.jpg',
	'https://i.postimg.cc/X7KvrjT2/pantanal3.jpg',
	'https://i.postimg.cc/fynwbp5n/pantanal4.jpg',
  ],
];
let index = 0;
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

switch (true) {
	case Math.round(lat) <= 5 &&
	  Math.round(lat) >= -15 &&
	  Math.round(lon) <= -45 &&
	  Math.round(lon) >= -75:
	  index = 1;
	  break;
	case Math.round(lat) <= -5 &&
	  Math.round(lat) >= -30 &&
	  Math.round(lon) <= -35 &&
	  Math.round(lon) >= -55:
	  index = 2;
	  break;
	case Math.round(lat) <= -3 &&
	  Math.round(lat) >= -24 &&
	  Math.round(lon) <= -43 &&
	  Math.round(lon) >= -60:
	  index = 3;
	  break;
	case Math.round(lat) <= -2 &&
	  Math.round(lat) >= -18 &&
	  Math.round(lon) <= -35 &&
	  Math.round(lon) >= -43:
	  index = 4;
	  break;
	case Math.round(lat) <= -29 &&
	  Math.round(lat) >= -35 &&
	  Math.round(lon) <= -50 &&
	  Math.round(lon) >= -55:
	  index = 5;
	  break;
	case Math.round(lat) <= -17 &&
	  Math.round(lat) >= -22 &&
	  Math.round(lon) <= -55 &&
	  Math.round(lon) >= -58:
	  index = 6;
	  break;
	default:
	  index = 0;
  }

function preload() {
	let nestedBiome = biome[index];
  	let randomImg = Math.floor(Math.random() * nestedBiome.length);
  	img = loadImage(nestedBiome[randomImg]);
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

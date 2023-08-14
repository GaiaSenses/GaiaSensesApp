// inspired by: https://openprocessing.org/sketch/1786759

const { weather } = window.App;
let clouds = weather?.clouds;
let cloudsColor1 = 0;
let cloudsColor2 = 256;
setup = () => {
  createCanvas(windowWidth, windowHeight);
  noStroke();
};

draw = () => {
  switch (true) {
    case clouds <= 5:
      clouds = 5;
      background('#75c2f6');
      cloudsColor1 = 192;
      cloudsColor2 = 256;
      break;

    case clouds > 5 && clouds <= 20:
      background('#93b5c6');
      cloudsColor1 = 128;
      cloudsColor2 = 192;
      break;

    case clouds > 20 && clouds <= 50:
      background('#c9ccd5');
      cloudsColor1 = 64;
      cloudsColor2 = 128;
      break;

    case clouds > 50:
      clouds = 50;
      background('#aaaaaa');
      cloudsColor1 = 0;
      cloudsColor2 = 64;
      break;
  }

  system.avoidOverlap();
  system.update();
  frameCount % 20 == 0 && system.spawn(random(width), random(height / 2));
};

const particle = (x, y) => ({
  posx: x,
  posy: y,
  velx: 0,
  vely: 0,
  accx: 0,
  accy: 0,
  gravity: 0,
  radius: random(width / 60, width / 20),
  color: color(random(cloudsColor1, cloudsColor2)),
  show() {
    fill(this.color);
    ellipse(this.posx, this.posy, this.radius * 2);
  },
});

const system = {
  particles: [],

  spawn(x, y) {
    for (let i = clouds; i--; ) {
      const a = random(TWO_PI);
      this.particles.push(particle(x + cos(a), y + sin(a)));
    }
  },

  avoidOverlap() {
    for (let i = this.particles.length; i--; ) {
      const current = this.particles[i];
      for (let j = i; j--; ) {
        const other = this.particles[j];
        const dx = current.posx - other.posx;
        const dy = current.posy - other.posy;
        const distance = sqrt(dx * dx + dy * dy);
        const sumRadius = current.radius + other.radius;
        if (distance < sumRadius) {
          let strength = 1 - distance / sumRadius;
          strength *= 0.25;
          current.accx += dx * strength;
          current.accy += dy * strength;
          other.accx -= dx * strength;
          other.accy -= dy * strength;
        }
      }
    }
  },

  update() {
    for (const b of this.particles) {
      b.gravity += 0.01;
      b.velx += b.accx;
      b.vely += b.accy;
      b.posx += b.velx;
      b.posy += b.vely + b.gravity;
      b.velx *= 0.5;
      b.vely *= 0.5;
      b.accx = 0;
      b.accy = 0;
      b.show();
    }
    this.particles = this.particles.filter((b) => {
      b.radius *= 0.995;
      return b.radius > 2 && b.posy - b.radius < height;
    });
  },
};

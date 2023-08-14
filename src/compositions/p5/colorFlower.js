// inspired by: https://openprocessing.org/sketch/1929051

let flowers = [];
let w;

let petalColorsFreezing = [
  '#caf0f8',
  '#ade8f4',
  '#90e0ef',
  '#48cae4',
  '#00b4d8',
  '#0096c7',
  '#0077b6',
  '#023e8a',
  '#03045e',
];
let petalColorsCold = [
  '#4cc9f0',
  '#4895ef',
  '#4361ee',
  '#3f37c9',
  '#3a0ca3',
  '#480ca8',
  '#560bad',
  '#7209b7',
  '#b5179e',
  '#f72585',
];
let petalColorsWarm = [
  '#277da1',
  '#577590',
  '#4d908e',
  '#43aa8b',
  '#90be6d',
  '#f9c74f',
  '#f9844a',
  '#f8961e',
  '#f3722c',
  '#f94144',
];
let petalColorsHot = [
  '#ffba08',
  '#faa307',
  '#f48c06',
  '#e85d04',
  '#dc2f02',
  '#d00000',
  '#9d0208',
  '#6a040f',
  '#370617',
  '#03071e',
];
let petalColorsBurning = [
  '#ffb600',
  '#ffaa00',
  '#ff9e00',
  '#ff9100',
  '#ff8500',
  '#ff7900',
  '#ff6d00',
  '#ff6000',
  '#ff5400',
  '#ff4800',
];

let edgeColors = ['#8c85af', '#5b668f', '#bf7567', '#c99f92', '#527c8e'];

const { weather } = window.App;
let temperature = weather?.main?.temp;
let petalColors;

function setup() {
  w = windowHeight;
  createCanvas(windowWidth, windowHeight);
  flowers.push(new flower(frameCount));

  switch (true) {
    case temperature <= 10:
      petalColors = petalColorsFreezing;
      break;
  
    case temperature > 10 && temperature <= 19:
      petalColors = petalColorsCold;
      break;
  
    case temperature > 19 && temperature <= 25:
      petalColors = petalColorsWarm;
      break;
  
    case temperature > 25 && temperature <= 30:
      petalColors = petalColorsHot;
      break;
  
    case temperature > 30:
      petalColors = petalColorsBurning;
      break;
  }
  
}

function draw() {
  if (frameCount % 75 == 0) {
    flowers.push(new flower(frameCount));
  }

  for (let i = 0; i < flowers.length; i++) {
    flowers[i].grow();
    flowers[i].show();
  }

  for (let i = flowers.length - 1; i >= 0; i--) {
    flowers[i].end();
  }
}

class flower {
  constructor(n) {
    this.extent = 1;
    this.n = n;
    this.nuOfPetals = floor(random(5, 11));
    this.edgeColor = color(random(edgeColors));
    this.color1 = color(random(petalColors));
    this.color2 = color(random(petalColors));
  }

  grow() {
    let frameMap = map(frameCount, this.n, this.n + 625, 0, 1);
    let sizer = easeInOutSine(frameMap);
    this.extent = map(sizer, 0, 1, 0, w * 0.73);
  }

  show() {
    //noisy arcs painting
    let ps = TAU / this.nuOfPetals;
    strokeWeight(2);
    stroke(this.edgeColor);
    for (let i = this.n; i < TAU + this.n; i += ps * 0.75) {
      let mixer = noise(this.n, i / 10, frameCount / 105);
      let f = lerpColor(this.color1, this.color2, mixer);
      let shader = color('#fffff');
      let shade = map(this.extent, 0, w * 0.1, 0.4, 1);
      let ff = lerpColor(shader, f, shade);
      fill(ff);
      push();
      translate(width / 2, height / 2.2);
      rotate(i);
      let xamount = this.extent / this.nuOfPetals;
      let xoff = map(1, (this.n, i, frameCount / 50), -1, 1, -xamount, xamount);
      let yoff = map(
        1,
        (this.n, i, frameCount / 50 - 0.2),
        -1,
        1,
        -xamount / 5,
        xamount / 5,
      );
      arc(
        xoff,
        this.extent + yoff,
        this.extent,
        this.extent,
        PI / 2 - ps * 1.1,
        PI / 2 + ps * 1.1,
        OPEN,
      );
      pop();
    }
  }

  end() {
    if (this.extent > w * 0.71) {
      let index = flowers.indexOf(this);
      flowers.splice(index, 1);
    }
  }
}

function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

// inspired by: https://openprocessing.org/sketch/1936782

let eyeRadius = 0.2;
let distribution = 1.0;
let length = 0.1;
let lengthEvo = 1.3;
let respawnFactor = 0.03;

var n = 200;
var vents = [];

let windColorFreezing = [
  '#caf0f8',
  '#ade8f4',
  '#90e0ef',
  '#48cae4',
  '#00b4d8',
  '#0096c7',
];
let windColorCold = [
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
let windColorWarm = [
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
let windColorHot = [
  '#ffba08',
  '#faa307',
  '#f48c06',
  '#e85d04',
  '#dc2f02',
  '#d00000',
  '#9d0208',

];
let windColorBurning = [
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

const { weather } = window.App;
let temperature = weather?.main?.temp;
let speedFactor = (weather?.wind?.speed)/100;
let eyeVariance = (weather?.wind?.deg)/1000;

function setup() {
	createCanvas(windowWidth, windowHeight);
  for(let i = 0 ; i < n ; i ++) {
    vents.push(new Vent());
  }
}

function draw() {
	background(0);
  for(let i = 0 ; i < n ; i ++) {
    vents[i].show();
    vents[i].move();
  }
}

class Vent {
  
  constructor () {
		var x,y,rx,ry,a,la,s,c;
    this.initialize(); 
  }
  
  initialize() {
		let windColor;

    if (temperature <= 10) {
      windColor = windColorFreezing;
    } else if (temperature > 10 && temperature <= 19) {
      windColor = windColorCold;
    } else if (temperature > 19 && temperature <= 25) {
      windColor = windColorWarm;
    } else if (temperature > 25 && temperature <= 30) {
      windColor = windColorHot;
    } else if (temperature > 30) {
      windColor = windColorBurning;
    }
		
    var centerR = random(0, eyeVariance * width);
    var centerA = random(0, 2 * PI);
    this.x = width / 2.0 + centerR * cos(centerA);
    this.y = height / 2.0 + centerR * sin(centerA);
    
    var radiusRow = eyeRadius * width + pow(random(0, pow((width - eyeRadius * width * 2.0),distribution)), 1.0 / distribution);
    this.rx = radiusRow * random(0.8, 1.2);
    this.ry = radiusRow * random(0.8, 1.2);
    
    this.a = random(0, 2 * PI);
    
    this.la = pow(length * width,lengthEvo) / radiusRow * random(0.8, 1.2);
    
    this.c = color(random(windColor));
    
    this.s = speedFactor * random(0.8, 1.2);
  }
  
  show() {
    
    noFill();
    stroke(this.c);
    arc(this.x, this.y, this.rx, this.ry, this.a, this.a + this.la);
    
  }
  
  move() {
    this.a += this.s;
    var r = random(0,1);
    if(r < respawnFactor) {
      this.initialize();
    }
  }
}
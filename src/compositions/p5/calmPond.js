// inspired by: https://openprocessing.org/sketch/1987674

var bgColor = [45, 12.9, 94.5];
var inkColor = [45, 40, 30];
var inkTrans = [45, 40, 30, 0.75];
var lilly = [337, 20, 85, 0.8];

var bgGrass = []; // array to hold grass objects
var myGrass = []; // array to hold grass objects
var myPads = []; // array to hold grass objects
var pond = []; // array to hold pond coordinates
var windDirection;

function setup() {
  createCanvas(windowWidth, windowHeight);
  windDirection = random(windowWidth);

  //creating clumps of grass
  //the values 15, 25, 24 and 14 cotrol how many leaves are pushed
  for (let j = 0; j < 15; j++) {
    for (let i = 0; i < 10; i++) {
      let x = map(i, 0, 9, 0, width);
      let y = map(j, 0, 14, 0, height);
      bgGrass.push(
        new clump(x + random(-30, 30), y + random(-20, 20), 1, 50, 0, true),
      );
    }
  }

  //pond shape
  makepond();

  //grass clumps around pond
  for (let i = 0; i < pond.length; i++) {
    myGrass.push(
      new clump(pond[i].x + random(-30, 30), pond[i].y, 1, random(50), 0),
    );
  }

  //lilly pads in lake
  let c = random(3);
  for (let i = 0; i < c; i++) {
    let y = map(i, 0, c, height / 1.1, height / 1.3);
    let x = map(random(1), 0, 1, width / 2.2, width / 1.8);
    myPads.push(new pad(x, y));
  }

  colorMode(HSB);
  background(bgColor);
}

function draw() {
  background(bgColor);
  wind = map(windDirection, 0, width, -1, 1, true);
  for (let i = 0; i < bgGrass.length; i++) {
    bgGrass[i].display();
  }

  fill(bgColor);
  strokeWeight(3); //pond outline
  stroke(inkTrans);
  beginShape();
  for (let i = 0; i < pond.length + 3; i++) {
    curveVertex(pond[i % pond.length].x, pond[i % pond.length].y);
  }
  endShape();

  for (let i = 0; i < myPads.length; i++) {
    myPads[i].display_ripples();
  }
  for (let i = 0; i < myPads.length; i++) {
    myPads[i].display();
  }
  for (let i = 0; i < myPads.length; i++) {
    myPads[i].display_flower();
  }

  for (let i = 0; i < myGrass.length; i++) {
    myGrass[i].display();
  }
}

function makepond() {
  let cx = width / 2;
  let cy = height / 1.2;
  let b = width / 3.5;
  let a = min(b * 0.75, height / 3.5);

  for (let i = 0; i < 360; i += 5) {
    let theta = (TAU * i) / 360;
    let r = (a * b) / sqrt(b * b * sq(cos(theta)) + a * a * sq(sin(theta)));
    let noiseval = noise(123 + 3 * sin(theta), 234 + 3 * cos(theta));
    let x = cx + r * sin(theta) * (0.5 + noiseval);
    let y = cy + r * cos(theta);
    pond.push(createVector(x, y));
  }
}

class blade {
  constructor(_x, _y, _w, _l, _a) {
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.l = _l;
    this.a = _a;
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(inkColor);

    let a1 = createVector(-0.6 * this.w, -0.3 * this.l);
    let a11 = createVector(-0.6 * this.w, -0.6 * this.l);
    let a2 = createVector(0.6 * this.w, -0.3 * this.l);
    let a21 = createVector(0.6 * this.w, -0.6 * this.l);
    let tip = createVector(0, -this.l);

    let l_wind;
    if (wind < 0) {
      l_wind =
        wind * noise((this.x + millis()) * 0.001, (this.y + millis()) * 0.001);
    } else {
      l_wind =
        wind *
        noise((width - this.x + millis()) * 0.001, (this.y + millis()) * 0.001);
    }

    a1.rotate(l_wind / 3 + this.a);
    a2.rotate(l_wind / 3 + this.a * QUARTER_PI);
    a11.rotate(l_wind / 2 + this.a * QUARTER_PI);
    a21.rotate(l_wind / 2 + this.a * QUARTER_PI);
    tip.rotate(l_wind + this.a * QUARTER_PI);
    beginShape();
    vertex(-0.4 * this.w, 0);
    bezierVertex(a1.x, a1.y, a11.x, a11.y, tip.x, tip.y);
    bezierVertex(a21.x, a21.y, a2.x, a2.y, 0.4 * this.w, 0);
    vertex(0.4 * this.w, 0);
    endShape();
    pop();
  }
}

class bulrush {
  constructor(_x, _y, _w, _l, _a) {
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.l = _l;
    this.a = _a;
    this.start = random(0.75, 0.85);
    this.end = random(0.9, 1);
  }

  display() {
    push();
    translate(this.x, this.y);
    noFill();
    stroke(inkColor);

    let a1 = createVector(0, -0.3 * this.l);
    let a11 = createVector(0, -0.6 * this.l);
    let tip = createVector(0, -this.l);

    let l_wind;
    if (wind < 0) {
      l_wind =
        wind * noise((this.x + millis()) * 0.001, (this.y + millis()) * 0.001);
    } else {
      l_wind =
        wind *
        noise((width - this.x + millis()) * 0.001, (this.y + millis()) * 0.001);
    }

    strokeWeight(this.w / 3); //stem
    a1.rotate(l_wind / 3 + this.a);
    a11.rotate(l_wind / 2 + this.a * QUARTER_PI);
    tip.rotate(l_wind + this.a * QUARTER_PI);
    beginShape();
    vertex(-0.4 * this.w, 0);
    bezierVertex(a1.x, a1.y, a11.x, a11.y, tip.x, tip.y);
    vertex(tip.x, tip.y);
    endShape();

    strokeWeight(this.w); //rush
    let steps = floor(this.w * (this.end - this.start) * 20);
    for (let i = 0; i <= steps; i++) {
      let t = map(i, 0, steps, this.start, this.end);
      let x = bezierPoint(0, a1.x, a11.x, tip.x, t);
      let y = bezierPoint(0, a1.y, a11.y, tip.y, t);
      point(x, y);
    }

    pop();
  }
}

class foxtail {
  constructor(_x, _y, _w, _l, _a) {
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.l = _l;
    this.a = _a;
    this.start = random(0.8, 0.9);
    this.end = 1;
  }

  display() {
    push();
    translate(this.x, this.y);
    noFill();
    stroke(inkColor);

    let a1 = createVector(0, -0.3 * this.l);
    let a11 = createVector(0, -0.6 * this.l);
    let tip = createVector(0, -this.l);

    let l_wind;
    if (wind < 0) {
      l_wind =
        wind * noise((this.x + millis()) * 0.001, (this.y + millis()) * 0.001);
    } else {
      l_wind =
        wind *
        noise((width - this.x + millis()) * 0.001, (this.y + millis()) * 0.001);
    }

    strokeWeight(this.w / 3); //stem
    a1.rotate(l_wind / 3 + this.a);
    a11.rotate(l_wind / 2 + this.a * QUARTER_PI);
    tip.rotate(l_wind + this.a * QUARTER_PI);
    beginShape();
    vertex(-0.4 * this.w, 0);
    bezierVertex(a1.x, a1.y, a11.x, a11.y, tip.x, tip.y);
    vertex(tip.x, tip.y);
    endShape();

    strokeWeight(this.w / 6); //feathers
    let steps = floor(this.w * (this.end - this.start) * 18);
    for (let i = 0; i <= steps; i++) {
      let t = map(i, 0, steps, this.start, this.end);
      let x = bezierPoint(0, a1.x, a11.x, tip.x, t);
      let y = bezierPoint(0, a1.y, a11.y, tip.y, t);
      let tx = bezierTangent(0, a1.x, a11.x, tip.x, t);
      let ty = bezierTangent(0, a1.y, a11.y, tip.y, t);
      let a = atan2(ty, tx);
      line(
        x,
        y,
        x + this.w * 2 * cos(a + pow(-1, i) * map(i, 0, steps, PI / 6, 0)),
        y + this.w * 2 * sin(a + pow(-1, i) * map(i, 0, steps, PI / 6, 0)),
      );
    }

    pop();
  }
}

class clump {
  //_x grass blade x position
  //_y grass blade y position
  //_w grass blade width
  //_l grass blade length
  //_a grass blade orientation
  constructor(_x, _y, _w, _l, _a, _grassonly) {
    this.leaves = [];
    this.topper = [];
    this.type = floor(random(3)); // 0 = nothing, 1 = bulrush, 2 = foxtail

    let count = floor(random(3, 10)); //leaves
    if (_grassonly) {
      this.type = 0;
      count = floor(random(2, 5));
    }

    for (let i = 0; i < count; i++) {
      let x = _x + (map(i, 0, count, -_w, _w) * count) / 4;
      let y = _y + random(-_w, _w) / 4;
      let l =
        _l - abs(map(i, 0, count, -_l, _l) / 2) + random(-0.1 * _l, 0.1 * _l);
      let a = _a + map(i, 0, count, -0.05, 0.05) * count + random(-0.1, 0.1);
      this.leaves.push(new blade(x, y, _w, l, a));
    }

    count = floor(random(1, 5));
    for (let i = 0; i < count; i++) {
      let x = _x + (map(i, 0, count, -_w, _w) * count) / 4;
      let y = _y + random(-_w, _w) / 4;
      let l = _l * random(1, 1.3);
      let a = _a + map(i, 0, count, -0.05, 0.05) * count + random(-0.1, 0.1);
      if (this.type == 1) {
        //bulrush
        this.topper.push(new bulrush(x, y, _w, l, a));
      }
      if (this.type == 2) {
        //foxtail
        this.topper.push(new foxtail(x, y, _w, l, a));
      }
    }
  }

  display() {
    for (let i = 0; i < this.leaves.length; i++) {
      this.leaves[i].display();
    }
    for (let i = 0; i < this.topper.length; i++) {
      this.topper[i].display();
    }
  }
}

class pad {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.w = 50;
    this.h = this.w * 0.5;
    this.stop = random(TWO_PI);
    this.start = this.stop + random(PI / 4);
    this.drift = 0;
    this.driftmax = this.w * random(0.5, 1);
    this.hasflower = random(1) < 0.5;
  }

  display() {
    let l_wind;
    if (wind < 0) {
      l_wind =
        wind * noise((this.x + millis()) * 0.001, (this.y + millis()) * 0.001);
    } else {
      l_wind =
        wind *
        noise((width - this.x + millis()) * 0.001, (this.y + millis()) * 0.001);
    }

    this.drift += l_wind * l_wind * l_wind * 8;
    this.drift = constrain(this.drift, -this.driftmax, this.driftmax);

    push();
    translate(this.x + this.drift, this.y);

    fill(bgColor);
    stroke(inkColor);
    strokeWeight(2.1);
    arc(
      0,
      0,
      this.w,
      this.h,
      this.start + this.drift / 100,
      this.stop + this.drift / 100,
      PIE,
    );

    pop();
  }

  display_ripples() {
    let l_wind;
    if (wind < 0) {
      l_wind =
        wind * noise((this.x + millis()) * 0.001, (this.y + millis()) * 0.001);
    } else {
      l_wind =
        wind *
        noise((width - this.x + millis()) * 0.001, (this.y + millis()) * 0.001);
    }

    push();
    translate(this.x + this.drift, this.y);

    noFill();
    stroke(inkColor);

    //ripples
    for (let i = 0; i < 6; i++) {
      let start = map(i, 0, 5, (this.start + this.stop) / 2, this.start);
      let stop = map(i, 0, 5, (this.start + this.stop) / 2, this.stop);
      strokeWeight(map(i, 0, 5, 0.2, 1));
      let sc = map(i, 0, 4, 1.8, 1.2);
      arc(
        0,
        0,
        sc * this.w,
        sc * this.h,
        start + this.drift / 100,
        stop + this.drift / 100,
        OPEN,
      );
    }
    pop();
  }

  display_flower() {
    if (this.hasflower) {
      push();
      translate(this.x + this.drift, this.y - 10);
      this.flower();
      pop();
    }
  }

  flower() {
    push();
    let l = this.w / 4.5;
    let c = color(lilly);
    strokeWeight(2.1);
    fill(c);
    stroke(inkColor);

    //bottom
    this.petal(0, 0, l, PI);
    this.petal(0, 0, l, PI - 0.8);
    this.petal(0, 0, l, PI + 0.8);
    //back
    this.petal(0, 0, l, 0);
    this.petal(0, 0, l, 0.4);
    this.petal(0, 0, l, -0.4);
    this.petal(l / 5, 0, l, 0.8);
    this.petal(-l / 5, 0, l, -0.8);
    //front
    this.petal(l / 4, l / 4, l, 1.0);
    this.petal(-l / 4, l / 4, l, -1.0);
    this.petal(l / 8, l * 0.55, l, 0.4);
    this.petal(-l / 8, l * 0.55, l, -0.4);
    this.petal(0, l * 0.7, l, 0);

    pop();
  }

  petal(_x, _y, _l, _a) {
    push();
    translate(_x, _y);
    rotate(_a);
    beginShape();
    vertex(0, -_l);
    bezierVertex(_l, 0, -_l, 0, 0, -_l);
    endShape();
    pop();
  }
}

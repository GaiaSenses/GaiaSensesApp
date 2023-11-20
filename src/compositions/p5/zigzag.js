// inspired by: https://openprocessing.org/sketch/1643288

const FPS_MIN = 15;
const FPS_MAX = 60;

const AGENTS_MIN = 10;
const AGENTS_MAX = 200;

const CRITICAL_RAIN = 10;
const CRITICAL_LIGHTNING = 10;

const [width, height] = [innerWidth, innerHeight];
const { weather, lightning } = window.App;

const rain = weather?.rain['1h'] || 0;
const lightningCount = lightning?.count || 0;
let fps = 0;

const colors = ['#af0f0f', '#feb30f', '#0aa4f7', '#000000', '#ffffff'];
const weights = [1, 1, 1, 1, 1];

let agents = [];
let nAgents = 0;
let speed = 10;
let step = 2;
let direction = 1;

function createAgent(x, y) {
  return {
    pos: createVector(x, y),
    oldPos: createVector(x, y),
    color: generateColor(10),
    strokeWidth: 5,
  };
}

function updateAgent(agent) {
  agent.pos.x += direction * vectorField(agent.pos.x, agent.pos.y).x * step + 1;
  agent.pos.y += direction * vectorField(agent.pos.x, agent.pos.y).y * step;

  agent.strokeWidth = map(agent.pos.y, 0, height, 5, 1);

  if (agent.pos.y >= height) {
    agent.pos.y = 0;
    agent.color = generateColor(10);
    agent.strokeWidth = 5;
    agent.oldPos.set(agent.pos);
  }
  if (agent.pos.x > width || agent.pos.x < 0) {
    agent.pos.x = agent.pos.x < 0 ? width : 0;
    agent.oldPos.set(agent.pos);
  }

  strokeWeight(agent.strokeWidth);
  stroke(agent.color);
  line(agent.oldPos.x, agent.oldPos.y, agent.pos.x, agent.pos.y);

  agent.oldPos.set(agent.pos);
}

function vectorField(x, y) {
  x = map(x, 0, width, -speed - 10, speed + 10);
  y = map(y, 0, height, -speed - 10, speed + 10);

  let k1 = 5;
  let k2 = 3;

  let u = Math.sin(k1 * y) + Math.floor(Math.cos(k2 * y));
  let v = Math.sin(k2 * x) - Math.cos(k1 * x);

  // litle trick to move from left to right
  if (v <= 0) {
    v = -v * 0.3;
  }
  return createVector(u, v);
}

function generateColor() {
  let temp = randomColor();

  return color(
    hue(temp) + randomGaussian() * speed,
    saturation(temp) + randomGaussian() * speed,
    brightness(temp) - speed,
    random(10, 100),
  );
}

function randomColor() {
  let sum = weights.reduce((prev, cur) => prev + cur);
  let target = random(0, sum);

  for (let i = 0; i < weights.length; i++) {
    const weight = weights[i];

    if (weight >= target) {
      return colors[i];
    }
    target -= weight;
  }
}

function setup() {
  createCanvas(width, height);
  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);
  strokeCap(SQUARE);

  nAgents = Math.floor(
    map(lightningCount, 0, CRITICAL_LIGHTNING, AGENTS_MIN, AGENTS_MAX, true),
  );
  fps = map(rain, 0, CRITICAL_RAIN, FPS_MIN, FPS_MAX, true);

  background(0);
  frameRate(fps);

  for (let i = 0; i < nAgents / 3; i++) {
    agents.push(createAgent(randomGaussian() * 200, 0));
    agents.push(createAgent(width * 0.5 + randomGaussian() * 200, 0));
    agents.push(createAgent(width * 1.0 + randomGaussian() * 200, 0));
  }
}

function draw() {
  if (frameCount > 10000) {
    noLoop();
  }

  for (let i = 0; i < agents.length; i++) {
    updateAgent(agents[i]);
  }

  stroke(0, 0, 100);
  noFill();
  strokeWeight(20);
}

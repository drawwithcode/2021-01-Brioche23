/*
Brioschi Alessio
Creative Coding 2021-22

Assignment_01
"Create a generative artwork, using frame count"



 */

class Star {
  constructor(col2) {
    let col1 = color("white");
    let color1 = lerpColor(col1, col2, random(0, 1));
    this.x = random(-width / 2, width / 2);
    this.y = random(-height / 2, height / 2);
    this.r = random(1, 3);
    this.color = color1;
  }

  createStar() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.r);
  }
}

let img;

let stars = [];

let sc = 1;
let ro = 1;
let r = 0;
let g = 0;
let b = 0;

let introDone = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);
  cursor(CROSS);
  frameRate(60);
  textSize(16);
  textAlign(CENTER);
  textFont("Helvetica");
  fill("white");
  //colorMode(HSB);
  //img = loadImage("img/doge_1.png");
  background(0);
  r = random(255);
  g = random(255);
  b = random(255);
  let col2 = color(r, g, b);

  for (let i = 0; i < width * 2; i++) {
    stars.push(new Star(col2));
  }
  console.log(stars.length);
}

function draw() {
  translate(width / 2, height / 2);
  intro();
  push();
  scale(sc);
  rotate(ro);
  if (introDone) {
    for (let i = 0; i < stars.length; i++) {
      stars[i].createStar();
    }
    if (frameCount > 480) increment();
  }
  pop();

  if (sc > 15) noLoop();
}

function intro() {
  if (frameCount < 120) {
    background(0, 0, 0, 255);
    text("Lightspeed Painting", 0, -20);
  }
  if (frameCount > 120 && frameCount < 240) {
    background(0, 0, 0, 255);

    text("Place your mouse on the dot", 0, -20);
    circle(0, 0, 10);
  }
  if (frameCount > 240 && frameCount < 360) {
    background(0, 0, 0, 255);

    text("Move left or right to rotate", 0, -20);
    circle(0, 0, 10);
  }
  if (frameCount > 360 && frameCount < 420) {
    background(0, 0, 0, 255);

    text("Let's go!", 0, -20);
    circle(0, 0, 10);
  }
  if (frameCount == 420) {
    background(0, 0, 0, 255);
    introDone = true;
  }
}

function increment() {
  //if (frameCount > 120) {
  sc += 1 / 75;
  //}
  //if (frameCount > 180) {
  //ro += 1 / 60;
  let dist = (width / 2 - mouseX) / 200;
  console.log("Dist: " + dist);
  let cons = constrain(dist, -2, 2);
  ro += cons;
  // }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   //background(0);
// }

function keyPressed() {
  if (key == "s" || key == "S") saveCanvas("doggo", "png");
}

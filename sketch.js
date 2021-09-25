/*
Brioschi Alessio
Creative Coding 2021-22

Assignment_01
"Create a generative artwork, using frame count"

Idea
Generative artwork inspired by the famous Star Wars'lightspeed effect.
The artwork runs by himself, incrementing the parameter on each frame.
The only control given to the user is the rotation of the trails,
by moving the mouse from the center.
The artwork doesn't loop. It stops once it has reached a defined scale value.

MOUSE
position x  : rotation

KEYS
s           : save a png of the artwork
*/

//  Creating a class Star, with random values to make the stars
//  Source i started from: "Particles" from p5js.org/examples

class Star {
  constructor(col2) {
    let col1 = color("white");
    let color1 = lerpColor(col1, col2, random(0, 1));
    //  Width and Height are /2 because of the translate() in the draw() function
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

//  Ititializing variables
let stars = []; //  Array for the stars
let sc = 1; //  Scale value
let ro = 1; //  Rotation value

// Color
let r = 0;
let g = 0;
let b = 0;

//  Sentinel to check if the intro is finished
let introDone = false;

function setup() {
  // Setting up the parameters
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  imageMode(CENTER);
  cursor(CROSS);
  frameRate(60);
  textSize(16);
  textAlign(CENTER);
  textFont("Helvetica");
  fill("white");
  background(0);

  //Randomizing the second color of the lerp on every refresh
  r = random(255);
  g = random(255);
  b = random(255);
  let col2 = color(r, g, b);

  //  Loading the array
  for (let i = 0; i < width * 2; i++) {
    stars.push(new Star(col2));
  }
}

function draw() {
  translate(width / 2, height / 2);

  //  Starting the intro
  intro();

  //  Transformation applied at the stars
  push();
  scale(sc);
  rotate(ro);

  //  Creating the stars after the intro is finished
  if (introDone) {
    for (let i = 0; i < stars.length; i++) {
      stars[i].createStar();
    }
    // Little pause before moving the stars
    if (frameCount > 480) increment();
  }
  pop();

  //  When the scale factor reaches 15, it ends
  //  So it is possible to better control the final weight of the stroke
  if (sc > 15) noLoop();
}

/* 
Extremely rudimental function to create timed text 
while overcoming the problem of frame overlapping 
caused by the fixed background in the setup()
*/
function intro() {
  if (frameCount < 420) {
    bg_and_circle();
    if (frameCount < 120) text("Lightspeed Painting", 0, -20);
    if (frameCount > 120 && frameCount < 240)
      text("Place your mouse on the dot", 0, -20);
    if (frameCount > 240 && frameCount < 360)
      text("Move left or right to rotate", 0, -20);
    if (frameCount > 360) text("Let's go!", 0, -20);
  }
  if (frameCount == 420) {
    background(0, 0, 0, 255);
    introDone = true;
  }
}

//  Separate function to create a bg and a circle,
//  since these two instructions were repeated multiple times in intro()
function bg_and_circle() {
  background(0, 0, 0, 255);
  circle(0, 0, 10);
}

function increment() {
  //  Increment the scale
  sc += 1 / 75;

  //  Calculate the distance from the center
  //  Divided by 200 so the rotation is more gradual
  let dist = (width / 2 - mouseX) / 200;

  //  Costraining the rotation to contain the maximum spinning speed
  let cons = constrain(dist, -2, 2);

  // Incrementing the rotation
  ro += cons;
}

// Function to save the artwork with today's date
function keyPressed() {
  let d = day();
  let m = month();
  let y = year();

  if ((key == "s" || key == "S") && introDone)
    saveCanvas(y + "_" + m + "_" + d + "_Gen_Art", "png");
}

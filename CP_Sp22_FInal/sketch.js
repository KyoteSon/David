// Add some header info
// For TM template code

// Video
let video;
let label;
let classifier;
let confidence;
let angle = 0.0;
let x;
let r2 = 0;
let speed = .5;
let speed2 = 0.05;
let offset = 200;
let scalar = 133;

const fireworks = [];
let gravity;

function preload() {
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/XsknySoBQ/');
  myFont = loadFont('Changa-VariableFont_wght.ttf');
  img = loadImage('img/qr-code.png');
}

function setup() {
  
  createCanvas(innerWidth,innerHeight);
  
  video = createCapture(VIDEO);
  video.hide();
  textAlign(CENTER);
  
  classifyVideo();
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

function classifyVideo(){
  classifier.classify(video, gotResults);
}


function draw() {
  // background(0);
  // origianl was confidence = 0.95
  if (label == 'saic' && confidence > 0.95) {
    // show neutral screen
    saicScreen();
   
  } else if (label == 'nonsaic') {
    // show SAIC screen
    nonSaicScreen();

  } else {
    // show non-SAIC screen
    neutralScreen();

}
  
}


function gotResults(error, results){
  if (error) {
    console.error(error);
    return
  }
  label = results[0].label;
  confidence = results[0].confidence;
  //console.log(results);
  
  classifyVideo();
}



function neutralScreen() {

  background('#595958');

  push();
  translate(width/1,height/4);
  rotate(-angle);
  fill('#F2F2F2');
  noStroke();
  rectMode(CENTER);
  square(0,0,800);
  pop();

  push();
  translate(width/2.3,height/2);
  rotate(angle);
  fill('#A6A6A6');
  noStroke();
  rectMode(CENTER);
  square(0,0,1200);
  pop();

  
  angle += radians(1); 

  rectMode(CORNERS);

  fill(random(0,255),random(0,255),random(0,255),10);
  stroke(1);
  rect(random(0,width),random(0,height),random(0,width),random(0,height));


  r2 = r2 + speed;
   if(r2 > width) {
     speed = speed * -1;
   } else if(r2 < 0){
     speed = speed * -1;
   }

  ellipse(width/2,height/2, r2);
  

  
  fill(0);
  textSize(50);
  textFont(myFont);
  text("WELCOME TO \n INTRO TO COMPUTER VISION EXHIBITION \n\n SAIC FAMILY MEMBERS ONLY, \n PLEASE SCAN YOUR ID", width/2, height/2)

  // what do we see when the label is neutral

}

function saicScreen() {

  push();
  colorMode(HSB);
  gravity = createVector(0, 0.2);
  stroke(255);
  strokeWeight(4);

  colorMode(RGB);
  background(0, 0, 0, 25);
  
  if (random(1) < 0.04) {
    fireworks.push(new Firework());
  }
  
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
  
  //circle 

  // let x3 = offset - cos(angle) * scalar; 
  // let y3 = offset - sin(angle) * scalar;
  // fill('#90ee90');
  // noStroke();
  // ellipse(width/2.5+x3,height/4+y3,40,40);
  // angle += speed2;



  fill(255);
  textSize(70);
  textFont(myFont);
  text("SAIC FAMILY MEMBER CONFIRMED! \nENJOY THE SHOW", width/2, height/2)

  pop();

  
}


function nonSaicScreen() {
     
  let sinval = sin(angle);
  print(sinval);
  let red = map(sinval,-1,1,100,255);
  background(red,0,0);
  angle += .5;

  fill('#880808');
  noStroke();
  let y1 = offset + sin(angle) * scalar;
  let y2 = offset + sin(angle + 0.4) * scalar;
  let y3 = offset + sin(angle + 0.8) * scalar; 
  let y4 = offset + sin(angle + 1.2) * scalar; 
  ellipse(width/2.2,y1+height/1.8,40,40);
  ellipse(width/2.2+40,y2+height/1.8,40,40);
  ellipse(width/2.2+80,y3+height/1.8,40,40);
  ellipse(width/2.2+120,y4+height/1.8,40,40);


  // what do we see when the label is nonSaic
  fill(0);
  textSize(50);
  textFont(myFont);
  text("NON-SAIC MEMBER IDENTIFIED, \nPLEASE ESCORT YOURSELF OUT", width/2, height/2)

  // translate(width/2,height/1.5);
  image(img, width/2.5, height/1.5, 300, 300);
}


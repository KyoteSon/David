// Add some header info
// For TM template code

// Video
let video;

let label;
let classifier;
let confidence;

// STEP 1: Load the model!

function preload() {
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/XsknySoBQ/');
}

function setup() {
  
  createCanvas(innerWidth,innerHeight);
  
  video = createCapture(VIDEO);
  video.hide();
  textAlign(CENTER)

  // STEP 2: Start classifying
  classifyVideo();
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

function classifyVideo(){
  classifier.classify(video, gotResults);
}


function draw() {
  background(0);
  
  // Draw the video
  // image(video, 0, 0);

  // STEP 4: Draw the label
  
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
  
  // textSize(256);
  // text(emoji, width/2,height/2);

  // textAlign(LEFT);
  // fill(255, 0, 255)
  // textSize(20);
  // text(confidence, width/8, height/4);
  // text(label, width/8, height/4 + 30);
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
  background(90);

  textSize(100);
  text("SAIC FAMILY MEMBERS ONLY, \n PLEASE SCAN YOUR ID", width/2, height/2)

  // what do we see when the label is neutral

}

function saicScreen() {
  background(20, 170, 20);
  // what do we see when the label is saic

  textSize(100);
  text("SAIC FAMILY MEMBER CONFIRMED! \nENJOY THE SHOW", width/2, height/2)

}


function nonSaicScreen() {
  background(200, 30, 0);

  // what do we see when the label is nonSaic

  textSize(100);
  text("NON-SAIC MEMBER IDENTIFIED, \nPLEASE ESCORT YOURSELF OUT", width/2, height/2)

}



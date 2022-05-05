// Add some header info
// For TM template code

// Video
let video;

let label = 'waiting...';
let classifier;
let confidence;

// STEP 1: Load the model!

function preload() {
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/k1FddoiWG/');
}

function setup() {
  // createCanvas(640, 520);
  createCanvas(500,300);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
  classifyVideo();
}

function classifyVideo(){
  classifier.classify(video, gotResults);
}
// STEP 2 classify!

function draw() {
  background(0);
  
  // Draw the video
  // image(video, 0, 0);

  // STEP 4: Draw the label
  
  // textSize(32);
  textAlign(CENTER, CENTER);
  // fill(255);
  // text(label, width/2, height -16);
  
  let emoji = '👤';
  if (label == 'Class 1') {
    emoji = '⭕';
  } else if (label == 'Class 2') {
    emoji = '❌';
  } else if (label == 'waiting...'){
       emoji = '👋';
}
  
  textSize(256);
  text(emoji, width/2,height/2);

  textAlign(LEFT);
  fill(255, 0, 255)
  textSize(20);
  text(confidence, width/8, height/4);
  text(label, width/8, height/4 + 30);
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


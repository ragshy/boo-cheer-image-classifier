let capture, classifier
let boo, yey
let label = 'wait'
let conf = ''
let reaction = ''
let muteButton
let muted = false

let modelUrl = 'https://teachablemachine.withgoogle.com/models/G__by7TaN/model.json';

function preload() {
  classifier = ml5.imageClassifier(modelUrl)
}

function setup() {
  createCanvas(600, 500)
  capture = createCapture(VIDEO)
  capture.size(600, 400)
  capture.hide()
  //classifier = ml5.imageClassifier(modelUrl, loaded)
  boo1 = loadSound('boo1.mp3', loaded)
  yey1 = loadSound('yey4.mp3', loaded)

  muteButton = createButton('mute')
  muteButton.mousePressed(switchMute)
}

function loaded() {
  console.log('loaded')
}

function draw() {
  background(220)
  flip(capture)
  classifyVideo(capture)

  // Draw the label
  fill(0)
  textSize(50)
  textAlign(CENTER)
  text(label, width / 2, height - 30)

  // make reaction
  if (label == 'sexy' && !yey1.isPlaying()) {
    reaction = '😍💦   😍💕'
    boo1.stop()
    yey1.play()

  } else if (label == 'notsexy' && !boo1.isPlaying()) {
    reaction = 'booooo get off\n the stage 🍅'
    yey1.stop()
    boo1.play()
  }
  // draw reaction
  textSize(80)
  textAlign(CENTER)
  fill(0)
  text(reaction, width / 2, height / 2 - 50)
}

function switchMute() {
  if ((boo1.isPlaying() || yey1.isPlaying) && !muted) {
      boo1.setVolume(0)
      yey1.setVolume(0)
      muteButton.html('unmute')
      muted = true
    } else {
      boo1.setVolume(0.5)
      yey1.setVolume(0.5)
      muteButton.html('mute')
      muted=false
    }
  }

  function flip(video) {
    push()
    translate(width, 0)
    scale(-1, 1)
    image(video, 0, 0, width, 400)
    pop()
  }

  function classifyVideo() {
    classifier.classify(capture, gotResults)
  }

  function gotResults(error, results) {
    if (error) {
      console.error(error)
      return
    }
    //console.log(results[0]);
    label = results[0].label
    conf = results[0].confidence
  }
let featureExtractor, regressor, loss, predictResult=0.5;
let video;
let status = 'loading...';
let slider, addImageButton, trainButton, predictButton;
let mode = 0; //ゲームモード 0:学習中、1:ゲームプレイ
let game; //ゲーム本体

function setup() {
  createCanvas(windowWidth, windowHeight);
  //新規にゲームを生成
  game = new TennisGame();
  //解析関係の設定
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();  
  featureExtractor 
  = ml5.featureExtractor('MobileNet', modelReady);  
  regressor = featureExtractor.regression(video);
  slider = createSlider(0.0, 1.0, 0.5, 0.01);
  slider.position(20, 40);
  addImageButton = createButton('add image');
  addImageButton.position(
    slider.x + slider.width + 20, 40);
  addImageButton.mousePressed(addImage);
  trainButton = createButton('train');
  trainButton.position(
    addImageButton.x + addImageButton.width + 5, 40);
  trainButton.mousePressed(train);
  predictButton = createButton('start predict');
  predictButton.position(
    trainButton.x + trainButton.width + 5, 40);
  predictButton.mousePressed(predict);
}

function draw(){
  background(0);
  image(video, 0, 0, width, height);
  fill(0, 63);
  noStroke();
  rectMode(CORNER);
  rect(0, 0, 400, 80);
  fill(255);
  textSize(12);
  textAlign(LEFT);
  text(status, 20, 20);
  //もしゲームモードだったら
  if(mode == 1){    
    //ゲームの更新と描画
    game.update();
    game.draw();
    //分析の結果でバーを動かす
    let speed = map(predictResult, 0.0, 1.0, -10, 10);
    game.bar.location.x += speed;
  }
}

function addImage(){
  regressor.addImage(slider.value());
}

function train(){
  regressor.train(function(lossValue) {
    if (lossValue) {
      loss = lossValue;
      status = 'Loss: ' + loss;
    } else {
      status = 'Done Training! Final Loss: ' + loss;
    }
  });
}

function predict(){
  regressor.predict(gotResults);
  mode = 1;
}

function modelReady() {
  status = 'MobileNet Loaded!';
}

function gotResults(err, result) {
  if (err) {
    console.error(err);
    status = err;
  }
  if (result && result.value) {
    predictResult = result.value;
    predict();
  }
}
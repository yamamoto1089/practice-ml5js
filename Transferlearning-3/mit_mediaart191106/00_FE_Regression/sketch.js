let featureExtractor;
let regressor; //classifierをregressorに
let video;
let loss;
let status = ''; //現在の状態を左上に表示
let showResult = ''; //クラス分け結果を中央に表示
let slider; //スライダー
let addImageButton, trainButton, predictButton; //ボタン

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  //特徴量抽出
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);  
  const options = { numLabels: 3 };
  //classificationからrecressionへ
  regressor = featureExtractor.regression(video);
  //スライダーを配置
  slider = createSlider(0.0, 1.0, 0.5, 0.01);
  slider.position(20, 40);
  //ボタンを配置
  addImageButton = createButton('add image');
  addImageButton.position(slider.x + slider.width + 20, 40);
  addImageButton.mousePressed(addImage);
  trainButton = createButton('train');
  trainButton.position(addImageButton.x + addImageButton.width + 5, 40);
  trainButton.mousePressed(train);
  predictButton = createButton('start predict');
  predictButton.position(trainButton.x + trainButton.width + 5, 40);
  predictButton.mousePressed(predict);
}

function draw(){
  background(0);
  //ビデオ映像をフルクスリーン表示
  image(video, 0, 0, width, height);
  //現在の状態(status)を表示
  fill(255);
  textSize(12);
  textAlign(LEFT);
  text(status, 20, 20);
  //回帰分析の結果を表示
  fill(255, 255, 0);
  textSize(100);
  textAlign(CENTER);
  text(showResult, width/2, height/2);
}

//画像を追加
function addImage(){
  regressor.addImage(slider.value());
}

//訓練開始
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

//回帰分析開始
function predict(){
  //結果が出たらgotResultsを実行
  regressor.predict(gotResults);
}

//モデルの読み込み完了
function modelReady() {
  status = 'MobileNet Loaded!';
}

//クラス分け開始
function classify() {
  classifier.classify(gotResults);
}

function gotResults(err, result) {
  //エラー表示
  if (err) {
    console.error(err);
    status = err;
  }
  //クラス分けした結果を表示
  if (result && result.value) {
    showResult = result.value;
    predict();
  }
}
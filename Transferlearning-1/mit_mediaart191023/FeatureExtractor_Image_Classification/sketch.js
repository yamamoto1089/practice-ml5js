/*
 *  メディアアートプログラミング
 *  転移学習の特徴抽出による画像のクラス分けサンプル
 *  2019.10.23
 */

let featureExtractor;
let classifier;
let video;
let loss;
let dogImages = 0;
let catImages = 0;
let badgerImages = 0;
let status = ''; //現在の状態を左上に表示
let result = ''; //クラス分け結果を中央に表示

function setup() {
  //キャンバスを画面全体に
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  //学習設定
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  const options = { numLabels: 3 };
  classifier = featureExtractor.classification(video, options);
}

function draw(){
  background(0);
  //ビデオ映像をフルクスリーン表示
  image(video, 0, 0, width, height);
  //学習させた画像の数を表示
  fill(255);
  textSize(12);
  textAlign(LEFT);
  text(status, 20, 20);
  text('Cat Images : ' + catImages, 20, 40);
  text('Dog Images : ' + dogImages, 20, 60);
  text('Badger Images : ' + badgerImages, 20, 80);
  //クラス分けした結果を表示
  fill(255, 255, 0);
  textSize(100);
  textAlign(CENTER);
  text(result, width/2, height/2);
}

//ボタン操作からキー操作へ変更
function keyTyped() {
  if(key == 'a'){
    classifier.addImage('cat');
    catImages++;  
  }
  if(key == 's'){
    classifier.addImage('dog');
    dogImages++;
  }
  if (key == 'd'){
    classifier.addImage('badger');
    badgerImages++;
  }
  if (key == 'f') {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        status = 'Loss: ' + loss;
      } else {
        status = 'Done Training! Final Loss: ' + loss;
      }
    });
  }
  if (key == 'g') {
    classify();
  }
}

//モデルの読み込み完了
function modelReady() {
  status = 'MobileNet Loaded!';
}

//クラス分け開始
function classify() {
  classifier.classify(gotResults);
}

function gotResults(err, results) {
  //エラー表示
  if (err) {
    console.error(err);
    status = err;
  }
  //クラス分けした結果を表示
  if (results && results[0]) {
    result = results[0].label;
    classify();
  }
}
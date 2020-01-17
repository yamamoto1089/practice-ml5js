//クラス分類器
let classifier; 
//確度の閾値を設定
const options = { probabilityThreshold: 0.7 };
//画面に表示する文字列
let status;
//円の座標
let x;
let y;
let speed;

function preload() {
  //学習データ(Speech Command 18W)を読み込み
  classifier = ml5.soundClassifier('SpeechCommands18w', options);
}

function setup() {
  //キャンバス設定
  createCanvas(windowWidth, windowHeight);
  status = 'Ready';
  //円の初期位置
  x = width/2;
  y = height/2;
  //円のスピード
  speed = 5;
  //分析開始
  classifier.classify(gotResult);
}

function draw(){
  //円の座標を更新
  if(status == 'up'){
    y -= speed;
    //はみ出た時の処理
    if(y < 0){
      y = height;
    }
  }
  if(status == 'down'){
    y += speed;
    if(y > height){
      y = 0;
    }
  }
  if(status == 'left'){
    x -= speed;
    if(x < 0){
      x = width;
    }
  }
  if(status == 'right'){
    x += speed;
    if(x > width){
      x = 0;
    }
  }
  background(190);
  //円を表示
  fill(255, 127, 31);
  ellipse(x, y, 50);
  //分析結果をテキストで表示
  fill(31, 127, 255);
  textSize(60);
  textAlign(CENTER);
  text(status, width/2, height/2);
}

function gotResult(error, results) {
  //エラー処理
  if (error) {
    console.error(error);
  }
  //分析結果を更新
  console.log(results);
  status = results[0].label;
}

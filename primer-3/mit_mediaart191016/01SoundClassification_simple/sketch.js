//クラス分類器
let classifier; 
//確度の閾値を設定
const options = { probabilityThreshold: 0.7 };
//画面に表示する文字列
let status;

function preload() {
  //学習データ(Speech Command 18W)を読み込み
  classifier = ml5.soundClassifier('SpeechCommands18w', options);
}

function setup() {
  //キャンバス設定
  createCanvas(windowWidth, windowHeight);
  status = 'Ready';
  //分析開始
  classifier.classify(gotResult);
}

function draw(){
  //分析結果をテキストで表示
  background(190);
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

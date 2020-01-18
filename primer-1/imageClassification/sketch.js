let imageFile = 'images/beer.jpg';//画像ファイル名
let classifier; //画像分類器
let img; //画像
let status = ''; //表示テキスト
let numClass = 40; //分類する数

function preload() {
  //モデルを読み込み
  classifier = ml5.imageClassifier('MobileNet');
  //画像を読み込み
  img = loadImage(imageFile);
}

function setup() {
  //p5jsキャンバス生成
  createCanvas(windowWidth, windowHeight);
  //画像の分類開始
  classifier.classify(img, numClass, gotResult);
  status = '画像分類中...';
}

function draw() {
  //画像を表示
  image(img, 0, 0, width, height);
  //分析結果をテキストで表示
  fill(255, 255, 127);
  textSize(12);
  text(status, 20, 20);
}

// 解析結果の出力
function gotResult(err, results) {
  // エラー処理
  if (err) {
    console.error(err);
    status = err;
  }
  status = '';
  for(let i = 0; i < results.length; i++){
    // 結果を出力
    status +=
        'ラベル: ' + results[i].label
        + ', 確度: ' + results[i].confidence + '\n';
  }
}
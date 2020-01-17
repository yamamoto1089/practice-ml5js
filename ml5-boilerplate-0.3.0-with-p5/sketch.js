// Your code will go here
// open up your console - if everything loaded properly you should see 0.3.0
console.log('ml5 version:', ml5.version);

function setup(){
    createCanvas(400, 400);
}

function draw(){
    background(200);

}

let imageFile = 'images/beer.jpg'; //画像ファイル名 let classifier; //画像分類器
let img; //画像
let status = ''; //表示テキスト
function preload() { //画像を読み込み
img = loadImage(imageFile); //モデルを読み込み
}
function setup() {
//p5jsキャンバス生成 createCanvas(windowWidth, windowHeight); status = '画像分類中...'; //画像の分類開始
}
function draw() {
//画像を表示
image(img, 0, 0, width, height); //分析結果をテキストで表示
fill(255, 255, 127);
  textSize(18);
  text(status, 20, 30);
}
// 解析結果の出力
function gotResult(err, results) { // エラー処理
    if (err) {
    console.error(err); status = err;
    }
    // 結果を出力
}
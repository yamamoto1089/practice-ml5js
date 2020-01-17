let tennis;

function setup(){
  createCanvas(windowWidth, windowHeight);
  frameRate(60)
  //ゲーム初期化
  tennis = new TennisGame();
}

function draw() {
  background(0);
  //ゲームの更新と表示
  tennis.update();
  tennis.draw();
  //キー操作でbarを左右に
  if(keyIsPressed && keyCode === LEFT_ARROW){
    tennis.bar.location.x -= 10;
  }
  if(keyIsPressed && keyCode === RIGHT_ARROW){
    tennis.bar.location.x += 10;
  }
}

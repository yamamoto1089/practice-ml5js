class TennisGame {
  constructor(){
    this.ball = new Ball();
    this.bar = new Bar();
    this.score = 0;        
  }
  update(){
    this.ball.update();
    // バーでバウンド
    if (this.ball.location.y > height - 50) {
      if (abs(this.bar.location.x - this.ball.location.x) < 150) {
        this.ball.velocity.y *= -1.0;
        this.ball.velocity.mult(1.2);
        this.score += 100;
      } else {
        this.initGame();
      }
    }
  }
  draw(){
    fill(255);
    this.ball.draw();
    this.bar.draw();
    textSize(40);
    text(this.score, 20, 60);
  }
  initGame() {
    // リセット
    this.score = 0;
    this.ball.location.set(width / 2, 40);
    this.ball.velocity = createVector(random(-2, 2), 2);
    this.bar.location.x = width / 2;
  }
}

class Ball {
  constructor() {
    this.location = createVector(width / 2, 40);
    this.velocity = createVector(random(-2, 2), 2);        
  }
  update() {
    this.location.add(this.velocity);
    // 壁でバウンド
    if (this.location.x < 0 || this.location.x > width) {
      this.velocity.x *= -1;
    }
    if (this.location.y < 0) {
      this.velocity.y *= -1;
    }
  }
  draw() {
    fill(255);
    noStroke();
    ellipse(this.location.x, this.location.y, 10, 10);
  }
}

class Bar {
  constructor() {
    this.location = createVector(width / 2, height - 50);
    this.speed = 10;
  }
  draw() {
    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(this.location.x, this.location.y, 300, 20);
  }
  moveLeft(){
    this.location.x -= this.speed;
  }
  moveRight(){
    this.location.x += this.speed;
  }
}
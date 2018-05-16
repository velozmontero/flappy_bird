class Score {
  constructor(bird, pipes, c, ctx) {
    this.score = 0;
    this.bird = bird;
    this.pipes = pipes;

    this.c = c;
    this.ctx = ctx;
  }

  update() {
    this.pipes.forEach(pipe => {
      if (this.bird.x > pipe.xpos + pipe.width && !pipe.passed) {
        console.log('passed pipe');
        pipe.passed = true;
        this.score += 0.5;
      }
    });
  }

  render() {
    this.ctx.save();
    this.ctx.font = '30px Verdana';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`SCORE: ${this.score}`, 10, 50);
    this.ctx.restore();
  }
}
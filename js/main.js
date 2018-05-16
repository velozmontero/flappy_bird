
window.onload = function(){
  const c = document.getElementById('canvas');
  c.width = window.innerWidth;
  c.height = window.innerHeight;

  const ctx = c.getContext('2d');

  const environment = new Environment(c, ctx);
  const bird = new Bird(250, 300, ctx, c);
  const pipes = [];

  let pipeSet = generateRandomPipes(ctx, c.width, c.height);
  pipes.push(pipeSet.top, pipeSet.bottom);

  setInterval(function(){
    let pipeSet = generateRandomPipes(ctx, c.width, c.height);
    pipes.push(pipeSet.top, pipeSet.bottom);
  }, 2600);

  const score = new Score(bird, pipes, c, ctx);

  gameLoop();

  /*
  MAIN GAME LOOP
  */
  function gameLoop(){

    environment.update();
    environment.render();

    pipes.forEach(function(pipe, index){
      if (pipe.xpos + pipe.width < 0) {
        pipes.splice(index, 1);
      }
      pipe.update();
      pipe.render();
    });

    bird.update(pipes);
    bird.render();

    score.update();
    score.render();

    if (bird.dead){
      drawGameOver(ctx, c);
    }

    console.log('pipes ', pipes);

    if (!bird.dead) {
      window.requestAnimationFrame(gameLoop);
    }
  }
};

function generateRandomPipes(ctx, canvasWidth, canvasHeight){
  let lengthTop = Math.round(Math.random() * 400 + 50);
  let lengthBottom = canvasHeight - 400 - lengthTop;
  let returnVal = { };
  returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, ctx);
  returnVal.bottom = new Pipe(canvasWidth, canvasHeight+5-lengthBottom, lengthBottom, 4, ctx);
  return returnVal;
}


function drawGameOver(ctx, c){
  ctx.font="30px Verdana";
  ctx.textAlign="center";
  ctx.fillText("Game Over!!", c.width/2 , c.height/2);
}

// Simple Snake game
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('highScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
const mobileControls = document.getElementById('mobileControls');

const tileCount = 20; // grid 20x20
let tileSize = canvas.width / tileCount;

let snake = [];
let velocity = { x: 0, y: 0 };
let nextVelocity = { x: 0, y: 0 };
let food = {};
let gameInterval = null;
let speed = 8; // frames per second
let score = 0;
let highScore = parseInt(localStorage.getItem('snakeHighScore') || '0', 10);
let running = false;
let paused = false;
let gameOver = false;

highScoreEl.textContent = highScore;

function resetGame() {
  snake = [{ x: 9, y: 9 }, { x: 8, y: 9 }, { x: 7, y: 9 }];
  velocity = { x: 0, y: 0 };
  nextVelocity = { x: 0, y: 0 };
  score = 0;
  scoreEl.textContent = score;
  gameOver = false;
  paused = false;
  placeFood();
}

function placeFood() {
  while (true) {
    const x = Math.floor(Math.random() * tileCount);
    const y = Math.floor(Math.random() * tileCount);
    if (!snake.some(s => s.x === x && s.y === y)) {
      food = { x, y };
      break;
    }
  }
}

function draw() {
  // adapt tile size in case canvas is resized via CSS
  tileSize = canvas.width / tileCount;

  // background
  ctx.fillStyle = '#031122';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw grid (optional subtle)
  /*
  ctx.strokeStyle = 'rgba(255,255,255,0.02)';
  for (let i=0;i<=tileCount;i++){
    ctx.beginPath();
    ctx.moveTo(i*tileSize,0);
    ctx.lineTo(i*tileSize,canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0,i*tileSize);
    ctx.lineTo(canvas.width,i*tileSize);
    ctx.stroke();
  }
  */

  // draw food
  ctx.fillStyle = '#fb7185';
  drawCell(food.x, food.y, () => {
    // circle
    const cx = (food.x + 0.5) * tileSize;
    const cy = (food.y + 0.5) * tileSize;
    const r = tileSize * 0.35;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  });

  // draw snake
  for (let i = 0; i < snake.length; i++) {
    const s = snake[i];
    const shade = i === 0 ? '#4ade80' : '#16a34a';
    ctx.fillStyle = shade;
    // rounded rectangle look
    const x = s.x * tileSize + 1;
    const y = s.y * tileSize + 1;
    const w = tileSize - 2;
    const h = tileSize - 2;
    roundRect(ctx, x, y, w, h, Math.max(2, tileSize * 0.12), true, false);
  }

  // if game over overlay
  if (gameOver) {
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = `${Math.floor(canvas.width / 12)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = `${Math.floor(canvas.width / 20)}px sans-serif`;
    ctx.fillText('Press Restart to try again', canvas.width / 2, canvas.height / 2 + 26);
  }

  if (!running && !gameOver) {
    ctx.fillStyle = 'rgba(255,255,255,0.03)';
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
    ctx.fillStyle = '#cfe9ff';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Press Start (or use Arrow/WASD) to begin', canvas.width / 2, canvas.height - 14);
  }
}

function drawCell(x, y, callback) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x * tileSize, y * tileSize, tileSize, tileSize);
  ctx.clip();
  if (callback) callback();
  ctx.restore();
}

function roundRect(ctx, x, y, w, h, r, fill, stroke) {
  if (r === undefined) r = 5;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function update() {
  if (paused || gameOver) {
    draw();
    return;
  }

  // apply queued velocity (prevents immediate reverse)
  if (nextVelocity.x !== 0 || nextVelocity.y !== 0) {
    // prevent reversing directly into itself when snake length > 1
    if (snake.length === 1 ||
      !(nextVelocity.x === -velocity.x && nextVelocity.y === -velocity.y)) {
      velocity = { ...nextVelocity };
    }
    nextVelocity = { x: 0, y: 0 };
  }

  // not started yet
  if (velocity.x === 0 && velocity.y === 0) {
    draw();
    return;
  }

  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };

  // wall collision (game over)
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    endGame();
    draw();
    return;
  }

  // self collision
  if (snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
    endGame();
    draw();
    return;
  }

  snake.unshift(head);

  // eat food?
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = score;
    placeFood();
    if (score > highScore) {
      highScore = score;
      highScoreEl.textContent = highScore;
      localStorage.setItem('snakeHighScore', highScore);
    }
  } else {
    snake.pop();
  }

  draw();
}

function endGame() {
  gameOver = true;
  running = false;
  clearInterval(gameInterval);
  gameInterval = null;
}

function startLoop() {
  if (gameInterval) clearInterval(gameInterval);
  const ms = 1000 / speed;
  gameInterval = setInterval(update, ms);
}

function startGame() {
  if (gameOver) {
    resetGame();
  }
  if (!running) {
    running = true;
    paused = false;
    // if velocity is zero, start moving right by default
    if (velocity.x === 0 && velocity.y === 0) {
      velocity = { x: 1, y: 0 };
    }
    startLoop();
  }
}

function pauseGame() {
  if (gameOver) return;
  paused = !paused;
  pauseBtn.textContent = paused ? 'Resume' : 'Pause';
}

function restart() {
  clearInterval(gameInterval);
  gameInterval = null;
  running = false;
  resetGame();
  draw();
}

window.addEventListener('keydown', (e) => {
  const key = e.key;
  if (key === 'ArrowUp' || key === 'w' || key === 'W') {
    queueDir(0, -1);
  } else if (key === 'ArrowDown' || key === 's' || key === 'S') {
    queueDir(0, 1);
  } else if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
    queueDir(-1, 0);
  } else if (key === 'ArrowRight' || key === 'd' || key === 'D') {
    queueDir(1, 0);
  } else if (key === ' ' || key === 'Spacebar') {
    // space to start/pause
    if (!running) startGame();
    else pauseGame();
  } else if (key === 'r' || key === 'R') {
    restart();
  }
});

function queueDir(x, y) {
  // queue new direction (applied at next tick) to avoid double-changes in single frame
  // prevent reversing into itself
  if (snake.length > 1 && x === -velocity.x && y === -velocity.y) return;
  nextVelocity = { x, y };
  // if not running, start immediately on first input
  if (!running && !gameOver) startGame();
}

startBtn.addEventListener('click', () => startGame());
pauseBtn.addEventListener('click', () => pauseGame());
restartBtn.addEventListener('click', () => restart());

// mobile control buttons
mobileControls.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('pointerdown', (e) => {
    const dir = btn.getAttribute('data-dir');
    if (dir === 'up') queueDir(0, -1);
    if (dir === 'down') queueDir(0, 1);
    if (dir === 'left') queueDir(-1, 0);
    if (dir === 'right') queueDir(1, 0);
  });
});

function init() {
  resetGame();
  draw();
  // make mobile controls visible if touchscreen
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    mobileControls.setAttribute('aria-hidden', 'false');
    mobileControls.style.display = 'flex';
  }
}

init();
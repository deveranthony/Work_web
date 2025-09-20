import React, { useEffect, useRef, useState } from "react";

const canvasSize = 400;
const gridSize = 20;
const tileCount = canvasSize / gridSize;

type Point = { x: number; y: number };

const getRandomPoint = (): Point => ({
  x: Math.floor(Math.random() * tileCount),
  y: Math.floor(Math.random() * tileCount),
});

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState<Point>({ x: 1, y: 0 });
  const [food, setFood] = useState<Point>(getRandomPoint());
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Game loop
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = { x: prev[0].x + direction.x, y: prev[0].y + direction.y };

        // Collision with wall or self
        if (
          head.x < 0 ||
          head.y < 0 ||
          head.x >= tileCount ||
          head.y >= tileCount ||
          prev.some((p) => p.x === head.x && p.y === head.y)
        ) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [head, ...prev];

        // Eating food
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 1);
          setFood(getRandomPoint());
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [direction, food, gameOver]);

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    // Draw snake
    ctx.fillStyle = "lime";
    for (const part of snake) {
      ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    }
  }, [snake, food]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameOver) return;
      if (e.key === "ArrowUp" && direction.y !== 1) setDirection({ x: 0, y: -1 });
      else if (e.key === "ArrowDown" && direction.y !== -1) setDirection({ x: 0, y: 1 });
      else if (e.key === "ArrowLeft" && direction.x !== 1) setDirection({ x: -1, y: 0 });
      else if (e.key === "ArrowRight" && direction.x !== -1) setDirection({ x: 1, y: 0 });
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction, gameOver]);

  const handleRestart = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setFood(getRandomPoint());
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="container">
      <h1>Snake Game</h1>
      <canvas ref={canvasRef} width={canvasSize} height={canvasSize} />
      <div>Score: {score}</div>
      {gameOver && (
        <div>
          <h2>Game Over!</h2>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default App;
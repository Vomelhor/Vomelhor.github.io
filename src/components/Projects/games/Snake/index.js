import { useEffect, useRef, useState, useCallback } from 'react';
import './index.scss';

const GRID = 20;
const CELL = 20;
const INITIAL_SPEED = 140;
const W = GRID * CELL;

const randomFood = (snake) => {
  while (true) {
    const pos = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
    if (!snake.some((s) => s.x === pos.x && s.y === pos.y)) return pos;
  }
};

const eyeOffsets = (dir) => {
  if (dir.x === 1)  return [{ dx:  5, dy: -4 }, { dx:  5, dy:  4 }];
  if (dir.x === -1) return [{ dx: -5, dy: -4 }, { dx: -5, dy:  4 }];
  if (dir.y === -1) return [{ dx: -4, dy: -5 }, { dx:  4, dy: -5 }];
  return                    [{ dx: -4, dy:  5 }, { dx:  4, dy:  5 }];
};

const Snake = () => {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const rafRef = useRef(null);
  const lastTickRef = useRef(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState('idle');

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !stateRef.current) return;
    const ctx = canvas.getContext('2d');
    const { snake, food, dir } = stateRef.current;

    // Background
    ctx.fillStyle = '#0d0d14';
    ctx.fillRect(0, 0, W, W);

    // Dot grid
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    for (let x = 0; x <= GRID; x++) {
      for (let y = 0; y <= GRID; y++) {
        ctx.beginPath();
        ctx.arc(x * CELL, y * CELL, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Food glow
    const fx = food.x * CELL + CELL / 2;
    const fy = food.y * CELL + CELL / 2;
    const glow = ctx.createRadialGradient(fx, fy, 0, fx, fy, CELL);
    glow.addColorStop(0,   'rgba(192,132,252,0.55)');
    glow.addColorStop(0.5, 'rgba(137,66,249,0.25)');
    glow.addColorStop(1,   'rgba(137,66,249,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(food.x * CELL - CELL * 0.5, food.y * CELL - CELL * 0.5, CELL * 2, CELL * 2);

    // Food dot
    ctx.fillStyle = '#c084fc';
    ctx.beginPath();
    ctx.arc(fx, fy, CELL * 0.32, 0, Math.PI * 2);
    ctx.fill();

    // Snake body (tail → neck, skip head)
    for (let i = snake.length - 1; i >= 1; i--) {
      const t = i / snake.length;
      const r = Math.round(80 + (124 - 80) * (1 - t));
      const g = Math.round(30 + (66 - 30) * (1 - t));
      const b = Math.round(140 + (249 - 140) * (1 - t));
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.beginPath();
      ctx.roundRect(snake[i].x * CELL + 2, snake[i].y * CELL + 2, CELL - 4, CELL - 4, 4);
      ctx.fill();
    }

    // Head with glow
    const head = snake[0];
    ctx.shadowBlur = 14;
    ctx.shadowColor = '#c084fc';
    ctx.fillStyle = '#e9d5ff';
    ctx.beginPath();
    ctx.roundRect(head.x * CELL + 1, head.y * CELL + 1, CELL - 2, CELL - 2, 5);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Eyes
    const hcx = head.x * CELL + CELL / 2;
    const hcy = head.y * CELL + CELL / 2;
    ctx.fillStyle = '#1a0d2e';
    eyeOffsets(dir).forEach(({ dx, dy }) => {
      ctx.beginPath();
      ctx.arc(hcx + dx, hcy + dy, 2.2, 0, Math.PI * 2);
      ctx.fill();
    });
  }, []);

  const start = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    stateRef.current = {
      snake: initialSnake,
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: randomFood(initialSnake),
      score: 0,
      speed: INITIAL_SPEED,
    };
    lastTickRef.current = 0;
    setScore(0);
    setPhase('running');
  }, []);

  useEffect(() => {
    if (phase !== 'running') return;

    const onKey = (e) => {
      const s = stateRef.current;
      if (!s) return;
      const dirs = {
        ArrowUp: { x: 0, y: -1 }, w: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 }, s: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, a: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }, d: { x: 1, y: 0 },
      };
      const d = dirs[e.key];
      if (!d) return;
      e.preventDefault();
      if (d.x !== -s.dir.x || d.y !== -s.dir.y) s.nextDir = d;
    };
    window.addEventListener('keydown', onKey);

    const loop = (ts) => {
      const s = stateRef.current;
      if (!s) return;
      if (ts - lastTickRef.current >= s.speed) {
        lastTickRef.current = ts;
        s.dir = s.nextDir;
        const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };

        if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID ||
          s.snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
          setPhase('dead');
          return;
        }

        s.snake.unshift(head);
        if (head.x === s.food.x && head.y === s.food.y) {
          s.score += 10;
          s.speed = Math.max(70, s.speed - 2);
          s.food = randomFood(s.snake);
          setScore(s.score);
        } else {
          s.snake.pop();
        }
      }
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('keydown', onKey);
    };
  }, [phase, draw]);

  return (
    <div className='snake-game'>
      <div className='snake-score'>Score: {score}</div>
      <div className='snake-wrap'>
        <canvas ref={canvasRef} width={W} height={W} />
        {phase !== 'running' && (
          <div className='snake-overlay' onClick={start}>
            {phase === 'dead' && <p className='snake-result'>Game over — {score} pts</p>}
            <p className='snake-cta'>{phase === 'dead' ? 'Click to restart' : 'Click to play'}</p>
            {phase === 'idle' && <p className='snake-hint'>Arrow keys or WASD to move</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Snake;

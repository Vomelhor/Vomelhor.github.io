import { useEffect, useRef, useState, useCallback } from 'react';
import './index.scss';

const GRID = 18;
const CELL = 20;
const INITIAL_SPEED = 140;

const randomFood = (snake) => {
  let pos;
  do {
    pos = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
  return pos;
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
    const { snake, food } = stateRef.current;

    ctx.fillStyle = '#111118';
    ctx.fillRect(0, 0, GRID * CELL, GRID * CELL);

    ctx.fillStyle = '#8942f9';
    ctx.beginPath();
    ctx.roundRect(food.x * CELL + 3, food.y * CELL + 3, CELL - 6, CELL - 6, 4);
    ctx.fill();

    snake.forEach((seg, i) => {
      ctx.fillStyle = i === 0 ? '#c084fc' : '#7c3aed';
      ctx.beginPath();
      ctx.roundRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2, 3);
      ctx.fill();
    });
  }, []);

  const start = useCallback(() => {
    const initialSnake = [{ x: 9, y: 9 }, { x: 8, y: 9 }, { x: 7, y: 9 }];
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
          s.speed = Math.max(75, s.speed - 2);
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
        <canvas ref={canvasRef} width={GRID * CELL} height={GRID * CELL} />
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

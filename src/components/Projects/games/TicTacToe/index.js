import { useState } from 'react';
import './index.scss';

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const checkResult = (board) => {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return null;
};

const aiMove = (board) => {
  const empty = board.map((v, i) => (v === null ? i : null)).filter((v) => v !== null);
  for (const i of empty) {
    const b = [...board]; b[i] = 'O';
    if (checkResult(b)) return i;
  }
  for (const i of empty) {
    const b = [...board]; b[i] = 'X';
    if (checkResult(b)) return i;
  }
  if (board[4] === null) return 4;
  for (const c of [0, 2, 6, 8]) if (board[c] === null) return c;
  return empty[0];
};

const EMPTY = Array(9).fill(null);

const TicTacToe = () => {
  const [board, setBoard] = useState(EMPTY);
  const [xTurn, setXTurn] = useState(true);
  const [winResult, setWinResult] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const isDraw = !winResult && board.every(Boolean);

  const handleClick = (i) => {
    if (board[i] || winResult || !xTurn || waiting) return;

    const next = [...board];
    next[i] = 'X';
    const res = checkResult(next);
    setBoard(next);
    if (res) { setWinResult(res); return; }
    if (next.every(Boolean)) return;

    setXTurn(false);
    setWaiting(true);
    setTimeout(() => {
      const idx = aiMove(next);
      const aiBoard = [...next];
      aiBoard[idx] = 'O';
      const aiRes = checkResult(aiBoard);
      setBoard(aiBoard);
      if (aiRes) setWinResult(aiRes);
      setXTurn(true);
      setWaiting(false);
    }, 350);
  };

  const reset = () => {
    setBoard(EMPTY);
    setXTurn(true);
    setWinResult(null);
    setWaiting(false);
  };

  const status = winResult
    ? winResult.winner === 'X' ? 'You win!' : 'AI wins!'
    : isDraw ? "Draw!"
    : xTurn ? 'Your turn (X)' : 'AI thinking…';

  return (
    <div className='ttt-game'>
      <p className='ttt-status'>{status}</p>
      <div className='ttt-board'>
        {board.map((cell, i) => (
          <button
            key={i}
            className={[
              'ttt-cell',
              cell ? `ttt-${cell.toLowerCase()}` : '',
              winResult?.line?.includes(i) ? 'ttt-win' : '',
            ].join(' ')}
            onClick={() => handleClick(i)}
          >
            {cell}
          </button>
        ))}
      </div>
      <button className='ttt-reset' onClick={reset}>New Game</button>
    </div>
  );
};

export default TicTacToe;

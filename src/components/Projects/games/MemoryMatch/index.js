import { useState } from 'react';
import './index.scss';

const SYMBOLS = ['🦊', '🐸', '🦋', '🐙', '🦄', '🎯', '🚀', '⚡'];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const createDeck = () =>
  shuffle([...SYMBOLS, ...SYMBOLS]).map((sym, i) => ({
    id: i,
    sym,
    flipped: false,
    matched: false,
  }));

const MemoryMatch = () => {
  const [cards, setCards] = useState(createDeck);
  const [open, setOpen] = useState([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const allMatched = cards.every((c) => c.matched);

  const handleFlip = (idx) => {
    if (locked || cards[idx].flipped || cards[idx].matched || open.length === 2) return;

    const next = cards.map((c, i) => (i === idx ? { ...c, flipped: true } : c));
    const newOpen = [...open, idx];
    setCards(next);
    setOpen(newOpen);

    if (newOpen.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newOpen;
      if (next[a].sym === next[b].sym) {
        setCards(next.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c)));
        setOpen([]);
      } else {
        setLocked(true);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) => (i === a || i === b ? { ...c, flipped: false } : c))
          );
          setOpen([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  const reset = () => {
    setCards(createDeck());
    setOpen([]);
    setMoves(0);
    setLocked(false);
  };

  return (
    <div className='memory-game'>
      <div className='memory-header'>
        <span>Moves: {moves}</span>
        {allMatched && <span className='memory-won'>Cleared in {moves} moves!</span>}
      </div>
      <div className='memory-grid'>
        {cards.map((card, idx) => (
          <button
            key={card.id}
            className={`memory-card ${card.flipped || card.matched ? 'is-flipped' : ''} ${card.matched ? 'is-matched' : ''}`}
            onClick={() => handleFlip(idx)}
            aria-label='card'
          >
            <span className='card-inner'>
              <span className='card-front'>{card.sym}</span>
              <span className='card-back'>?</span>
            </span>
          </button>
        ))}
      </div>
      <button className='memory-reset' onClick={reset}>New Game</button>
    </div>
  );
};

export default MemoryMatch;

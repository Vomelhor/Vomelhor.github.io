import React, { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import AnimatedLetters from '../AnimatedLetters';
import Snake from './games/Snake';
import TicTacToe from './games/TicTacToe';
import MemoryMatch from './games/MemoryMatch';
import './index.scss';

const GAMES = [
  {
    id: 'snake',
    title: 'Snake',
    emoji: '🐍',
    banner: 'banner-snake',
    description: 'Classic snake. Arrow keys or WASD. See how long you last.',
    component: Snake,
  },
  {
    id: 'ttt',
    title: 'Tic-Tac-Toe',
    emoji: '✖',
    banner: 'banner-ttt',
    description: "You're X. The AI is O. It has a strategy. Do you?",
    component: TicTacToe,
  },
  {
    id: 'memory',
    title: 'Memory Match',
    emoji: '🃏',
    banner: 'banner-memory',
    description: '8 pairs hidden across 16 cards. Flip, remember, match.',
    component: MemoryMatch,
  },
];

function Projects() {
  const [letterClass, setLetterClass] = useState('text-animate');
  const [activeGame, setActiveGame] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLetterClass('text-animate-hover'), 3000);
    return () => clearTimeout(t);
  }, []);

  const toggleGame = (id) => setActiveGame((prev) => (prev === id ? null : id));

  return (
    <>
      <div className='container projects-page'>
        <h1 className='page-title'>
          <AnimatedLetters letterClass={letterClass} strArray={'Projects'.split('')} idx={15} />
        </h1>

        <div className='projects-disclaimer'>
          <p>
            Most of my work lives behind private repos and the ever-present threat of an NDA. So
            instead of screenshots of dashboards nobody can log into, I built three games — entirely
            in <strong>TypeScript</strong> and <strong>React</strong>, zero game libraries.
          </p>
          <p>
            If I can make a snake pathfind its own death, an AI block your Tic-Tac-Toe moves, and
            flip memory cards without peeking — I'm confident I can also wrangle your{' '}
            <strong>Node.js</strong> APIs, tame a <strong>PostgreSQL</strong> schema, containerise
            it all in <strong>Docker</strong>, and ship it on <strong>AWS</strong>. Consider this my
            interactive cover letter.
          </p>
        </div>

        <div className='games-grid'>
          {GAMES.map(({ id, title, emoji, banner, description, component: GameComponent }) => (
            <div key={id} className={`game-card ${activeGame === id ? 'is-open' : ''}`}>
              <div className={`game-banner ${banner}`}>
                <span className='game-emoji'>{emoji}</span>
              </div>
              <div className='game-card-header'>
                <h3 className='game-title'>{title}</h3>
                <p className='game-desc'>{description}</p>
                <button className='game-btn' onClick={() => toggleGame(id)}>
                  {activeGame === id ? 'CLOSE' : 'PLAY'}
                </button>
              </div>
              {activeGame === id && (
                <div className='game-content'>
                  <GameComponent />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Loader type='pacman' />
    </>
  );
}

export default Projects;

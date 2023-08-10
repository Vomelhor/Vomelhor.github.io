import React, { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import AnimatedLetters from '../AnimatedLetters';
import './index.scss';

function Projects() {
  const [letterClass, setLetterClass] = useState('text-animate');

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);
  }, []);
  return (
    <>
      <div className='container projects-page'>
        <h1 className='page-title'>
          <AnimatedLetters
            letterClass={letterClass}
            strArray={'Projects'.split('')} 
            idx={15}
          />
        </h1>
      </div>
      <Loader type='pacman' />
    </>
  )
}

export default Projects;
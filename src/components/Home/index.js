import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoTitle from '../../assets/images/logo-v.png';
import AnimatedLetters from '../AnimatedLetters';
import Logo from './Logo';
import './index.scss';

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate');
  const helloArray = ['H', 'e', 'l', 'l', 'o', ' ', 'W', 'o', 'r', 'l', 'd', ','];
  const nameArray = ['i', 't', 'o', 'r'];
  const jobArray = ['W', 'e', 'b', ' ', 'D', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r', '.'];

  useEffect(() => {
    setTimeout(() => {
      return setLetterClass('text-animate-hover')
    }, 4000)
  }, [])

  return (
    <div className="container home-page">
      <div className="text-zone">
        <h1>
          <AnimatedLetters letterClass={letterClass} strArray={helloArray} idx={1} />
          <br />
          <span className={`${letterClass} _13`}>I</span>
          <span className={`${letterClass} _14`}>'m</span>
          <img src={LogoTitle} alt='V' />
          <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15} />
          <br />
          <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={19} />
        </h1>
        <h2>Front-End Web Developer | HTML | CSS | JavaScript | React | SQL | Jest</h2>
        <Link to='/contact' className='flat-button'>CONTACT ME</Link>
      </div>
      <Logo />
    </div>
  );
};

export default Home;
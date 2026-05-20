import './index.scss';
import AnimatedLetters from '../AnimatedLetters';
import { useEffect, useState } from 'react';
import foto1 from '../../assets/images/foto1.jpg';
import foto2 from '../../assets/images/foto2.jpg';
import foto3 from '../../assets/images/foto3.jpeg';
import foto4 from '../../assets/images/foto4.jpg';
import foto5 from '../../assets/images/foto5.jpeg';
import foto6 from '../../assets/images/foto6.jpeg';
import Loader from 'react-loaders';
import { Link } from 'react-router-dom';

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate');

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover');
    }, 3000);
  }, []);

  return (
    <>
      <div className='container about-page'>
        <div className='text-zone'>
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            Technology has fascinated me since childhood — growing up on a remote farm with a dial-up connection and big ambitions. That early curiosity turned into a career building full-stack applications that actually work: clean APIs, solid databases, and frontends people enjoy using. I write TypeScript on both sides of the stack, reach for React when the UI needs it, and reach for Node.js when it doesn't.
          </p>
          <p>
            Moving to England at 14 taught me to adapt fast and communicate clearly — skills that turn out to matter just as much in engineering as they do anywhere else. Today I design and ship systems end-to-end: from schema design in PostgreSQL to containerised services in Docker to infrastructure on AWS. I care about reliability and the kind of code a future teammate won't curse you for.
          </p>
          <p>
            I'm always looking for interesting problems to work on and people who take craft seriously. If that sounds like your team, let's talk — check out the <Link to='/contact'>contact</Link> page and reach out.
          </p>
        </div>
        <div className='stage-cube-cont'>
          <div className='cubespinner'>
            <div className='face1'>
              <img src={foto1} alt='foto1' />
            </div>
            <div className='face2'>
              <img src={foto2} alt='foto2' />
            </div>
            <div className='face3'>
              <img src={foto3} alt='foto3' />
            </div>
            <div className='face4'>
              <img src={foto4} alt='foto4' />
            </div>
            <div className='face5'>
              <img src={foto5} alt='foto5' />
            </div>
            <div className='face6'>
              <img src={foto6} alt='foto6' />
            </div>
          </div>
        </div>
      </div>
      <Loader type='pacman' />
    </>
  )
}

export default About;
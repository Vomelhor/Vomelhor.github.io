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
            Since childhood, technology has been my constant fascination, igniting my imagination and making the impossible feel attainable. Growing up on a remote farm, far from worldly luxuries, only fueled my determination to explore, connect, and embrace new cultures. Web development became the perfect path to combine my passions, allowing me to chase my dreams while doing what I love.
          </p>
          <p>
            Living in England at 14 was a transformative experience that taught me resilience and adaptability. Overcoming cultural barriers and learning a new language showed me the power of perseverance and the boundless potential of continuous self-improvement. Today, armed with strong people skills, empathy, and an eye for perfection, I find fulfillment in crafting seamless digital experiences that enhance people's lives.
          </p>
          <p>
            In conclusion, my journey has been driven by an unwavering passion for technology and a commitment to excellence. As a skilled web developer, I am eager to contribute my unique blend of creativity, adaptability, and dedication to your projects. Let's connect and explore how I can bring my skills and enthusiasm to elevate your team and create exceptional digital experiences. Reach out to me through the <Link to='/contact'>contact</Link> details on this portfolio, and together, let's turn your vision into reality, making a meaningful impact in the world of technology.
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
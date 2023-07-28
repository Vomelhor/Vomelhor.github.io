import './index.scss';
import Rocket from '../../../assets/images/rocket.png';

const RocketAnimation = () => {

  return (
    <div className="rocket-container">
      <img id='rocket1' src={Rocket} alt='rocket' />
      <img id='rocket3' src={Rocket} alt='rocket' />
      <img id='rocket5' src={Rocket} alt='rocket' />
      <img id='rocket7' src={Rocket} alt='rocket' />
      <img id='rocket9' src={Rocket} alt='rocket' />
    </div>
  );
};

export default RocketAnimation;

import { motion } from 'framer-motion';
import './Marquee.css';

const Marquee = ({ text, direction = 'left', speed = 20 }) => {
  return (
    <div className="marquee-container">
      <motion.div 
        className="marquee-track"
        initial={{ x: direction === 'left' ? 0 : '-50%' }}
        animate={{ x: direction === 'left' ? '-50%' : 0 }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        <span className="marquee-text">{text}</span>
        <span className="marquee-text">{text}</span>
        <span className="marquee-text">{text}</span>
        <span className="marquee-text">{text}</span>
      </motion.div>
    </div>
  );
};

export default Marquee;
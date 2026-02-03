import { motion, useScroll, useTransform } from 'framer-motion';
import { FaEnvelope, FaPhone, FaArrowDown } from 'react-icons/fa';
import DecryptText from './DecryptText';
import MagneticButton from './MagneticButton';
import { useEffect } from 'react';
import { useGame } from '../context/GameContext';

const Hero = ({ profile }) => {
  const { addLog } = useGame();
  const { scrollY } = useScroll();
  const xTitle = useTransform(scrollY, [0, 600], [0, 200]);
  const xSubtitle = useTransform(scrollY, [0, 600], [0, -200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    // addLog('SYSTEM INITIALIZED');
    // addLog('USER AUTHENTICATED');
  }, []);

  if (!profile) return null;

  return (
    <section className="hero">
      <div className="hero-bg-image" />
      <div className="hero-content">
        
        {/* Massive Name - Moves Right on Scroll */}
        <motion.div style={{ x: xTitle, opacity }}>
            <motion.h1 
                initial={{ x: -100, opacity: 1 }} // Debug: Force visible
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className="hero-title glitch"
                data-text={profile.name}
            >
                <DecryptText text={profile.name} speed={100} />
            </motion.h1>
        </motion.div>

        {/* Subtitle - Moves Left on Scroll */}
        <motion.div style={{ x: xSubtitle, opacity }}>
            <motion.h2
                initial={{ x: 100, opacity: 1 }} // Debug: Force visible
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="hero-subtitle"
            >
                <DecryptText text="SOFTWARE DEVELOPER_" speed={80} />
            </motion.h2>
        </motion.div>

        <motion.div 
            className="hero-description-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            {profile.description.split('|').map((desc, i) => (
                <p key={i} className="hero-desc-para">{desc.trim()}</p>
            ))}
        </motion.div>

        <motion.div 
            className="contact-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
        >
            <MagneticButton href={`mailto:${profile.email}?subject=Opportunity%20for%20Software%20Developer&body=Hello%20Bonolo%2C%20I%27d%20like%20to%20discuss%20a%20role.`} className="contact-item">
              <FaEnvelope /> {profile.email}
            </MagneticButton>
            <MagneticButton href={`tel:${profile.phone.replace(/\s/g, '')}`} className="contact-item">
              <FaPhone /> {profile.phone}
            </MagneticButton>
        </motion.div>
      </div>

      <motion.div 
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', bottom: '2rem', right: '2rem', opacity: 1 }}
      >
        <div style={{ writingMode: 'vertical-rl', fontFamily: 'var(--font-heading)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            SCROLL <FaArrowDown />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

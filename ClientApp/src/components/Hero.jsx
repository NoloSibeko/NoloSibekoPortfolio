import { motion, useScroll, useTransform } from 'framer-motion';
import { FaEnvelope, FaPhone, FaArrowDown, FaLinkedin, FaGithub, FaFileDownload } from 'react-icons/fa';
import DecryptText from './DecryptText';
import MagneticButton from './MagneticButton';
import { useEffect } from 'react';
import { useGame } from '../context/GameContext';

const Hero = ({ profile }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const { addLog } = useGame();

  useEffect(() => {
    addLog("SYSTEM ONLINE: WELCOME USER");
  }, [addLog]);

  return (
    <section className="hero-section">
        <motion.div 
            style={{ y: y1, opacity }} 
            className="hero-content"
        >
            <motion.h1 
                className="hero-title glitch" 
                data-text={profile.name.toUpperCase()}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
            >
                <DecryptText text={profile.name.toUpperCase()} />
            </motion.h1>
            
            <motion.div 
                className="hero-subtitle"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <motion.h2 className="glitch" data-text="SOFTWARE DEVELOPER_" style={{ fontSize: 'inherit', margin: 0 }}>
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
                <div className="contact-group">
                    <MagneticButton href={`mailto:${profile.email}?subject=Opportunity%20for%20Software%20Developer&body=Hello%20Bonolo%2C%20I%27d%20like%20to%20discuss%20a%20role.`} className="contact-item primary">
                        <FaEnvelope /> <span>Email Me</span>
                    </MagneticButton>
                    <MagneticButton href={`tel:${profile.phone.replace(/\s/g, '')}`} className="contact-item">
                        <FaPhone /> <span>Call Me</span>
                    </MagneticButton>
                </div>
                
                {profile.socials && (
                    <div className="contact-group">
                        <MagneticButton href={profile.socials.linkedin} target="_blank" className="contact-item">
                            <FaLinkedin /> <span>LinkedIn</span>
                        </MagneticButton>
                        <MagneticButton href={profile.socials.github} target="_blank" className="contact-item">
                            <FaGithub /> <span>GitHub</span>
                        </MagneticButton>
                        <MagneticButton href={profile.socials.resume} target="_blank" className="contact-item highlight">
                            <FaFileDownload /> <span>Resume</span>
                        </MagneticButton>
                    </div>
                )}
            </motion.div>
        </motion.div>

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

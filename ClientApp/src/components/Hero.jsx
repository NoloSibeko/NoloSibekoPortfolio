import { motion, useScroll, useTransform } from 'framer-motion';
import { FaEnvelope, FaPhone, FaArrowDown, FaLinkedin, FaGithub, FaFileDownload } from 'react-icons/fa';
import DecryptText from './DecryptText';
import MagneticButton from './MagneticButton';
import { useEffect } from 'react';
import { useGame } from '../context/GameContext';

const Hero = ({ profile }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  const { addLog } = useGame();

  useEffect(() => {
    // Empty dependency array + check to ensure it only runs once per mount is handled by useEffect behavior
    // But to be extra safe against strict mode double-invocation or re-renders:
    const hasLogged = sessionStorage.getItem('hero_welcome_logged');
    if (!hasLogged) {
        addLog("SYSTEM ONLINE: WELCOME USER");
        sessionStorage.setItem('hero_welcome_logged', 'true');
    }
  }, [addLog]);

  return (
    <section className="hero">
        <div className="hero-grid">
            <motion.div 
                className="hero-text-side"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <motion.h1 
                    className="hero-title glitch" 
                    data-text={profile.name.toUpperCase()}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                >
                    <DecryptText text={profile.name.toUpperCase()} />
                </motion.h1>
                
                <motion.div 
                    className="hero-subtitle"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.h2 className="glitch" data-text="SOFTWARE DEVELOPER_" style={{ fontSize: 'inherit', margin: 0 }}>
                        <DecryptText text="SOFTWARE DEVELOPER_" speed={80} />
                    </motion.h2>
                </motion.div>

                <motion.div 
                    className="hero-description-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {profile.description.split('|').map((desc, i) => (
                        <p key={i} className="hero-desc-para">{desc.trim()}</p>
                    ))}
                </motion.div>
            </motion.div>

            <motion.div 
                className="hero-image-side"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <div className="profile-frame">
                    <img 
                        src={profile.profileImageUrl} 
                        alt="Profile" 
                        className="profile-img" 
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = "https://ui-avatars.com/api/?name=Bonolo+Sibeko&background=0D0D0D&color=00ff41&size=512";
                        }}
                    />
                    <div className="profile-overlay"></div>
                    <div className="profile-corner pc-tl"></div>
                    <div className="profile-corner pc-tr"></div>
                    <div className="profile-corner pc-bl"></div>
                    <div className="profile-corner pc-br"></div>
                </div>
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

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { FaEnvelope, FaPhone, FaArrowDown, FaLinkedin, FaGithub, FaFileDownload } from 'react-icons/fa';
import DecryptText from './DecryptText';
import MagneticButton from './MagneticButton';
import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';

const Hero = ({ profile }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  // Mouse tilt effect state
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [glitchY, setGlitchY] = useState(null);

  // Smooth out the mouse movement
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;
    
    // Calculate percentage from center (-0.5 to 0.5)
    const xPct = (mouseXPos / width) - 0.5;
    const yPct = (mouseYPos / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    
    // Glitch effect position
    setGlitchY(mouseYPos);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setGlitchY(null);
  }

  // Calculate rotation based on mouse position
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);

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
        <div className="hero-content">
            <div className="hero-header">
                <motion.div 
                    className="hero-text-side"
                    initial={{ x: -150, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1 
                        className="hero-title glitch" 
                        data-text="BONOLO"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                    >
                        <DecryptText text="BONOLO" />
                    </motion.h1>
                    <motion.h1 
                        className="hero-title glitch" 
                        data-text="SIBEKO"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
                    >
                        <DecryptText text="SIBEKO" />
                    </motion.h1>
                    
                    <motion.div 
                        className="hero-subtitle"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.h2 className="glitch" data-text="SOFTWARE DEVELOPER || JOHANNESBURG_" style={{ fontSize: 'inherit', margin: 0 }}>
                            <DecryptText text="SOFTWARE DEVELOPER || JOHANNESBURG_" speed={30} />
                        </motion.h2>
                    </motion.div>
                </motion.div>

                <motion.div 
                    className="hero-image-side"
                    initial={{ opacity: 0, scale: 0.8, y: 0 }}
                    animate={{ 
                        opacity: 1, 
                        scale: 1,
                        y: [0, -15, 0] 
                    }}
                    transition={{ 
                        opacity: { delay: 0.5, duration: 0.8 },
                        scale: { delay: 0.5, duration: 0.8 },
                        y: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.3
                        }
                    }}
                >
                    <motion.div 
                        className="profile-frame"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d",
                        }}
                    >
                        <img 
                            src={profile.profileImageUrl} 
                            alt="Profile" 
                            className="profile-img" 
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = "https://ui-avatars.com/api/?name=Bonolo+Sibeko&background=0D0D0D&color=00ff41&size=512";
                            }}
                        />
                        {/* Scanned/Glitch Overlay */}
                        {glitchY !== null && (
                            <img 
                                src={profile.profileImageUrl} 
                                className="profile-img glitch-layer"
                                alt=""
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    // Use a fixed larger height for the strip (e.g., 40px)
                                    // Ensure it stays within bounds using Math.max/min if needed, 
                                    // or let clip-path handle the cropping naturally.
                                    clipPath: `inset(${Math.max(0, glitchY - 10)}px 0 ${Math.max(0, 260 - (glitchY + 10))}px 0)`,
                                    zIndex: 20,
                                    opacity: 1
                                }} 
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        )}
                    </motion.div>
                    {/* Caption aligned with subtitle */}
                    <div className="profile-caption">
                        FIGURE 1.0 // SUBJ: BONOLO
                    </div>
                </motion.div>
            </div>

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
        </div>

        {/* Scroll Indicator aligned with System Spine */}
        <motion.div 
            className="scroll-indicator"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100px' }}
            transition={{ delay: 2, duration: 1 }}
            style={{
                position: 'absolute',
                bottom: 0,
                left: '50px', // Align with spine
                width: '1px',
                background: 'linear-gradient(to bottom, transparent, var(--primary-color))',
                zIndex: 20
            }}
        />
    </section>
  );
};

export default Hero;

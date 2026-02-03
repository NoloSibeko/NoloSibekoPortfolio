import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { FaCode, FaDatabase, FaServer, FaTools, FaNetworkWired } from 'react-icons/fa';
import DecryptText from './DecryptText';
import { useGame } from '../context/GameContext';

const Skills = ({ skills }) => {
  const { addXp: addGlobalXp, addLog, setIsLogActive } = useGame();
  const categories = skills ? [...new Set(skills.map(s => s.category))] : [];
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "-100px 0px -100px 0px" });

  useEffect(() => {
    setIsLogActive(isInView);
  }, [isInView, setIsLogActive]);
  
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({
      target: headerRef,
      offset: ["start end", "end start"]
  });
  const xTitle = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const getIcon = (cat) => {
    switch(cat) {
        case 'Frontend': return <FaCode />;
        case 'Backend': return <FaServer />;
        case 'Database': return <FaDatabase />;
        case 'Tool': return <FaTools />;
        default: return <FaNetworkWired />;
    }
  };

  const getScatter = (idx) => {
    // Deterministic pseudo-randomness for layout scatter
    const r1 = (idx * 37) % 50; // Increased scatter range
    const r2 = (idx * 17) % 30; 
    // Removed transform to avoid conflict with hover animations
    return {
        marginLeft: `${r1}px`,
        marginTop: `${r2}px`,
        marginRight: `${15}px`
    };
  };

  const pillVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({ 
        scale: 1, 
        opacity: 1,
        x: 0,
        y: 0,
        backgroundColor: '#000',
        color: '#fff',
        transition: { 
            scale: { type: "spring", stiffness: 300, damping: 20, delay: i * 0.05 },
            opacity: { duration: 0.5, delay: i * 0.05 },
            x: { duration: 0.5 },
            y: { duration: 0.5 },
            // Slow exit transitions for hover effects (Stay up longer, fade out slowly)
            backgroundColor: { duration: 2.0, ease: "easeOut", delay: 0.5 },
            color: { duration: 2.0, ease: "easeOut", delay: 0.5 }
        }
    }),
    hover: { 
        scale: 1.2, 
        x: -5,
        y: -5,
        backgroundColor: 'var(--primary-color)', 
        color: '#000',
        transition: { 
            duration: 0.05, // Very fast enter
            type: "spring",
            stiffness: 500
        }
    }
  };

  const meterVariants = {
    visible: { 
        width: 0,
        transition: { duration: 1.0, ease: "easeOut" } // Slow drain
    },
    hover: { 
        width: '100%', 
        transition: { duration: 0.2, ease: "linear" } // Fast fill
    }
  };

  const [xpPopups, setXpPopups] = useState([]);

  const handleSkillHover = (e, skillName) => {
    // Visual popup
    const id = Date.now();
    const x = e.clientX;
    const y = e.clientY;
    const amount = 10;
    
    setXpPopups(prev => [...prev, { id, x, y, amount }]);
    
    setTimeout(() => {
        setXpPopups(prev => prev.filter(item => item.id !== id));
    }, 1000);

    // Global game state
    addGlobalXp(amount);
    addLog(`ANALYZING SKILL: ${skillName}`);
  };

  return (
    <section className="skills-section" ref={containerRef}>
      {xpPopups.map(item => (
        <motion.div
            key={item.id}
            initial={{ opacity: 1, y: 0, x: 0 }}
            animate={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            style={{
                position: 'fixed',
                left: item.x,
                top: item.y,
                pointerEvents: 'none',
                color: 'var(--primary-color)',
                fontWeight: 'bold',
                zIndex: 1000,
                textShadow: '0 0 5px var(--primary-color)'
            }}
        >
            +{item.amount} XP
        </motion.div>
      ))}

      <motion.div ref={headerRef} style={{ x: xTitle }}>
          <h2 className="section-title glitch" data-text="TECHNICAL ARSENAL">
            <DecryptText text="TECHNICAL ARSENAL" />
          </h2>
      </motion.div>

      <div className="skills-wrapper">
        {categories.map((cat, index) => (
          <motion.div 
            key={cat} 
            className="skills-category"
            initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="cat-title" style={{ display: 'flex', alignItems: 'center' }}>
               <span style={{ fontSize: '1.5em', marginRight: '1rem' }}>{getIcon(cat)}</span> {cat.toUpperCase()}
            </div>
            <div className="skills-cloud">
              {skills.filter(s => s.category === cat).map((skill, idx) => (
                <motion.div 
                  key={skill.name} 
                  className="skill-pill"
                  custom={idx}
                  variants={pillVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  style={getScatter(idx)}
                  onMouseEnter={(e) => {
                      handleSkillHover(e, skill.name);
                  }}
                >
                  <div className="skill-content">
                    {skill.name}
                    <motion.div 
                      className="power-meter"
                      variants={meterVariants}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

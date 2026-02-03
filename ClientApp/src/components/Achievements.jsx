import { motion, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaTrophy } from 'react-icons/fa';
import DecryptText from './DecryptText';
import { useGame } from '../context/GameContext';
import { useRef } from 'react';

const Achievements = ({ achievements }) => {
  const { addLog } = useGame();
  
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({
      target: headerRef,
      offset: ["start end", "end start"]
  });
  const xTitle = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section 
        className="achievements-section" 
        // onMouseEnter={() => addLog("ENTERING HALL OF FAME")}
    >
      <motion.div 
        ref={headerRef}
        style={{ x: xTitle, textAlign: 'right', paddingRight: '2rem' }}
      >
        <h2 
            className="section-title glitch"
            data-text="HALL OF FAME"
            style={{ display: 'inline-block' }} 
        >
            <DecryptText text="HALL OF FAME" />
        </h2>
      </motion.div>

      <div className="achievements-wrapper" style={{ marginBottom: '5rem' }}>
        {achievements?.map((ach, index) => (
          <motion.div 
            key={index}
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Tilt
                className="achievement-card"
                perspective={500}
                glareEnable={true}
                glareMaxOpacity={0.2}
                scale={1.05}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
                {ach.imageUrl && (
                    <img 
                      src={ach.imageUrl} 
                      alt="Achievement" 
                      className="achievement-img" 
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                )}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {!ach.imageUrl && <FaTrophy className="trophy-icon" />}
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>
                        ACHIEVEMENT_0{index + 1}
                    </h3>
                    <span className="achievement-text" style={{ fontFamily: 'var(--font-body)', color: '#ccc' }}>
                        {ach.description}
                    </span>
                </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;

import { motion, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaExternalLinkAlt, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import DecryptText from './DecryptText';
import MagneticButton from './MagneticButton';
import { useGame } from '../context/GameContext';
import { useRef } from 'react';

const Experience = ({ experience, contributions }) => {
  const { addXp, addLog } = useGame();
  
  const headerRef1 = useRef(null);
  const { scrollYProgress: scrollY1 } = useScroll({
      target: headerRef1,
      offset: ["start end", "end start"]
  });
  const xTitle1 = useTransform(scrollY1, [0, 1], [-50, 50]);

  const headerRef2 = useRef(null);
  const { scrollYProgress: scrollY2 } = useScroll({
      target: headerRef2,
      offset: ["start end", "end start"]
  });
  const xTitle2 = useTransform(scrollY2, [0, 1], [-50, 50]);
  
  const handleHover = (title) => {
    // addLog(`ACCESSING DATA: ${title.toUpperCase()}`);
    addXp(5);
  };

  return (
    <section className="experience-section">
      <motion.div 
        ref={headerRef1}
        style={{ x: xTitle1 }}
        className="section-header-container"
      >
        <h2 className="section-title glitch" data-text="EXPERIENCE LOG">
            <DecryptText text="EXPERIENCE LOG" />
        </h2>
      </motion.div>

      <div className="experience-container">
        <div className="experience-grid">
          {experience?.map((job, index) => (
            <motion.div 
              key={index} 
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "circOut" }}
            >
              <Tilt
                  className="exp-card"
                  onEnter={() => handleHover(job.role)}
                  perspective={1000}
                  glareEnable={true}
                  glareMaxOpacity={0.45}
                  scale={1.02}
                  gyroscope={true}
                >
                  {/* Target Brackets */}
                  <div className="target-bracket tb-tl"></div>
                  <div className="target-bracket tb-tr"></div>
                  <div className="target-bracket tb-bl"></div>
                  <div className="target-bracket tb-br"></div>

                  {job.backgroundImageUrl && (
                  <div 
                    className="exp-bg-image" 
                    style={{ backgroundImage: `url(${job.backgroundImageUrl})` }} 
                  />
                )}
                <div className="exp-content-overlay">
                  <div className="exp-header">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <span className="exp-period" style={{ fontFamily: 'var(--font-heading)', color: '#666' }}>
                            {job.period}
                        </span>
                        <h3 className="exp-role">{job.role}</h3>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="exp-company">
                        {job.company || job.institution}
                    </h4>
                    <p style={{ marginTop: '1rem', lineHeight: '1.6', color: '#ccc' }}>
                        {job.description}
                    </p>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>

        <motion.div 
            ref={headerRef2}
            style={{ marginTop: '8rem', x: xTitle2 }}
        >
             <h2 className="section-title glitch" data-text="CONTRIBUTIONS">
                <DecryptText text="CONTRIBUTIONS" />
             </h2>
        </motion.div>

        <div className="experience-grid" style={{ borderTop: 'none' }}>
           {contributions?.map((contrib, index) => (
             <motion.div 
                key={index}
                className="project-card-container"
                initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
             >
                <Tilt
                  className="exp-card"
                  onEnter={() => handleHover(contrib.title)}
                  perspective={1000}
                  glareEnable={true}
                  glareMaxOpacity={0.3}
                  scale={1.02}
                  style={{ border: '1px solid var(--accent-color)' }}
                >
                  {/* Target Brackets */}
                  <div className="target-bracket tb-tl"></div>
                  <div className="target-bracket tb-tr"></div>
                  <div className="target-bracket tb-bl"></div>
                  <div className="target-bracket tb-br"></div>

                  <div className="exp-header">
                      <h3 className="exp-role" style={{ color: 'var(--accent-color)' }}>PROJECT_0{index + 1}</h3>
                      <div className="project-links">
                          {contrib.links && contrib.links.map((link, i) => (
                              <MagneticButton key={i} href={link} target="_blank" rel="noopener noreferrer" className="project-link">
                                  LINK_{i+1} <FaExternalLinkAlt />
                              </MagneticButton>
                          ))}
                      </div>
                  </div>
                  
                  <div>
                      {contrib.projectImageUrl && (
                          <div className="project-img-container" style={{ border: '1px solid var(--accent-color)', borderRadius: 0 }}>
                              <img src={contrib.projectImageUrl} alt={`Project ${index + 1}`} className="project-img" />
                          </div>
                      )}
                      <p style={{ marginTop: '1rem', lineHeight: '1.6', color: '#ccc' }}>
                          {contrib.description}
                      </p>
                  </div>
                </Tilt>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

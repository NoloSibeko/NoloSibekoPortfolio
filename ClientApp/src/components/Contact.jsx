import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaFileDownload } from 'react-icons/fa';
import DecryptText from './DecryptText';
import MagneticButton from './MagneticButton';

// Hover Decrypt Effect Component
const HoverDecrypt = ({ text, reveal }) => {
    const [displayText, setDisplayText] = useState(text);
    const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/";
    
    useEffect(() => {
        let interval;
        if (reveal) {
            let iteration = 0;
            interval = setInterval(() => {
                setDisplayText(prev => 
                    text.split("").map((letter, index) => {
                        if (index < iteration) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join("")
                );
                
                if (iteration >= text.length) clearInterval(interval);
                iteration += 1 / 2;
            }, 30);
        } else {
            setDisplayText(text); // Reset instantly or animate back if needed
        }
        return () => clearInterval(interval);
    }, [reveal, text]);

    return <span>{displayText}</span>;
};

const Contact = ({ profile }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null); // 'email' | 'phone' | null

  useEffect(() => {
    console.log("Contact component mounted, mobile check:", window.innerWidth <= 768);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="section-title glitch" data-text="LET'S WORK TOGETHER">
            <DecryptText text="LET'S WORK TOGETHER" />
        </h2>
        
        <div className="contact-message">
            <p>
                I am currently available for opportunities that align with my full-stack development profile. 
                I am eager to apply my current skills and deeply committed to learning new technologies to bridge any gaps. 
                If you're looking for a dedicated developer ready to grow and contribute, let's connect.
            </p>
        </div>

        <div className="contact-actions">
            <div className="contact-group" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <MagneticButton 
                    href={`mailto:${profile.email}?subject=Opportunity%20for%20Software%20Developer&body=Hello%20Bonolo%2C%20I%27d%20like%20to%20discuss%20a%20role.`} 
                    className="contact-item primary"
                    style={{ minWidth: '300px', justifyContent: 'center' }} // Fixed width and centered content
                    onMouseEnter={() => !isMobile && setHoveredButton('email')}
                    onMouseLeave={() => setHoveredButton(null)}
                >
                    <FaEnvelope /> 
                    <span>
                        {hoveredButton === 'email' ? (
                            <HoverDecrypt text={profile.email} reveal={true} />
                        ) : 'Email Me'}
                    </span>
                </MagneticButton>
                <MagneticButton 
                    href={isMobile ? `tel:${profile.phone.replace(/\s/g, '')}` : undefined} 
                    className="contact-item"
                    style={{ cursor: isMobile ? 'pointer' : 'default', minWidth: '220px', justifyContent: 'center' }} // Fixed width and centered content
                    onMouseEnter={() => !isMobile && setHoveredButton('phone')}
                    onMouseLeave={() => setHoveredButton(null)}
                >
                    <FaPhone /> 
                    <span>
                         {hoveredButton === 'phone' ? (
                            <HoverDecrypt text={profile.phone} reveal={true} />
                        ) : 'Call Me'}
                    </span>
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
                    <MagneticButton href={profile.socials.resume} target="_blank" download="Bonolo_Sibeko_Resume.pdf" className="contact-item highlight">
                        <FaFileDownload /> <span>Resume</span>
                    </MagneticButton>
                </div>
            )}
        </div>
      </div>
      
      <div className="footer-credits">
        <p>&copy; {new Date().getFullYear()} {profile.name}. ALL SYSTEMS NOMINAL.</p>
      </div>
    </section>
  );
};

export default Contact;

import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaFileDownload } from 'react-icons/fa';
import DecryptText from './DecryptText';
import MagneticButton from './MagneticButton';

const Contact = ({ profile }) => {
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

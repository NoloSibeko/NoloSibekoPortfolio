import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useGame } from '../context/GameContext';

const GameHUD = ({ delay = 2 }) => {
    const { scrollY } = useScroll();
    const { level, xp } = useGame();
    const [time, setTime] = useState('');
    const [scrollVal, setScrollVal] = useState(0);
    const [animateLine, setAnimateLine] = useState(false);

    // Animate line when level changes
    useEffect(() => {
        if (level > 1) { // Don't animate on initial load
            setAnimateLine(true);
            const timer = setTimeout(() => setAnimateLine(false), 2000); // Reset after animation
            return () => clearTimeout(timer);
        }
    }, [level]);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour12: false }));
        };
        
        const interval = setInterval(updateTime, 1000);
        updateTime();

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        return scrollY.on('change', (latest) => {
            setScrollVal(Math.floor(latest));
        });
    }, [scrollY]);

    return (
        <motion.div 
            className="game-hud"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay, duration: 1 }}
        >
            <div className="hud-group top-left">
                <div className="hud-label">OPERATOR</div>
                <div className="hud-value">LVL.{level} <span style={{fontSize: '0.6em', color: '#666'}}>({xp} XP)</span></div>
                {/* Level Up Beam Animation */}
                {animateLine && (
                    <motion.div 
                        initial={{ width: 0, opacity: 1, left: '100%' }}
                        animate={{ width: '200vw', left: '0%' }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            height: '2px',
                            background: '#00FFFF',
                            boxShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF',
                            zIndex: 10,
                            pointerEvents: 'none'
                        }}
                        onAnimationComplete={() => {
                             // Second phase: Retract back to origin
                             // Handled by keyframes or separate animation if needed, 
                             // but user said "goes back to where it was". 
                             // Actually, let's make the element itself shoot across.
                        }}
                    />
                )}
                 {animateLine && (
                    <motion.div 
                        initial={{ x: 0 }}
                        animate={{ x: [0, 500, 0] }} // Shoot out and back
                        transition={{ duration: 1.5, times: [0, 0.2, 1], ease: "circOut" }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            border: '1px solid #00FFFF',
                            boxShadow: '0 0 15px #00FFFF',
                            background: 'rgba(0, 255, 255, 0.1)',
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </div>

            <div className="hud-group top-right">
                <div className="hud-label">SYS.TIME</div>
                <div className="hud-value">{time}</div>
            </div>

            <div className="hud-group bottom-left" style={{ opacity: 0 }}> 
                {/* Hiding coord display as it overlaps with SystemLog, or move it? */}
                {/* Let's just remove it effectively to make space for Log */}
                <div className="hud-label">COORDS.Y</div>
                <div className="hud-value">{scrollVal}</div>
            </div>

            <div className="hud-group bottom-right">
                <div className="hud-label">STATUS</div>
                <div className="hud-value" style={{ color: 'var(--primary-color)' }}>ONLINE</div>
            </div>
        </motion.div>
    );
};

export default GameHUD;
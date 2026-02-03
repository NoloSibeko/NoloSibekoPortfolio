import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useGame } from '../context/GameContext';

const GameHUD = ({ delay = 2 }) => {
    const { scrollY } = useScroll();
    const { level, xp } = useGame();
    const [time, setTime] = useState('');
    const [scrollVal, setScrollVal] = useState(0);

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
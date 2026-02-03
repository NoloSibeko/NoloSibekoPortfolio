import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import GameHUD from './GameHUD';

const words = [
    "INITIALIZING CORE SYSTEMS...", 
    "LOADING ASSETS...", 
    "ESTABLISHING SECURE CONNECTION...", 
    "DECRYPTING PROFILE DATA...", 
    "ACCESS GRANTED"
];

const Preloader = ({ onComplete }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index === words.length - 1) return;

        const timeout = setTimeout(() => {
            setIndex(prev => prev + 1);
        }, 600); // Speed of text change

        return () => clearTimeout(timeout);
    }, [index]);

    return (
        <motion.div 
            className="preloader"
            initial={{ opacity: 1 }}
            exit={{ 
                scale: 0,
                borderRadius: "50%",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <GameHUD delay={0.5} />
            <div className="scanline"></div>
            <motion.div 
                className="preloader-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="preloader-text">
                    <span className="blink">&gt;</span> {words[index]}
                </div>
                <div className="loading-bar-container">
                    <motion.div 
                        className="loading-bar"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.5, ease: "linear" }}
                        onAnimationComplete={onComplete}
                    />
                </div>
                <div className="tech-specs">
                     MEM: 64TB OK | CPU: QUANTUM CORE | NET: SECURE
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Preloader;
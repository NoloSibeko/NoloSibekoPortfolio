import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';

const SystemLog = () => {
  const { logs, isLogActive } = useGame();

  return (
    <AnimatePresence>
      {isLogActive && (
        <motion.div 
          className="system-log" 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--primary-color)',
            zIndex: 100,
            pointerEvents: 'none',
            textAlign: 'left',
            maxWidth: '300px'
          }}
        >
          <div style={{ 
              borderBottom: '1px solid var(--primary-color)', 
              marginBottom: '0.5rem', 
              paddingBottom: '0.2rem',
              display: 'flex',
              justifyContent: 'space-between'
          }}>
            <span>SYS.LOG</span>
            <span className="blink">_</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <AnimatePresence initial={false}>
                {logs.map((log, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ marginBottom: '0.2rem', textShadow: '0 0 5px var(--primary-color)' }}
                >
                    {log}
                </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SystemLog;

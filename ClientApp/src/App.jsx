import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import GameHUD from './components/GameHUD';
import SystemLog from './components/SystemLog';
import { GameProvider } from './context/GameContext';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5149/api/Portfolio';
    console.log("Fetching data from:", apiUrl);
    
    fetch(apiUrl)
      .then(res => {
        console.log("Response received:", res);
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        console.log("Data loaded:", data);
        setData(data);
        // Don't set loading false here, wait for preloader animation
      })
      .catch(err => {
        console.error("Fetch error:", err);
        // In case of error, we might still want to show content or error state
        setLoading(false); 
      });
      
    return () => {
        if (rafId) cancelAnimationFrame(rafId);
        lenis.destroy();
    };
  }, []);

  return (
    <GameProvider>
      <CustomCursor />
      {/* GameHUD moved inside containers for transition effects */}
      <div className="noise-overlay" />
      <motion.div className="scroll-progress" style={{ scaleX }} />
      
      <AnimatePresence mode='wait'>
        {loading && (
            <Preloader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && data && (
          <motion.div 
            className="app-container"
            initial={{ scale: 0, borderRadius: "50%" }}
            animate={{ scale: 1, borderRadius: "0%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <GameHUD delay={0} />
            <SystemLog />
            <Background />
            <Hero profile={data.profile} />
            <Experience experience={data.experience} contributions={data.contributions} />
            <Skills skills={data.skills} />
            <Achievements achievements={data.achievements} />
          </motion.div>
      )}

      {!loading && !data && (
           <div className="error" style={{ color: 'red', textAlign: 'center', marginTop: '20vh' }}>
             <div>SYSTEM FAILURE: BACKEND OFFLINE OR BLOCKED</div>
             <div style={{ fontSize: '0.8rem', marginTop: '1rem', opacity: 0.7 }}>
               TARGET: {import.meta.env.VITE_API_URL || 'LOCALHOST'}
             </div>
             <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.7 }}>
               CHECK CONSOLE FOR DETAILS
             </div>
           </div>
      )}
    </GameProvider>
  );
}

export default App;

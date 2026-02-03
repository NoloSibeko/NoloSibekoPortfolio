import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [logs, setLogs] = useState([]);
  const [maxLogs] = useState(5);
  const [isLogActive, setIsLogActive] = useState(false);

  // Define addLog first as it is used in useEffect
  const addLog = useCallback((message) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const logEntry = {
      id: Date.now() + Math.random(),
      text: `[${timestamp}] ${message}`
    };
    setLogs(prev => {
        // Prevent duplicate consecutive messages
        if (prev.length > 0 && prev[0].text.includes(message)) {
            return prev;
        }
        return [logEntry, ...prev].slice(0, maxLogs);
    });
  }, [maxLogs]);

  // Level up logic: Level = 1 + floor(sqrt(xp / 100))
  useEffect(() => {
    const newLevel = 1 + Math.floor(Math.sqrt(xp / 100));
    if (newLevel > level) {
      setLevel(newLevel);
      addLog(`LEVEL UP! RANK ${newLevel} REACHED`);
    }
  }, [xp, level, addLog]);

  const addXp = useCallback((amount) => {
    setXp(prev => prev + amount);
  }, []);

  return (
    <GameContext.Provider value={{ xp, level, logs, addXp, addLog, isLogActive, setIsLogActive }}>
      {children}
    </GameContext.Provider>
  );
};

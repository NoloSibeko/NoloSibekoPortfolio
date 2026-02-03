import { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [logs, setLogs] = useState([]);
  const [maxLogs] = useState(5);
  const [isLogActive, setIsLogActive] = useState(false);

  // Level up logic: Level = 1 + floor(sqrt(xp / 100))
  useEffect(() => {
    const newLevel = 1 + Math.floor(Math.sqrt(xp / 100));
    if (newLevel > level) {
      setLevel(newLevel);
      addLog(`LEVEL UP! RANK ${newLevel} REACHED`);
    }
  }, [xp, level]);

  const addXp = (amount) => {
    setXp(prev => prev + amount);
  };

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, maxLogs));
  };

  return (
    <GameContext.Provider value={{ xp, level, logs, addXp, addLog, isLogActive, setIsLogActive }}>
      {children}
    </GameContext.Provider>
  );
};

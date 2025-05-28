import React, { useState, useEffect, useCallback } from 'react';
import { GridItem } from '../../types';
import Button from '../ui/Button';
import { TARGET_COLOR, DISTRACTOR_COLORS, INITIAL_GRID_SIZE, INITIAL_TIME_LIMIT } from '../../constants';

const generateGrid = (size: number): GridItem[] => {
  if (size <= 0) return []; // Guard against invalid size
  const totalItems = size * size;
  const items: GridItem[] = [];
  const targetIndex = Math.floor(Math.random() * totalItems);

  for (let i = 0; i < totalItems; i++) {
    const isTarget = i === targetIndex;
    items.push({
      id: `item-${i}-${Date.now()}`,
      color: isTarget ? TARGET_COLOR : DISTRACTOR_COLORS[Math.floor(Math.random() * DISTRACTOR_COLORS.length)],
      isTarget: isTarget,
    });
  }
  return items;
};

const SpotTheTargetGame: React.FC = () => {
  const [gridSize, setGridSize] = useState(INITIAL_GRID_SIZE);
  // Initialize gridItems with a function to ensure generateGrid is called only on mount or when gridSize changes appropriately
  const [gridItems, setGridItems] = useState<GridItem[]>(() => generateGrid(INITIAL_GRID_SIZE));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_LIMIT);
  const [level, setLevel] = useState(1); // Start at level 1
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasGameStarted, setHasGameStarted] = useState(false); // Tracks if the game process has been initiated
  const [message, setMessage] = useState('');

  const setupNewLevel = useCallback(() => {
    const currentGridSize = INITIAL_GRID_SIZE + Math.floor((level - 1) / 3);
    setGridSize(currentGridSize);
    setGridItems(generateGrid(currentGridSize));
    setTimeLeft(Math.max(3, INITIAL_TIME_LIMIT - Math.floor((level - 1) / 2))); // Min 3 seconds
    setMessage('');
  }, [level]);

  // Effect to setup a new level when the game is active and level changes
  useEffect(() => {
    if (hasGameStarted && !isGameOver) {
      setupNewLevel();
    }
  }, [level, hasGameStarted, isGameOver, setupNewLevel]);

  // Timer effect
  useEffect(() => {
    if (!hasGameStarted || isGameOver || timeLeft <= 0) {
      if (hasGameStarted && !isGameOver && timeLeft <= 0) { // Specifically handle time running out
        setIsGameOver(true);
        setMessage(`時間到！`);
      }
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, isGameOver, hasGameStarted, score]); 

  const handleStartGame = () => {
    setScore(0);
    setLevel(1); 
    setIsGameOver(false);
    setHasGameStarted(true); 
  };

  const handleItemClick = (item: GridItem) => {
    if (isGameOver || !hasGameStarted) return;

    if (item.isTarget) {
      setScore((prevScore) => prevScore + 10 + (level * 2)); 
      setLevel((prevLevel) => prevLevel + 1); 
      setMessage('正確！進入下一關...');
    } else {
      setScore((prevScore) => Math.max(0, prevScore - 5)); 
      setMessage('哎呀！點錯了。');
    }
  };

  const handleEndGameEarly = () => {
    setIsGameOver(true);
    setMessage('遊戲提前結束。');
  }

  // Initial screen: Game not started yet
  if (!hasGameStarted && !isGameOver) {
    return (
      <div className="text-center p-4">
        <h2 className="text-2xl font-semibold mb-4 text-slate-700">準備好測試您的專注力了嗎？</h2>
        <Button onClick={handleStartGame} size="lg" aria-label="開始「找出目標」遊戲">
          開始遊戲
        </Button>
      </div>
    );
  }
  
  // Game Over screen
  if (isGameOver) {
    return (
      <div className="text-center p-4">
        <h2 className="text-3xl font-bold text-red-600 mb-2">遊戲結束！</h2>
        {message && <p className="text-xl text-slate-600 mb-1">{message}</p>}
        <p className="text-2xl font-semibold text-slate-700 mb-6">最終得分： {score}</p>
        <Button onClick={handleStartGame} size="lg" aria-label="再玩一次「找出目標」遊戲">
          再玩一次
        </Button>
      </div>
    );
  }

  // Active game screen
  return (
    <div className="flex flex-col items-center p-4 space-y-6">
      <div className="w-full flex flex-wrap justify-between items-center text-lg font-semibold gap-x-4 gap-y-2">
        <div className="text-indigo-600">得分： <span className="text-2xl font-bold">{score}</span></div>
        <div className="text-emerald-600">級別： <span className="text-2xl font-bold">{level}</span></div>
        <div className="text-red-600">時間： <span className="text-2xl font-bold">{timeLeft}s</span></div>
      </div>
      
      {message && (
        <p className={`text-center font-medium text-lg h-6 ${message.includes('正確') ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}

      <div
        className="grid gap-2 border-2 border-slate-300 p-2 rounded-lg shadow-md bg-slate-100 w-full max-w-md"
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        aria-label="遊戲網格"
      >
        {gridItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleItemClick(item);}}}
            role="button"
            tabIndex={0}
            className={`aspect-square rounded-md cursor-pointer transition-all duration-150 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${item.color} border border-gray-400 flex items-center justify-center`}
            style={{ touchAction: 'manipulation' }}
            aria-label={item.isTarget ? "目標方塊" : "干擾方塊"}
          >
            <span className="sr-only">{item.isTarget ? "目標" : "干擾項"}方塊</span>
          </div>
        ))}
      </div>
      <Button onClick={handleEndGameEarly} variant="danger" size="sm">結束遊戲</Button>
    </div>
  );
};

export default SpotTheTargetGame;
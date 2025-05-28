import React, { useState, useEffect, useCallback } from 'react';
import Button from '../ui/Button';
import { GamePhase } from '../../types';
import { SEQUENCE_ITEM_COLORS, INITIAL_SEQUENCE_LENGTH, MAX_LIVES } from '../../constants';

const generateSequence = (length: number): string[] => {
  const sequence: string[] = [];
  for (let i = 0; i < length; i++) {
    sequence.push(SEQUENCE_ITEM_COLORS[Math.floor(Math.random() * SEQUENCE_ITEM_COLORS.length)]);
  }
  return sequence;
};

const colorNameMap: { [key: string]: string } = {
  'bg-red-500': '紅色',
  'bg-blue-500': '藍色',
  'bg-green-500': '綠色',
  'bg-yellow-500': '黃色',
  'bg-purple-500': '紫色',
  'bg-orange-500': '橙色',
};

const SequenceMemoryGame: React.FC = () => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [currentSequenceLength, setCurrentSequenceLength] = useState(INITIAL_SEQUENCE_LENGTH);
  const [gamePhase, setGamePhase] = useState<GamePhase>(GamePhase.NotStarted);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [message, setMessage] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const startNewRound = useCallback(() => {
    setMessage('');
    setUserSequence([]);
    const newSequence = generateSequence(currentSequenceLength);
    setSequence(newSequence);
    setGamePhase(GamePhase.ShowingSequence);
    setMessage('記住序列...');
    
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < newSequence.length) {
        setHighlightIndex(i);
        i++;
      } else {
        clearInterval(intervalId);
        setHighlightIndex(-1); 
        setGamePhase(GamePhase.WaitingForInput);
        setMessage('輪到您了！請重複序列。');
      }
    }, 800); 
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSequenceLength]);


  const startGame = () => {
    setScore(0);
    setLives(MAX_LIVES);
    setCurrentSequenceLength(INITIAL_SEQUENCE_LENGTH);
    setGamePhase(GamePhase.NotStarted); 
    setMessage('準備開始...');
  };
  
  useEffect(() => {
    if (gamePhase === GamePhase.NotStarted && lives > 0 && message === '準備開始...') { 
        setTimeout(() => {
            startNewRound();
        }, 1000);
    } else if (gamePhase === GamePhase.Feedback && lives > 0) { 
        setTimeout(() => {
            startNewRound();
        }, 1500); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamePhase, currentSequenceLength, lives, message]); // Added message to dependency array for start condition

  const handleColorClick = (color: string) => {
    if (gamePhase !== GamePhase.WaitingForInput) return;

    const newUserSequence = [...userSequence, color];
    setUserSequence(newUserSequence);

    if (newUserSequence.length === sequence.length) {
      setGamePhase(GamePhase.Feedback);
      if (JSON.stringify(newUserSequence) === JSON.stringify(sequence)) {
        setScore(score + currentSequenceLength * 10);
        setCurrentSequenceLength(currentSequenceLength + 1);
        setMessage('正確！進入下一關。');
      } else {
        setLives(lives - 1);
        if (lives - 1 <= 0) {
          setGamePhase(GamePhase.GameOver);
          setMessage(`遊戲結束！最終得分： ${score}`);
        } else {
          setMessage('錯誤！再試一次。');
        }
      }
    }
  };
  
  if (gamePhase === GamePhase.NotStarted && lives === MAX_LIVES && message !== '準備開始...') {
     return (
      <div className="text-center p-4">
        <h2 className="text-2xl font-semibold mb-4 text-slate-700">準備好測試您的記憶力了嗎？</h2>
        <Button onClick={startGame} size="lg" aria-label="開始序列記憶遊戲">開始遊戲</Button>
      </div>
    );
  }

  if (gamePhase === GamePhase.GameOver) {
    return (
      <div className="text-center p-4">
        <h2 className="text-3xl font-bold text-red-600 mb-2">遊戲結束！</h2>
        <p className="text-xl text-slate-600 mb-4">{message}</p>
        <p className="text-2xl font-semibold text-slate-700 mb-6">最終得分： {score}</p>
        <Button onClick={startGame} size="lg" aria-label="再玩一次序列記憶遊戲">再玩一次</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 space-y-6">
      <div className="w-full flex justify-between items-center text-lg font-semibold">
        <div className="text-emerald-600">得分： <span className="text-2xl">{score}</span></div>
        <div className="text-sky-600">級別： <span className="text-2xl">{currentSequenceLength - INITIAL_SEQUENCE_LENGTH + 1}</span></div>
        <div className="text-red-600">生命： <span className="text-2xl">{lives}</span></div>
      </div>

      <p className={`text-center font-medium h-6 ${message.includes('正確') ? 'text-green-600' : message.includes('錯誤') || message.includes('遊戲結束') ? 'text-red-600' : 'text-slate-600'}`}>
        {gamePhase === GamePhase.ShowingSequence && highlightIndex === -1 && sequence.length > 0 ? '記住序列...' : message}
      </p>

      <div className="h-24 w-full bg-slate-200 rounded-lg flex items-center justify-center p-2 shadow-inner space-x-2">
        {gamePhase === GamePhase.ShowingSequence ? (
          sequence.map((color, index) => (
            <div
              key={`seq-item-${index}`}
              className={`w-12 h-12 md:w-16 md:h-16 rounded-lg ${color} transition-all duration-300 ${highlightIndex === index ? 'ring-4 ring-offset-2 ring-black scale-110' : 'opacity-75'}`}
              aria-hidden="true" 
            />
          ))
        ) : gamePhase === GamePhase.WaitingForInput || gamePhase === GamePhase.Feedback ? (
           <div className="text-slate-500 text-lg">
             {userSequence.length > 0 
                ? userSequence.map((color, index) => (
                    <div key={`user-sq-${index}`} className={`inline-block w-8 h-8 md:w-10 md:h-10 rounded-md ${color} mr-1`}></div>
                  ))
                : (gamePhase === GamePhase.WaitingForInput ? "等待您輸入..." : "")
             }
           </div>
        ) : (
          <div className="text-slate-500 text-lg">{(gamePhase === GamePhase.NotStarted && message === '準備開始...') ? '準備中...' : ' '}</div>
        )}
      </div>

      <div className={`grid grid-cols-3 gap-3 w-full max-w-xs ${gamePhase !== GamePhase.WaitingForInput ? 'opacity-50 pointer-events-none' : ''}`}>
        {SEQUENCE_ITEM_COLORS.map((color) => (
          <Button
            key={color}
            onClick={() => handleColorClick(color)}
            className={`w-full aspect-square !p-0 ${color} hover:ring-4 hover:ring-offset-1 ring-black focus:ring-4 focus:ring-offset-1 focus:ring-black`}
            disabled={gamePhase !== GamePhase.WaitingForInput}
            aria-label={`選擇${colorNameMap[color]}方塊`}
          >
           <span className="sr-only">{colorNameMap[color]}</span>
          </Button>
        ))}
      </div>
      
      {(gamePhase !== GamePhase.NotStarted) && (
         <Button onClick={startGame} variant="danger" size="sm" aria-label="結束目前遊戲並重新開始">結束遊戲</Button>
      )}
    </div>
  );
};

export default SequenceMemoryGame;
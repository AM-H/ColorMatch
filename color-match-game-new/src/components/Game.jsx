// Game.jsx
import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import ScoreBoard from './Scoreboard';
import DifficultySelector from './DifficultySelector';
import { difficultySettings, colors } from '../utils/gameSettings';
import { getHighScores, saveHighScore } from '../utils/localStorage';
import createAudioContext from '../utils/soundEffect';

const Game = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [targetColor, setTargetColor] = useState('');
  const [tiles, setTiles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [highScores, setHighScores] = useState(getHighScores());
  const [sounds] = useState(createAudioContext);

  const startGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setScore(0);
    setTimeLeft(difficultySettings[selectedDifficulty].time);
    setGameOver(false);
    setIsPlaying(true);
    generateNewRound(selectedDifficulty);
  };

  const generateNewRound = (currentDifficulty = difficulty) => {
    const settings = difficultySettings[currentDifficulty];
    const newTargetColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(newTargetColor);
    
    const newTiles = Array(settings.tiles).fill('').map((_, index) => {
      if (index < settings.correctTiles) {
        return newTargetColor;
      } else {
        const otherColors = colors.filter(c => c !== newTargetColor);
        return otherColors[Math.floor(Math.random() * otherColors.length)];
      }
    });
    
    setTiles(newTiles.sort(() => Math.random() - 0.5));
  };

  const handleTileClick = (color) => {
    if (!isPlaying || gameOver) return;
    
    if (color === targetColor) {
      sounds.playCorrect();
      setScore(prev => prev + 1);
      generateNewRound();
    } else {
      sounds.playWrong();
      setScore(prev => Math.max(0, prev - 1));
    }
  };

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          sounds.playGameOver();
          setGameOver(true);
          setIsPlaying(false);
          setHighScores(prev => {
            const newScores = saveHighScore(difficulty, score);
            return newScores;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, difficulty, score, sounds]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Color Match</h1>
        
        {!isPlaying && !gameOver && (
          <DifficultySelector 
            highScores={highScores} 
            onSelectDifficulty={startGame} 
          />
        )}

        {isPlaying && (
          <>
            <ScoreBoard 
              score={score} 
              highScore={highScores[difficulty]} 
              timeLeft={timeLeft} 
            />
            <GameBoard
              tiles={tiles}
              targetColor={targetColor}
              difficulty={difficulty}
              onTileClick={handleTileClick}
            />
          </>
        )}

        {gameOver && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="mb-2">Final Score: {score}</p>
            <p className="mb-4">High Score: {highScores[difficulty]}</p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => startGame(difficulty)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Play Again
              </button>
              <button 
                onClick={() => {
                  setGameOver(false);
                  setIsPlaying(false);
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Change Difficulty
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
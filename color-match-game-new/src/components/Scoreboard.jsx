// ScoreBoard.jsx
import React from 'react';

const ScoreBoard = ({ score, highScore, timeLeft }) => {
  return (
    <div className="flex justify-between mb-4">
      <span className="font-semibold">Score: {score}</span>
      <span className="font-semibold">High Score: {highScore}</span>
      <span className="font-semibold">Time: {timeLeft}s</span>
    </div>
  );
};

export default ScoreBoard;
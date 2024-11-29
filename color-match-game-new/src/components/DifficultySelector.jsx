// DifficultySelector.jsx
import React from 'react';

const DifficultySelector = ({ highScores, onSelectDifficulty }) => {
  return (
    <div className="text-center mb-6">
      <p className="mb-4 text-gray-600">Match the tiles with the target color!</p>
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold">High Scores:</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-green-100 p-3 rounded">
            <p className="font-medium">Easy</p>
            <p>{highScores.easy}</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded">
            <p className="font-medium">Medium</p>
            <p>{highScores.medium}</p>
          </div>
          <div className="bg-red-100 p-3 rounded">
            <p className="font-medium">Hard</p>
            <p>{highScores.hard}</p>
          </div>
        </div>
        <h2 className="text-xl font-semibold">Select Difficulty:</h2>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => onSelectDifficulty('easy')}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Easy
          </button>
          <button 
            onClick={() => onSelectDifficulty('medium')}
            className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Medium
          </button>
          <button 
            onClick={() => onSelectDifficulty('hard')}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DifficultySelector;
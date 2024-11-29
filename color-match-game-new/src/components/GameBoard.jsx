// GameBoard.jsx
import React from 'react';
import { colorStyles, gridCols } from '../utils/gameSettings';

const GameBoard = ({ tiles, targetColor, difficulty, onTileClick }) => {
  return (
    <>
      <div className="mb-4 text-center">
        <p className="mb-2">Find all tiles colored:</p>
        <div 
          className={`w-20 h-8 mx-auto rounded ${colorStyles[targetColor]}`}
        ></div>
      </div>

      <div className={`grid ${gridCols[difficulty]} gap-3 mb-4`}>
        {tiles.map((color, index) => (
          <button
            key={index}
            onClick={() => onTileClick(color)}
            className={`w-full h-16 rounded-lg ${colorStyles[color]} hover:opacity-90 transition`}
          ></button>
        ))}
      </div>
    </>
  );
};

export default GameBoard;
export const getHighScores = () => {
    const saved = localStorage.getItem('highScores');
    return saved ? JSON.parse(saved) : { easy: 0, medium: 0, hard: 0 };
  };
  
  export const saveHighScore = (difficulty, score) => {
    const highScores = getHighScores();
    const newHighScores = {
      ...highScores,
      [difficulty]: Math.max(highScores[difficulty], score)
    };
    localStorage.setItem('highScores', JSON.stringify(newHighScores));
    return newHighScores;
  };
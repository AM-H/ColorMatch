// soundEffects.js
const createAudioContext = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    const createSound = (frequency, type = 'sine') => {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      return { oscillator, gainNode };
    };
  
    return {
      playCorrect: () => {
        const { oscillator, gainNode } = createSound(800, 'sine');
        oscillator.start();
        setTimeout(() => {
          oscillator.stop();
          gainNode.disconnect();
        }, 100);
      },
      playWrong: () => {
        const { oscillator, gainNode } = createSound(200, 'square');
        oscillator.start();
        setTimeout(() => {
          oscillator.stop();
          gainNode.disconnect();
        }, 200);
      },
      playGameOver: () => {
        const { oscillator, gainNode } = createSound(400, 'sawtooth');
        oscillator.start();
        setTimeout(() => {
          oscillator.stop();
          gainNode.disconnect();
        }, 500);
      }
    };
  };
  
  export default createAudioContext;
  
  // gameSettings.js
  export const difficultySettings = {
    easy: { time: 30, tiles: 9, correctTiles: 3 },
    medium: { time: 25, tiles: 16, correctTiles: 4 },
    hard: { time: 20, tiles: 25, correctTiles: 4 }
  };
  
  export const colors = ['red', 'blue', 'green', 'purple', 'orange', 'yellow', 'pink', 'teal'];
  
  export const colorStyles = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    pink: 'bg-pink-500',
    teal: 'bg-teal-500'
  };
  
  export const gridCols = {
    easy: 'grid-cols-3',
    medium: 'grid-cols-4',
    hard: 'grid-cols-5'
  };
  
  // localStorage.js
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
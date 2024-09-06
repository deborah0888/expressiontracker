// import React, { useState, useEffect } from 'react';
// //import 'C:\Users\debor\my-game\src\style8.css';
// import './style8.css'; // Adjust the path if needed

// const puzzles = [
//     {
//         word: "CAT",
//         grid: ["C", "A", "T", "L", "B", "A", "U", "Y", "X"],
//         image: "/assets/images/cat.gif",
//         audio: "/assets/audio/catsound.mp3"
//     },
//     {
//         word: "DOG",
//         grid: ["Q", "M", "D", "H", "O", "P", "G", "X", "W"],
//         image: "/assets/images/dog1.gif",
//         audio: "/assets/audio/dogsound.mp3"
//     },
//     {
//         word: "SUN",
//         grid: ["S", "B", "P", "U", "C", "E", "N", "F", "Q"],
//         image: "/assets/images/giphy.gif",
//         audio: "/assets/audio/sunsound.mp3"
//     },
//     {
//         word: "CAR",
//         grid: ["C", "Y", "O", "A", "P", "I", "R", "K", "S"],
//         image: "/assets/images/car.gif",
//         audio: "/assets/audio/carsound.mp3"
//     }
// ];

// const WordPuzzleGame = () => {
//     const [currentPuzzle, setCurrentPuzzle] = useState(0);
//     const [foundWords, setFoundWords] = useState(new Set());
//     const [puzzleAudio] = useState(new Audio());

//     useEffect(() => {
//         initializePuzzle();
//     }, [currentPuzzle]);

//     const initializePuzzle = () => {
//         const puzzle = puzzles[currentPuzzle];
//         const puzzleElement = document.getElementById('puzzle');
//         const imageElement = document.getElementById('puzzleImage');

//         puzzleElement.innerHTML = '';
//         setFoundWords(new Set());
//         document.getElementById('message').textContent = '';

//         imageElement.src = puzzle.image;
//         imageElement.style.display = "block";

//         puzzleAudio.src = puzzle.audio;

//         for (let i = 0; i < 9; i++) {
//             const cell = document.createElement('div');
//             cell.classList.add('cell');
//             cell.setAttribute('data-letter', puzzle.grid[i]);
//             cell.innerHTML = puzzle.grid[i];
//             cell.addEventListener('click', () => {
//                 cell.classList.toggle('selected');
//                 checkWordFound(puzzle.word);
//             });
//             puzzleElement.appendChild(cell);
//         }

//         puzzleAudio.play();
//     };

//     const checkWordFound = (word) => {
//         const selectedCells = document.querySelectorAll('.selected');
//         const selectedWord = Array.from(selectedCells).map(cell => cell.getAttribute('data-letter')).join('');

//         if (selectedCells.length === word.length) {
//             if (selectedWord === word && !foundWords.has(word)) {
//                 foundWords.add(word);
//                 selectedCells.forEach(cell => {
//                     cell.classList.add('found');
//                     cell.classList.remove('selected');
//                 });
//                 document.getElementById('message').textContent = 'Great! You found the word ' + word + '!';
//                 document.getElementById('message').style.color = 'green';
//                 document.getElementById('nextPuzzleButton').style.display = "inline-block";
//                 if (currentPuzzle === puzzles.length - 1) {
//                     document.getElementById('nextPuzzleButton').textContent = 'Restart';
//                 }
//             } else if (selectedWord !== word) {
//                 document.getElementById('message').textContent = 'Oops! ' + selectedWord + ' is not the correct word.';
//                 document.getElementById('message').style.color = 'red';

//                 selectedCells.forEach(cell => {
//                     cell.classList.add('wrong');
//                 });

//                 setTimeout(() => {
//                     selectedCells.forEach(cell => {
//                         cell.classList.remove('selected');
//                         cell.classList.remove('wrong');
//                     });
//                 }, 1000);
//             }
//         }
//     };

//     const nextPuzzle = () => {
//         setCurrentPuzzle((currentPuzzle + 1) % puzzles.length);
//     };

//     const showGame = () => {
//         document.getElementById('splashScreen').style.display = 'none';
//         document.getElementById('gameContainer').style.display = 'block';
//     };

//     return (
//         <div>
//             {/* Splash Screen */}
//             <div id="splashScreen">
//                 <h1>Welcome to our website</h1>
//                 <button id="playNowButton" onClick={showGame}>Play Now</button>
//             </div>

//             {/* Game Container (initially hidden) */}
//             <div id="gameContainer" style={{ display: 'none' }}>
//                 <div id="wordDisplay"></div>
//                 <img id="puzzleImage" src="" width="300px" alt="Puzzle Image" />
//                 <div id="puzzle"></div>
//                 <div id="message"></div>
//                 <button id="nextPuzzleButton" style={{ display: 'none' }} onClick={nextPuzzle}>Next Puzzle</button>
//                 <button id="restartButton" style={{ display: 'none' }} onClick={() => setCurrentPuzzle(0)}>Restart</button>
//             </div>
//         </div>
//     );
// };

// export default WordPuzzleGame;
import React, { useState, useEffect, useCallback } from 'react';
import './style8.css'; // Adjust the path if needed

const puzzles = [
  {
    word: "CAT",
    grid: ["C", "A", "T", "L", "B", "A", "U", "Y", "X"],
    image: "/assets/images/cat.gif",
    audio: "/assets/audio/catsound.mp3",
  },
  {
    word: "DOG",
    grid: ["Q", "M", "D", "H", "O", "P", "G", "X", "W"],
    image: "/assets/images/dog1.gif",
    audio: "/assets/audio/dogsound.mp3",
  },
  {
    word: "SUN",
    grid: ["S", "B", "P", "U", "C", "E", "N", "F", "Q"],
    image: "/assets/images/giphy.gif",
    audio: "/assets/audio/sunsound.mp3",
  },
  {
    word: "CAR",
    grid: ["C", "Y", "O", "A", "P", "I", "R", "K", "S"],
    image: "/assets/images/car.gif",
    audio: "/assets/audio/carsound.mp3",
  },
];

const WordPuzzleGame = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [foundWords, setFoundWords] = useState(new Set());
  const [puzzleAudio, setPuzzleAudio] = useState(null);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('black');

  // Function to check if the word is found
  const checkWordFound = useCallback(
    (word) => {
      const selectedCells = document.querySelectorAll('.selected');
      const selectedWord = Array.from(selectedCells)
        .map((cell) => cell.getAttribute('data-letter'))
        .join('');

      if (selectedCells.length === word.length) {
        if (selectedWord === word && !foundWords.has(word)) {
          setFoundWords((prevSet) => new Set(prevSet.add(word)));
          selectedCells.forEach((cell) => {
            cell.classList.add('found');
            cell.classList.remove('selected');
          });
          setMessage('Great! You found the word ' + word + '!');
          setMessageColor('green');
        } else {
          setMessage('Oops! ' + selectedWord + ' is not the correct word.');
          setMessageColor('red');
        }
      }
    },
    [foundWords]
  );

  // Generate the puzzle grid
  const createPuzzleGrid = () => {
    return puzzles[currentPuzzle].grid.map((letter, index) => (
      <div
        key={index}
        className={`cell ${foundWords.has(letter) ? 'found' : ''}`}
        data-letter={letter}
        onClick={(e) => {
          e.target.classList.toggle('selected');
          checkWordFound(puzzles[currentPuzzle].word);
        }}
      >
        {letter}
      </div>
    ));
  };

  // Initialize the current puzzle
  const initializePuzzle = useCallback(() => {
    setFoundWords(new Set());
    setMessage('');
    
    // Load the audio for the puzzle
    const audio = new Audio(puzzles[currentPuzzle].audio);
    audio.preload = 'auto';
    setPuzzleAudio(audio);
  }, [currentPuzzle]);

  useEffect(() => {
    initializePuzzle();
  }, [currentPuzzle, initializePuzzle]);

  const nextPuzzle = () => {
    setCurrentPuzzle((currentPuzzle + 1) % puzzles.length);
  };

  const playAudio = () => {
    if (puzzleAudio) {
      puzzleAudio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  };

  const showGame = () => {
    document.getElementById('splashScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    playAudio(); // Play audio only after user interaction
  };

  return (
    <div>
      {/* Splash Screen */}
      <div id="splashScreen">
        <h1>Welcome to our website</h1>
        <button id="playNowButton" onClick={showGame}>
          Play Now
        </button>
      </div>

      {/* Game Container (initially hidden) */}
      <div id="gameContainer" style={{ display: 'none' }}>
        <div id="wordDisplay"></div>
        <img
          id="puzzleImage"
          src={puzzles[currentPuzzle].image}
          width="300px"
          alt="Puzzle"
        />
        <div id="puzzle">{createPuzzleGrid()}</div>
        <div id="message" style={{ color: messageColor }}>{message}</div>
        <button
          id="nextPuzzleButton"
          onClick={nextPuzzle}
        >
          Next Puzzle
        </button>
      </div>
    </div>
  );
};

export default WordPuzzleGame;

    
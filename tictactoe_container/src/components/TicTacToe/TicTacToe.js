import React, { useState, useEffect } from 'react';

// PUBLIC_INTERFACE
const TicTacToe = () => {
  // Game state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameStatus, setGameStatus] = useState('Playing');

  /**
   * Checks if there's a winner based on current board state
   * @param {Array} squares - Current board state
   * @returns {string|null} - Returns 'X', 'O', or null
   */
  const calculateWinner = (squares) => {
    const winningLines = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal
      [2, 4, 6], // Diagonal
    ];

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  /**
   * Handles a player's move
   * @param {number} index - Index of the clicked square
   */
  const handleClick = (index) => {
    // If square is filled or game is won, return
    if (board[index] || winner) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  /**
   * Resets the game to initial state
   */
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameStatus('Playing');
  };

  // Check for winner or draw after each move
  useEffect(() => {
    const currentWinner = calculateWinner(board);
    if (currentWinner) {
      setWinner(currentWinner);
      setGameStatus(`Winner: ${currentWinner}`);
    } else if (!board.includes(null)) {
      setGameStatus('Draw!');
    }
  }, [board]);

  // Render a single square
  const Square = ({ value, onClick }) => (
    <button
      className="game-square"
      onClick={onClick}
      style={{
        width: '60px',
        height: '60px',
        margin: '4px',
        fontSize: '24px',
        fontWeight: 'bold',
        backgroundColor: 'var(--kavia-dark)',
        border: '2px solid var(--border-color)',
        color: value === 'X' ? 'var(--kavia-orange)' : 'var(--text-color)',
        cursor: 'pointer',
      }}
    >
      {value}
    </button>
  );

  return (
    <div className="game-container" style={{ textAlign: 'center' }}>
      <h2 style={{ color: 'var(--text-color)' }}>Tic Tac Toe</h2>
      <div className="game-status" style={{ margin: '20px 0', color: 'var(--text-secondary)' }}>
        {!winner && !gameStatus.includes('Draw') && `Next Player: ${isXNext ? 'X' : 'O'}`}
        {gameStatus !== 'Playing' && gameStatus}
      </div>
      <div className="game-board" style={{ display: 'inline-block' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)' }}>
          {board.map((square, index) => (
            <Square
              key={index}
              value={square}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button className="btn" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;

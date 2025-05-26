import React from 'react';
import './App.css';
import TicTacToe from './components/TicTacToe/TicTacToe';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> TicTacToe Challenge
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="hero">
            <TicTacToe />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

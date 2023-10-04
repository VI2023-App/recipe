import './App.css';
import './index.css'
import React from 'react';
import Header from './components/Header';
import Home from './components/Home';

function App() {

  return (
    <div className="App bg-ghostWhite">
      <Header />
      <Home />
    </div>
  );
}

export default App;

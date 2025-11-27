import React from 'react';
import { Route, Routes } from 'react-router';

import Header from './components/Header/Header';
import GamePage from './pages/GamePage/GamePage';
import HomePage from './pages/HomePage/HomePage';

import * as classes from './global.module.css';

function App() {
  return (
    <div className={classes.container}>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/game/:id" element={<GamePage />} />
      </Routes>
    </div>
  );
}

export default App;

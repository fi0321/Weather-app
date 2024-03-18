import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './Components/pages/HomePage';
import GamePage from './Components/pages/GamePage';
// Import other pages here

function App() {
  return (
    <Router>
      <div>
        {/* Place any global components like a navigation bar here */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/game' element={<GamePage />} />
          {/* Define more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

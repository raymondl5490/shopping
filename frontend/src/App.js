import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShoppingList from './components/ShoppingList';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShoppingList />} />
      </Routes>
    </Router>
  );
}

export default App;

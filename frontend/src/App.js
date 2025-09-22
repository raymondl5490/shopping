import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './store';
import ShoppingList from './components/ShoppingList';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ShoppingList />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

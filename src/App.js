/* eslint-disable require-jsdoc */
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import User from './pages/User/User';

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/user/:id" exact element={<User />} />
    </Routes>
  );
}

export default App;

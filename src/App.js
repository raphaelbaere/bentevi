/* eslint-disable require-jsdoc */
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import User from './pages/User/User';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<SignUp />} />
      <Route path="/home" exact element={<Home />} />
      <Route path="/user/:id" exact element={<User />} />
      <Route path="/profile" exact element={ <Profile />} />
    </Routes>
  );
}

export default App;

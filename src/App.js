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
      <Route path="/" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="/profile" element={ <Profile />} />
    </Routes>
  );
}

export default App;

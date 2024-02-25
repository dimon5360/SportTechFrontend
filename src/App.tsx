
import "./App.css";

import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import About from './components/About/About';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <h1>hello world</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App
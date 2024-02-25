
import "./App.css";

import { Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import About from './components/About/About';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import DetailProfile from './components/Profile/DetailProfile';
import CreateProfile from "./components/Profile/CreateProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="create-profile" element={<CreateProfile />} />
        <Route path="profile/:uuid" element={<DetailProfile />} />
      </Routes>
    </div>
  );
}

export default App
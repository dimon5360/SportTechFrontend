
import "./App.css";

import { Routes, Route } from 'react-router-dom';

import Home from './components/Common/Home/Home';
import About from './components/Common/About/About';
import Login from './components/Services/Auth/Login';
import Register from './components/Services/Auth/Register';
import DetailProfile from './components/Services/Profile/DetailProfile';
import CreateProfile from "./components/Services/Profile/CreateProfile";
import User from "./components/Services/User/User";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="user/:uuid" element={<User />} />

        <Route path="profile/:uuid" element={<DetailProfile />} />
        <Route path="create-profile" element={<CreateProfile />} />
      </Routes>
    </div>
  );
}

export default App
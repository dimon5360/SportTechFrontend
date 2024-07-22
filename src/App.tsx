
import "./App.css";

import { Routes, Route } from 'react-router-dom';

import { Home } from './Common/Components/Home/Home';
import { About } from './Common/Components/About/About';
import { Login } from './Services/Auth/Login';
import { Register } from './Services/Auth/Register';
import DetailProfile from './Services/Profile/DetailProfile';
import CreateProfile from "./Services/Profile/CreateProfile";
import User from "./Services/User/User";

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="user/:id" element={<User />} />
        <Route path="profile/:id" element={<DetailProfile />} />
        <Route path="create-profile" element={<CreateProfile />} />
      </Routes>
    </div>
  );
}
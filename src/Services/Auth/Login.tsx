
import { useState } from "react";
import { Header } from '../../Common/Components/Header/Header';
import { Button } from '../../Common/Components/Button/Button';

import { credentialValidating } from "./Validating";

import { Link } from 'react-router-dom';
import { api } from '../../Common/api/api';
import { Footer } from "../../Common/Components/Footer/Footer";

import Cookies from 'js-cookie';
import bcrypt from "bcryptjs-react";

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault()
    try {

      if (!credentialValidating(email, password)) {
        alert("Invalid email or password")
        return
      }

      const salt = "$2a$10$izKz/96Rs.94DDYoqO9Vi.";

      api.post('login', {
        email: email,
        password: bcrypt.hashSync(password, salt)
      })
        .then(function (response) {

          console.log(response.headers)
          console.log(response.data)

          if (response.status === 200) {
            localStorage.setItem("refresh-token", response.data["refresh-token"])
            window.location.href = '/profile/' + Cookies.get("user_id")
          }
        })
        .catch(function (error) {
          console.log("login status code: " + error.response.status)
          // window.location.href = '/login'
        })
        .finally(function () {
          // always executed
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Email">Email:</label>
        </div>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

        <div>
          <label htmlFor="Password">Password:</label>
        </div>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <div>
          <Button onClick={handleSubmit}>Log In</Button>
        </div>

        <div>
          <Link to="/">
            <Button>Main</Button>
          </Link>
        </div>
      </form>
      <Footer />
    </div>
  )
}
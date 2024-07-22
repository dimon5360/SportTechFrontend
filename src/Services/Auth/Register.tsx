
import { useState } from "react";
import { Header } from '../../Common/Components/Header/Header';
import { Button } from '../../Common/Components/Button/Button';
import { Footer } from "../../Common/Components/Footer/Footer";
import { api } from '../../Common/api/api';

import { credentialValidating } from "./Validating";

import { Link } from 'react-router-dom';

import bcrypt from "bcryptjs-react";

export const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnclick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {

      if (!credentialValidating(email, password)) {
        alert("Invalid email or password")
        return
      }

      const salt = "$2a$10$izKz/96Rs.94DDYoqO9Vi.";

      api.post('auth/register', {
        email: email,
        password: bcrypt.hashSync(password, salt)
      })
        .then(function (response) {
          console.log(response.headers)
          console.log(response.data)
        })
        .catch(function (error) {
          console.log("login status code: " + error.response.status)
        })
        .finally(function () {
          // always executed
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    < div >
      <Header />
      <form>
        <div>
          <label htmlFor="Email">Email:</label>
        </div>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

        <div>
          <label htmlFor="Password">Password:</label>
        </div>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <div>
          <Button onClick={handleOnclick}>Sing Up</Button>
        </div>

        <div>
          <Link to="/">
            <Button>Main</Button>
          </Link>
        </div>
      </form>
      <Footer />
    </div >
  )
}

import React from "react";
import Header from '../../Common/Header/Header';
import Button from '../../Common/Button/Button';

import { credentialValidating } from "./Validating";
import Cookies from 'js-cookie';
import bcrypt from "bcryptjs-react";

import { Link } from 'react-router-dom';
import axios from "axios";

interface Props {
  
}

const PREFIX = "/api/v1/"

type State = { email: string, password: string };

class Login extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props);

    this.state = state;
    this.login = this.login.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleEmail(event : React.FormEvent<HTMLInputElement>) {
    this.setState({ email: event.currentTarget.value });
  }

  handlePassword(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ password: event.currentTarget.value  });
  }

  async login() {

    try {

      const pass = this.state.password;
      const email = this.state.email;

      if (!credentialValidating(email, pass)) {
        alert("Invalid email or password")
        return
      }

      const salt = "$2a$10$izKz/96Rs.94DDYoqO9Vi.";

      axios.post(PREFIX + 'login', {
        email: this.state.email,
        password: bcrypt.hashSync(this.state.password, salt)
      })
      .then(function (response) {

        console.log(response.headers)

        if (response.status === 200) {
          Cookies.set("refresh-token", response.headers["authorization"]) // TODO: replace to redux
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
  }

  render() {
    return (
      <div className="container">
        <Header />
        <div className="col-lg-12">
          <div>
            <label htmlFor="Email">Email:</label>
          </div>
          <input type="text" value={this.state.email} onChange={this.handleEmail} />

          <div>
            <label htmlFor="Password">Password:</label>
          </div>
          <input type="password" value={this.state.password} onChange={this.handlePassword} />

          <div>
            <Button onClick={this.login}>Log In</Button>
          </div>

          <div>
            <Link to="/">
              <Button>Main</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
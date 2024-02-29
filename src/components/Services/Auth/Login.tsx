
import React from "react";
import Header from '../../Common/Header/Header';
import Button from '../../Common/Button/Button';

import { creadentialValidating } from "./Validating";
import Cookies from 'js-cookie';
import bcrypt from "bcryptjs-react";

import { Link } from 'react-router-dom';
import axios from "axios";

interface Props {
  
}

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

    const pass = this.state.password;
    const email = this.state.email;

    if (!creadentialValidating(email, pass)) {
      alert("Invalid email or password")
      return
    }

    let salt = "$2a$10$izKz/96Rs.94DDYoqO9Vi.";

    axios.post('api/v1/user/login', {
      email: this.state.email,
      password: bcrypt.hashSync(this.state.password, salt)
    })
      .then(function (response) {

        let data = response.data;

        Cookies.set('access_token', data['access_token'])
        Cookies.set('refresh_token', data['refresh_token'])
        Cookies.set('user_id', data['user_id'])

        window.location.href = '/profile/get/' + Cookies.get("user_id")
      })
      .catch(function (error) {

        console.log(error);
      })
      .finally(function () {
        // always executed
      });
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
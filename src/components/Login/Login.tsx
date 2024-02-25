
import React from "react";
import Header from '../Header/Header';
import Button from '../Button/Button';

import Cookies from 'js-cookie';
import bcrypt from "bcryptjs-react";

import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };

    this.login = this.login.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  inputValidating() {
    return this.state.email.length !== 0 && this.state.password.length !== 0
  }

  async login() {
    
    if (!this.inputValidating()) {
      alert("You should enter email and password")
      return
    }

    let pass = this.state.password;
    let salt = "$2a$10$izKz/96Rs.94DDYoqO9Vi.";
    const hash = bcrypt.hashSync(pass, salt);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.state.email, password: hash })
    };

    const response = await fetch('/api/v1/login', requestOptions);
    if (!response.ok) {
      alert("HTTP status " + response.status);
      return response.status;
    }    

    let data = await response.json();

    Cookies.set('access_token', data['access_token'])
    Cookies.set('refresh_token', data['refresh_token'])
    Cookies.set('user_id', data['user_id'])
    
    window.location.reload(false);
    return data;
  }

  render() {
    return (
      <div className="container">
        <Header />
        <div className="col-lg-12">
          <form onSubmit={this.login}>
            <div>
              <label htmlFor="Email">Email:</label>
            </div>
            <input type="text" value={this.state.email} onChange={this.handleEmail} />

            <div>
              <label htmlFor="Password">Password:</label>
            </div>
            <input type="password" value={this.state.password} onChange={this.handlePassword} />

            <div>
              <Link to="/profile">
                <Button onClick={this.login}>Sign In</Button>
              </Link>
            </div>
          </form>
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

import React from "react";
import Header from '../Header/Header';
import Button from '../Button/Button';

import { Link } from 'react-router-dom';
import bcrypt from "bcryptjs-react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);

    this.register = this.register.bind(this);
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

  async register() {

    if (!this.inputValidating()) {
      alert("You should enter email, username and password")
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

    const response = await fetch('/api/v1/register', requestOptions);

    console.log(response);

    if (response.redirected) {
      window.location = response.url;
    }
    // if (!response.ok) {      
      return response.status;
    // }

    // let data = await response.json();

    // window.location.reload(false);
    // return data;
  }

  render() {
    return (
      <div className="container">
        <Header />
        <div className="col-lg-12">
          <form onSubmit={this.signin}>
            <div>
              <div>
                <label htmlFor="Email">Email:</label>
              </div>
              <input type="text" value={this.state.email} onChange={this.handleEmail} />
            </div>

            <div>
              <div>
                <label htmlFor="Password">Password:</label>
              </div>
              <input type="password" value={this.state.password} onChange={this.handlePassword} />
            </div>

            <div>
              <Link to="/">
                <Button onClick={this.register}>Sign Up</Button>
              </Link>
            </div>
          </form>
          <div>
            <Link to="/">
              <Button >Main</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
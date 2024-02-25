
import React from "react";
import Header from '../Header/Header';
import Button from '../Button/Button';

import { Link } from 'react-router-dom';
import { unauthenticate, isAuthenticated } from '.'
import Cookies from "js-cookie";
import axios from "axios";

const PREFIX = "/api/v1/"

class CreateProfile extends React.Component {
  constructor() {
    super();
    this.state = { username: '', firstname: '', lastname: '', isProfileExist: false };

    this.addProfile = this.addProfile.bind(this);

    this.handleUsername = this.handleUsername.bind(this);
    this.handleFirstname = this.handleFirstname.bind(this);
    this.handleLastname = this.handleLastname.bind(this);
  }

  logout() {
    unauthenticate()
  }

  handleUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleFirstname(event) {
    this.setState({ firstname: event.target.value });
  }

  handleLastname(event) {
    this.setState({ lastname: event.target.value });
  }

  async addProfile() {

    const uuid = Cookies.get("user_id")

    axios.post(PREFIX + 'create-profile', {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      user_id: uuid
    })
      .then(function (response) {

        window.location.href = 'profile/' + uuid;
      })
      .catch(function (error) {

        console.log(error);
        window.location.href = '/';
      })
      .finally(function () {
        // always executed
      });
  }

  renderCreateProfile() {
    return (
      <div className="container">
        <Header />
        <div className="col-lg-12">
          <div>
            <label htmlFor="Username">Username:</label>
          </div>
          <input type="text" value={this.state.username} onChange={this.handleUsername} />

          <div>
            <label htmlFor="Firstname">Firstname:</label>
          </div>
          <input type="text" value={this.state.firstname} onChange={this.handleFirstname} />

          <div>
            <label htmlFor="Lastname">Lastname:</label>
          </div>
          <input type="text" value={this.state.lastname} onChange={this.handleLastname} />

          <div>
            <Button onClick={this.addProfile}>Save profile</Button>
          </div>
          <div>
            <Link to="/">
              <Button onClick={this.logout}>Sign Out</Button>
            </Link>
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
  render() {
    return this.renderCreateProfile()
  }
}
export default CreateProfile
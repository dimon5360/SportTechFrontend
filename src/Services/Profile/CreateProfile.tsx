
import React from "react";
import { Header } from '../../Common/Components/Header/Header';
import { Button } from '../../Common/Components/Button/Button';

import { Link } from 'react-router-dom';
import { unauthenticate } from '.'
import Cookies from "js-cookie";
import axios from "axios";

const PREFIX = "/api/v1/"

interface Props {

}
type State = { username: string, firstname: string, lastname: string };

class CreateProfile extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props);

    this.state = state;

    this.addProfile = this.addProfile.bind(this);

    this.handleUsername = this.handleUsername.bind(this);
    this.handleFirstname = this.handleFirstname.bind(this);
    this.handleLastname = this.handleLastname.bind(this);
  }

  componentDidMount() {
    console.log("mount create profile component")
  }

  logout() {
    unauthenticate()
  }

  handleUsername(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ username: event.currentTarget.value });
  }

  handleFirstname(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ firstname: event.currentTarget.value });
  }

  handleLastname(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ lastname: event.currentTarget.value });
  }

  async addProfile() {

    const user_id =  Cookies.get("user_id")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': Cookies.get("access-token")
    }

    await axios.post(PREFIX + 'create-profile/' + user_id, {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      user_id: user_id
    }, {
      headers: headers,
    })
    .then(function (response) {

      if (response.request.redirected) {
        console.log("redirected")
      }

      console.log("create profile response")
      console.log(response.data.url)
    })
    .catch(function (error) {

      console.log(error);
      // window.location.href = '/';
      return Promise.reject(error);
    })
    .finally(function () {
      // always executed
    });
    window.location.reload()
  }

  render() {
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
}
export default CreateProfile
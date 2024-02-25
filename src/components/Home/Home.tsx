
import React from "react";
import Header from '../Header/Header';
import Button from '../Button/Button';

import { isAuthenticated } from '.'

import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

class Home extends React.Component {

  // componentDidMount() {
  //   if (isAuthenticated()) {
  //     window.location.href = "/profile/" + Cookies.get("user_id")
  //   }
  // }

  render() {
    return (
      <div className="container">
        <Header />
        <div className="col-xs-8 col-xs-offset-2 jumbotron text-center">
          <div>
            <Link to="login">
              <Button>Sign In</Button>
            </Link>
          </div>

          <div>
            <Link to="register">
              <Button>Sign Up</Button>
            </Link>
          </div>

          <div>
            <Link to="about">
              <Button>About</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
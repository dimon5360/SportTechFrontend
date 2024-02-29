
import React from "react";
import Header from '../Header/Header';
import Button from '../Button/Button';

import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


export const getAccessToken = () => Cookies.get('access_token')
export const getRefreshToken = () => Cookies.get('refresh_token')
export const isAuthenticated = () => !!getAccessToken()

export const authenticate = async () => {

    return isAuthenticated()
}

class Home extends React.Component {

  componentDidMount(): void {
    if (isAuthenticated()) {
      window.location.href = "/profile/get/" + Cookies.get("user_id")
    }
  }

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
            <Link to="signup">
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

import { Header } from '../Header/Header';
import { Button } from '../Button/Button';

import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


export const getAccessToken = () => Cookies.get('access-token')
export const getRefreshToken = () => Cookies.get('refresh-token')
export const isAuthenticated = () => !!getAccessToken()

export const authenticate = async () => {

    return isAuthenticated()
}

export function Home() {

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
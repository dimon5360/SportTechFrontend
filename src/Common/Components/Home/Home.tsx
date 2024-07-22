
import { Header } from '../Header/Header';
import { Button } from '../Button/Button';

import { Link } from 'react-router-dom';

export const Home = () => {

  return (
    <div className="container">
      <Header />
      <div className="col-xs-8 col-xs-offset-2 jumbotron text-center">
        <div>
          <Link to="auth/login">
            <Button>Log In</Button>
          </Link>
        </div>

        <div>
          <Link to="auth/register">
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
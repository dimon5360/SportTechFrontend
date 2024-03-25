
import { Header } from '../Header/Header';
import { Button } from '../Button/Button';

import { Link } from 'react-router-dom';

export function About() {
  return (
      <div className="container">
      <Header />
      <div className="col-xs-8 col-xs-offset-2 jumbotron text-center">
        <Link to="/">
          <Button>
            Main
          </Button>{' '}
        </Link>
      </div>
    </div>
  );
}
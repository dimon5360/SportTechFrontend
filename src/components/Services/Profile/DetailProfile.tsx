
import React from "react";
import Header from '../../Common/Header/Header';
import Button from '../../Common/Button/Button';

import { Link } from 'react-router-dom';
import { unauthenticate, isAuthenticated } from '.'
import Cookies from "js-cookie";

interface Props {
  
}
type State = { username: string, firstname: string, lastname: string };

class DetailProfile extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props);

        this.state = state;

        this.fetchProfile = this.fetchProfile.bind(this);

        this.handleUsername = this.handleUsername.bind(this);
        this.handleFirstname = this.handleFirstname.bind(this);
        this.handleLastname = this.handleLastname.bind(this);
    }

    componentDidMount() {
        this.fetchProfile();
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

    async fetchProfile() {
        try {
            const response = await fetch('/api/v1/profile/get/' + Cookies.get("user_id"));
            if (response.redirected) {
                window.location.href = response.url;
            }

            let data = await response.json();

            this.setState({ username: data['username'] });
            this.setState({ firstname: data['firstname'] });
            this.setState({ lastname: data['lastname'] });

            return data;

        } catch (error) {
            console.error('Error refresh profile:', error);
        }
    };

    renderProfile() {
        return (
            <div className="container">
                <Header />
                <div className="col-lg-12">
                    <div>
                        <h3>
                            Username: {this.state.username}
                        </h3>
                        <h3>
                            Firstname: {this.state.firstname}
                        </h3>
                        <h3>
                            Lastname: {this.state.lastname}
                        </h3>
                        <div>
                            <Link to="/">
                                <Button onClick={this.logout}>Sign Out</Button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/about">
                                <Button>About</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderIdle() {
        return (
            <div className="container">
                <Header />
                <div className="col-lg-12">
                    <div>
                        <Link to="/">
                            <Button>Main</Button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/about">
                            <Button>About</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        if (!isAuthenticated()) {
            return this.renderIdle()

        }

        return this.renderProfile()
    }
}
export default DetailProfile
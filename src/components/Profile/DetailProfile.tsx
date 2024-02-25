
import React from "react";
import Header from '../Header/Header';
import Button from '../Button/Button';

import { Link } from 'react-router-dom';
import { unauthenticate, isAuthenticated } from '.'
import Cookies from "js-cookie";

class DetailProfile extends React.Component {
    constructor() {
        super();
        this.state = { username: '', firstname: '', lastname: '' };

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

    handleUsername(event) {
        this.setState({ username: event.target.value });
    }

    handleFirstname(event) {
        this.setState({ firstname: event.target.value });
    }

    handleLastname(event) {
        this.setState({ lastname: event.target.value });
    }

    async fetchProfile() {
        try {
            const response = await fetch('/api/v1/profile/' + Cookies.get("user_id"));
            if (response.redirected) {
                window.location = response.url;
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
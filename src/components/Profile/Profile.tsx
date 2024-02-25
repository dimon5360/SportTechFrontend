
import React from "react";
import Header from '../Header/Header';
import Button from '../Button/Button';

import { Link } from 'react-router-dom';
import { unauthenticate, isAuthenticated } from '.'
import Cookies from "js-cookie";

class Profile extends React.Component {
    constructor() {
        super();
        this.state = { username: '', firstname: '', lastname: '', isProfileExist: false };

        this.fetchProfile = this.fetchProfile.bind(this);
        this.addProfile = this.addProfile.bind(this);

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

    async addProfile() {
        try {
            const uuid = Cookies.get("user_id")

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: this.state.username,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    user_id: uuid
                })
            };

            const response = await fetch('https://192.168.1.82:40401/api/v1/profile', requestOptions);
            if (!response.ok) {
                alert("HTTP status " + response.status);
                return response.status;
            }

            window.location.reload();
            return response.status;

        } catch (error) {
            console.error('Error creating profile:', error);
        }
    }

    async fetchProfile() {
        try {
            const response = await fetch('/api/v1/profile/' + Cookies.get("user_id"));
            if (!response.ok) {
                return response.status;
            }

            this.isProfileExist = true;

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
                        <h1>
                            Username: {this.state.username}
                        </h1>
                        <h1>
                            Firstname: {this.state.firstname}
                        </h1>
                        <h1>
                            Lastname: {this.state.lastname}
                        </h1>
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

    renderCreateProfile() {
        return (
            <div className="container">
                <Header />
                <div className="col-lg-12">
                    <form onSubmit={this.login}>
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
                            <Link to="/profile" refresh="true">
                                <Button onClick={this.addProfile}>Save profile</Button>
                            </Link>
                        </div>
                        <div>
                            <Link to="/">
                                <Button onClick={this.logout}>Sign Out</Button>
                            </Link>
                        </div>
                    </form>
                    <div>
                        <Link to="/">
                            <Button>Main</Button>
                        </Link>
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

        if (!this.isProfileExist) {
            return this.renderCreateProfile()
        }

        return this.renderProfile()
    }
}
export default Profile
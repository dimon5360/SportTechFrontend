
import React from "react";
import { Header } from '../../Common/Components/Header/Header';
import { Button } from '../../Common/Components/Button/Button';

import { Link } from 'react-router-dom';
import { unauthenticate, isAuthenticated } from '.'
import Cookies from "js-cookie";
import axios from "axios";

interface Props {

}

const PREFIX = "/api/v1/"

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
        this.fetchProfile().then(r => { console.log("fetch profile result: " + r) });
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
            const user_id =  Cookies.get("user_id")
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get("access-token")
            }

            axios.get(PREFIX + 'profile/' + user_id, {
                headers: headers,
            })
            .then((response) => {
                console.log(response.status)

                if (response.request.redirected) {
                    console.log("redirected")
                }

                const data = response.data;

                this.setState({ username: data['username'] });
                this.setState({ firstname: data['firstname'] });
                this.setState({ lastname: data['lastname'] });

            })
            .catch(function (error) {
                console.log("fetch profile info status code: " + error.response.status)
                if (error.response) {
                    if (error.response.status === 302) {
                        console.log("redirect")
                    }
                }
                console.log(error);
                // window.location.href = "/login"
            })
            .finally(function () {
                // always executed
            });
        } catch (error) {
            console.error('Error refresh profile:', error);
            // window.location.href = "/login"
        }
    }

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
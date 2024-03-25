import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Header } from '../../Common/Components/Header/Header';
import { Button } from '../../Common/Components/Button/Button';
import {Link} from "react-router-dom";

const PREFIX = "/api/v1/"

class User extends React.Component {

    componentDidMount() {
        this.fetchUserInfo();
    }

    fetchUserInfo() {

        console.log("fetch user info")
        try {

            const user_id =  Cookies.get("user_id")
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get("access-token")
            }

            axios.get(PREFIX + 'user/' + user_id, {
                headers: headers,
            })
            .then(function (response){
                console.log("fetch user info response code: " + response.status)
                // window.location.href = response.request.responseURL;
            })
            .catch(function (error) {
                console.log("fetch user info error code: " + error.response.status)
            })
            .finally(function () {
                // always executed
            });

        } catch (error) {
            console.error('Error fetch user info:', error);
            // window.location.href = "/login"
        }
    }

    render() {
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
}

export default User;
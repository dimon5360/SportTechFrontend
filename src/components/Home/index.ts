
import Home from "./Home.tsx";
import Cookies from 'js-cookie'

export const getAccessToken = () => Cookies.get('access_token')
export const getRefreshToken = () => Cookies.get('refresh_token')
export const isAuthenticated = () => !!getAccessToken()

export const authenticate = async () => {

    return isAuthenticated()
}

export default Home;
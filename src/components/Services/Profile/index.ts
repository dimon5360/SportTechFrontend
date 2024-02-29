import Cookies from "js-cookie";

export const getAccessToken = () => Cookies.get('access_token')
export const isAuthenticated = () => !!getAccessToken()

export const unauthenticate = async () => {

    Cookies.remove('access_token')
    Cookies.remove('user_id')
    return true
}

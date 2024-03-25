import Cookies from "js-cookie";

export const getAccessToken = () => Cookies.get('access-token')
export const isAuthenticated = () => !!getAccessToken()

export const unauthenticate = async () => {

    Cookies.remove('access-token')
    Cookies.remove('refresh-token')
    return true
}

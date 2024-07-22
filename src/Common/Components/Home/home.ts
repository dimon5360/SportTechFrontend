
import Cookies from 'js-cookie';

export const getAccessToken = () => Cookies.get('access-token')
export const getRefreshToken = () => Cookies.get('refresh-token')
export const isAuthenticated = () => !!getAccessToken()

export const authenticate = async () => {
  return isAuthenticated()
}
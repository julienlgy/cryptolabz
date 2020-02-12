const BASE_URL = "http://localhost:8000"
const ROUTE_CRYPTO = "/cryptos?cmids="
const ROUTE_USER_LOGIN = "/users/login"
const ROUTE_USER_REGISTER = "/users/register"
const ROUTE_USER_UPDATE = "/users/update"
const ROUTE_HOMEPAGE = "/cryptos/get/home"

class API {
  url = BASE_URL

  url_login = BASE_URL + ROUTE_USER_LOGIN
  url_register = BASE_URL + ROUTE_USER_REGISTER
  url_user_update = BASE_URL + ROUTE_USER_UPDATE

  url_crypto_home = BASE_URL + ROUTE_HOMEPAGE
  url_crypto = BASE_URL + ROUTE_CRYPTO

  getAuthHeaders(){
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }
    }
  }
}

export default API = new API()

const BASE_URL = "http://127.0.0.1:8000"
const ROUTE_CRYPTO = "/cryptos?cmids="
const ROUTE_LOGIN = "/users/login"
const ROUTE_REGISTER = "/users/register"
const ROUTE_USER_UPDATE = "/users/update"

class API {
  url = BASE_URL

  url_login = BASE_URL + ROUTE_LOGIN
  url_register = BASE_URL + ROUTE_REGISTER
  url_user_update = BASE_URL + ROUTE_USER_UPDATE

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

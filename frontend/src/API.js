const BASE_URL = "http://localhost:8000"
const ROUTE_CRYPTO = "/cryptos?cmids="
const ROUTE_LOGIN = "/users/login"
const ROUTE_REGISTER = "/users/register"
const ROUTE_UPDATE = "/users/update"
const ROUTE_HOMEPAGE = "/cryptos/get/home"

class API {
  url = BASE_URL

  url_login = BASE_URL + ROUTE_LOGIN
  url_register = BASE_URL + ROUTE_REGISTER
  url_update = BASE_URL + ROUTE_UPDATE

  url_crypto = BASE_URL + ROUTE_CRYPTO
  url_crypto_home = BASE_URL + ROUTE_HOMEPAGE
}

export default API = new API()

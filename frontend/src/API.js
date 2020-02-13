const BASE_URL = "http://localhost:8000"
const ROUTE_CRYPTO_ALL = "/cryptos/get/all"
const ROUTE_CRYPTO_HISTO = "/cryptos/history/"
const ROUTE_CRYPTO_HISTO_DAILY = "/daily"
const ROUTE_CRYPTO_HISTO_HOURLY = "/hourly"
const ROUTE_CRYPTO_HISTO_MINUTE = "/minute"
const ROUTE_HOMEPAGE = "/cryptos/get/home"
const ROUTE_CRYPTO_ID = "/cryptos?cmids="
const ROUTE_CRYPTO_DELETE = "/cryptos?cmid="
const ROUTE_USER_ALL = "/users/get/all"
const ROUTE_USER_LOGIN = "/users/login"
const ROUTE_USER_REGISTER = "/users/register"
const ROUTE_USER_UPDATE = "/users/update"

class API {
  url = BASE_URL;

  url_login = BASE_URL + ROUTE_USER_LOGIN;
  url_register = BASE_URL + ROUTE_USER_REGISTER;
  url_user_all = BASE_URL + ROUTE_USER_ALL;
  url_user_update = BASE_URL + ROUTE_USER_UPDATE;

  url_crypto_all = BASE_URL + ROUTE_CRYPTO_ALL;
  url_crypto_delete = BASE_URL + ROUTE_CRYPTO_DELETE;
  url_crypto_home = BASE_URL + ROUTE_HOMEPAGE;
  url_crypto = BASE_URL + ROUTE_CRYPTO_ID;

  url_crypto_histo = BASE_URL + ROUTE_CRYPTO_HISTO
  post_crypto_histo_daily = ROUTE_CRYPTO_HISTO_DAILY
  post_crypto_histo_hourly = ROUTE_CRYPTO_HISTO_HOURLY
  post_crypto_histo_minute = ROUTE_CRYPTO_HISTO_MINUTE
  
  url_coinbase_top =
    "https://www.coinbase.com/api/v2/assets/summary?&base=EUR&filter=listed&include_prices=true&resolution=day";

  getAuthHeaders(){
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.token
      }
    };
  }
}

export default API = new API();

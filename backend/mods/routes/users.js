/**
 * Cryptolabz 2020
 * Routes cryptos
 * last modified : 20/01/2020
 */

const Config = require(__dirname + "/../config");
var express = require("express");
var router = express.Router();

const UserController = require(__dirname + "/../controller/usercontroller");
const TokenController = require(__dirname + "/../controller/tokencontroller");
var userController = new UserController();
var tokenController = new TokenController();

/**
 * GET / LOGIN
 *
 * The user MUST NOT be logged on. Simple authentication by username/password, if successful, a
 * session is started.
 */
router.post("/login", function(req, res, next) {
  if (!tokenController.check(req)) {
    userController.login(req.body).then(result => {
      if (result.status)
        result["token"] = tokenController.sign({ id: result.id });
      res.json(result);
    });
  } else {
    res.json({
      status: false,
      message: "already_logged"
    });
  }
});

/**
 * POST / REGISTER
 *
 * The user MUST NOT be logged on. Register a user by sending a form.
 */
router.post("/register", function(req, res, next) {
  if (!tokenController.check(req)) {
    userController.register(req.body).then(result => {
      if (result.status)
        result["token"] = tokenController.sign({ id: result.id });
      res.json(result);
    });
  } else {
    res.json({
      status: false,
      message: "already_logged"
    });
  }
});

/**
 * GET / AUTH
 *
 * provider: facebook, twitter, google, etc. The user MUST NOT be logged on. Oauth2 authentication.
 */
router.get("/auth/:provider", (req, res, next) => {
  var provider = req.params.provider;
  if (Config.oauth.enabled.includes(provider)) {
    res.json({
      status: false,
      message: "This provider is under maintenance."
    });
  } else {
    res.json({
      status: false,
      message: "Unknown provider : " + provider
    });
  }
});

/**
 * GET / AUTH-CALLBACK
 *
 * provider: facebook, twitter, google, etc. The user MUST NOT be logged on. On this route we can
 * retrieve user’s information transmitted by the third party service (or an error issued by it). This is where
 * your API validates (or not) the user’s authentication and therefore starts (or doesn’t start) a session
 */
router.get("/auth/:provider/callback", (req, res, next) => {
  if (Config.webserver.oauth.includes(provider)) {
    res.json({
      status: false,
      message: "This provider is under maintenance."
    });
  } else {
    res.json({
      status: false,
      message: "Unknown provider : " + provider
    });
  }
});

/**
 * POST / LOGOUT
 *
 * The user MUST be logged on. The user disconnects, so you must end your session
 */
router.post("/logout", (req, res, next) => {
  if (tokenController.check(req)) {
    res.json({
      status: true
    });
  } else {
    res.json({ status: false });
  }
});

/**
 * GET / PROFILE
 *
 * The user MUST be logged on. Retrieving profile information.
 */
router.get("/profile", (req, res, next) => {
  if (tokenController.check(req)) {
    return res.json(tokenController.check(req));
  } else next();
});

/**
 * PUT / PROFILE
 *
 * The user MUST be logged on. Update profile information, which is at least:
 *   -> a nickname (their default email)
 *   -> a default currency for the price of crypto-currencies (default: EUR)
 *   -> a list of cryto-currencies, to appear on their home page
 *   -> a list of keywords, for their press review
 */
router.put("/profile", (req, res, next) => {
  if (tokenController.check(req)) {
    userController
      .update(tokenController.check(req)["id"], req.body)
      .then(result => {
        res.json(result);
      });
  } else next();
});

module.exports = router;

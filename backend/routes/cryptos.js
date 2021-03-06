/**
 * Cryptolabz 2020
 * Routes cryptos
 * last modified : 20/01/2020
 */
var express = require('express')
var router = express.Router()

/**
 * GET / CRYPTOS
 * 
 * cmids: cryptocurrencies’ Ids. User MAY be logged in OR NOT. Get the list of
 * crypto-currencies and their info, which is at least:
 * -> full name of the cryptocurrency.
 * -> current price
 * -> opening price
 * -> lowest price of the day
 * -> highest price of the day
 * -> URL of the corresponding image of the cryptocurrency
 */
router.get("/", (req, res, next) => {
 res.json({});
});

/**
 * GET / CRYTPO
 * 
 * cmid: cryptocurrency Id. User MUST be logged in. Returns information about a cryptocurrency.
 */
router.get("/:cmid", (req, res, next) => {

});

/**
 * GET / CRYPTO HISTORY
 * 
 * cmid: cryptocurrency Id. period: daily, hourly or minute. User MUST be logged in. Provides the price
 * history of a cryptocurrency. For each period:
 * -> opening, highest, lowest and closing exchange rates
 * Depending on the periods, the history is shorter or longer
 * -> daily: Last 60 days, so 60 periods a day
 * -> hourly: 48 last hours, so 48 periods of one hour
 * -> minute: last 2 hours, so 60 periods of one minute
 */
router.get("/:cmid/history/:period", (req, res, next) => {

})

/**
 * POST / CRYPTO
 * 
 * User MUST be logged in as well as the ADMINISTRATOR. Add a cryptocurrency to your platform. A
 * form must be attached to the request and contain at least the cryptocurrency code, their full name
 * and a URL for the image to which it represents.
 */
router.post("/", (req, res, next) => {
    
})

/**
 * DELETE / CRYPTO ID
 * 
 * cmid: cryptocurrency Id. User MUST be logged in as well as the ADMINISTRATOR. Deletes a cryptocurrency (meaning that your platform does not know this currency anymore.)
 */
router.delete("/:cmid", (req, res, next) => {

})


module.exports = router
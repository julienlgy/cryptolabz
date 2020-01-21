/**
 * Cryptolabz 2020
 * Routes cryptos
 * last modified : 20/01/2020
 */

const Config = require(__dirname+"/../config")
var express = require('express')
var router = express.Router()

/**
 * GET / ARTICLES
 * 
 * params: free. User MUST be logged in (OR NOT). If the user is anonymous the settings (if any) are
 * ignored and the last published articles are returned. If the user is logged in the settings are used to
 * return only the items most relevant to the user (a list of keywords might help you). You are free to define
 * the parameters that you think will be useful depending on the search options you offer to your users.
 * Here for each article, you must provide at least:
 * -> an id
 * -> a title
 * -> an URL of the article’s page
 * -> an URL of its image (if it exists)
 */
router.get("/", (req, res, next) => {

})

/**
 * GET / ARTICLE ID
 * 
 * id: the Id of an article. The user MUST be logged in (OR NOT). Returns information about an article,
 * which is at least:
 * -> the article Id
 * -> the title
 * -> its summary
 * -> its source
 * -> its date
 * -> the URL of the article’s page
 * -> the URL of its image (if it exists)
 */
router.get("/:id", (req, res, next) => {

})

module.exports = router;
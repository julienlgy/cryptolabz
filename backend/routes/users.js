const express = require('express')
const router = express.Router()
const UserController = require('../controllers/usercontroller')

/**
 * POST / REGISTER
 * 
 * The user MUST NOT be logged on. Register a user by sending a form.
 */
router.post("/register", UserController.create)

router.post("/login", UserController.login)

router.put("/update", UserController.update)

router.put("/favorites", UserController.updateFavorites)

/**
 * GET / USERS
 * 
 * User MUST be logged in as well as the ADMINISTRATOR. Get all users
 */
router.get("/get/all", UserController.getAll)

module.exports = router;
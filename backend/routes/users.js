const express = require('express')
const router = express.Router()
const UserController = require('../controllers/usercontroller')

/**
 * POST / REGISTER
 * 
 * The user MUST NOT be logged on. Register a user by sending a form.
 */
router.post("/register", UserController.create)

module.exports = router;
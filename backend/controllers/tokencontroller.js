/**
 * Cryptolabz 2020
 * EPITECH PROJECT
 * Last modified: 20/01/2020
 */

const PASSWORD = "SQZEDLPOZ555498_________________pipi"

class TokenController {
    constructor() {
        this.jwt = require('jsonwebtoken')
    }
    check(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
            return this.verify(req.headers.authorization.split(' ')[1]);
    }

    sign(params) {
        return this.jwt.sign(params, PASSWORD)
    }
    verify(token) {
        return this.jwt.decode(token, PASSWORD)
    }
}

module.exports = TokenController
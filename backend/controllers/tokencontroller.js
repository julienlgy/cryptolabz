/**
 * Cryptolabz 2020
 * EPITECH PROJECT
 * Last modified: 20/01/2020
 */

const PASSWORD = "SQZEDLPOZ555498_________________pipi"
const jwt = require('jsonwebtoken')
const User = require('../models/index').User

module.exports = {
    check(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
            return this.verify(req.headers.authorization.split(' ')[1]);
        return false
    },
    sign(params) {
        return jwt.sign(params, PASSWORD)
    },
    verify(token) {
        return jwt.decode(token, PASSWORD)
    },
    getUser(req) {
        return new Promise((resolve, reject) => {
            var id = this.check(req)
            if (id) {
                User.findOne({where: {id: id}}).then((user) => {
                    resolve(user)
                }).catch((err) => {
                    resolve(false)
                })
            } else {
                resolve(false)
            }
        })
    }
}
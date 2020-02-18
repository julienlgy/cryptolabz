/**
 * Cryptolabz 2020
 * EPITECH PROJECT
 * last modified : 11/02/2020
 */
const db = require('../models/index')
const bcrypt = require('bcryptjs')
const tokenController = require('./tokencontroller')
module.exports = {
  internal: {
    createAdmin() {
        db.User.create({
            username: "admin",
            firstname: "admin",
            lastname: "admin",
            email: "admin@cryptoalbz.com",
            password: bcrypt.hashSync("admin", 10),
            isAdmin: true
        }).then((data)=>{
            console.log("User admin created with [admin@cryptolabz.com][admin]")
        }).catch((err)=>{
            console.log("Retrieved admin user")
        })
    }
  },
  async create(req, res) {
      if (tokenController.check(req)) {
          res.status(403).json({
              error: true,
              message: "You are already logged"
          })
      }
    const password = bcrypt.hashSync(req.body.password, 10)
      console.log(password)  
        const {
            email,
            username,
            firstname,
            lastname
          } = req.body
        
          await db.User.create({
            email,
            password,
            username,
            firstname,
            lastname,
            isAdmin: false
          })
          .then(user => res.status(201).json({
            error: false,
            data: user,
            token: tokenController.sign(user.id)
          }))
          .catch(error => res.json({
            error: true,
            message: error.message
          }));
    },

    async login(req, res) {
        if (tokenController.check(req)) {
            res.status("403").json({
                error: true,
                message: "You are already logged in"
            })
        } else {
            if (req.body.hasOwnProperty('password') && req.body.hasOwnProperty('email')) {
                const password = req.body.password
                db.User.findOne({
                    where: { email: req.body.email }
                }).then((data) => {
                    if (data) {
                        if (bcrypt.compareSync(password, data.password)) {
                            data.password = "******"
                            res.status("200").json({
                                error: false,
                                user: data,
                                token: tokenController.sign(data.id)
                            })
                        } else {
                            res.status("403").json({
                                error: true,
                                message: "miss email or password"
                            })
                        }
                    } else {
                        res.status(403).json({error:true, message: "miss email or password."})
                    }
                }).catch(err => {
                    console.log(err);
                    res.status(403).json({error:true, message: "miss email or password."})
                });
            } else {
                res.status(400).json({error: true, message: "No content given"})
            }
        }
    },

    async update(req, res) {
        const {
            username,
            firstname,
            lastname,
            email,
            password
        } = req.body
        if (tokenController.check(req)) {
            tokenController.getUser(req)
                .then((user) => {
                    if (password) {
                        if (!bcrypt.compareSync(user.password, req.body.oldpassword)) {
                            res.status("403").json({
                                error: true,
                                message: "Wrong old password"
                            })
                        } else {
                            password = bcrypt.hashSync(password, 10)
                        }
                    }
                    db.User.update(
                        {
                         username:username, firstname:firstname, lastname:lastname, email:email, password:password
                        },
                        {where:{id:user.id}}
                    ).then((rowUpdated) => {
                        res.json({
                            error: false,
                            data: rowUpdated
                        })
                    }).catch(err => {
                        res.status(500).json({
                            error: true,
                            message: err.message
                        })
                    })
                }).catch(err => res.status("403").json({error: true, message: err.message}))
        } else {
            res.status("403").json({error: true,message: "You must be logged in"})
        }
    },

    async getAll(req, res) {
        var user = null
        if (user = tokenController.getUser(req)) {
            db.User.findAll().then((users) => {
                res.json({
                    error: false,
                    data: users
                })
            }).catch((err) => {
                console.error(err)
                res.status(500).json({
                    error:true,
                    message: "An error occured"
                })
            })
        }
    }
}
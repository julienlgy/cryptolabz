/**
 * Cryptolabz 2020
 * EPITECH PROJECT
 * last modified : 20/01/2020
 */

class UserController {
    constructor() {
        this.db = require(__dirname+"/../ORM/database.js")
    }
    register(params) {
        return new Promise((resolve, reject) => {
            var newUser = this.db.User.build(params)
            newUser.save()
                .then((item) => {
                    var json = item.toJSON()
                    json["status"] = true
                    resolve(json)
                })
                .catch((err) => {
                    console.log(err);
                    if (err.name == "SequelizeValidationError")
                        resolve ({ "status": false, "message": "miss_email "})
                    else
                        resolve ({ "status": false, "message": "already_exist" })
                })
        })
    }

    login(params) {
        return new Promise((resolve, reject) => {
            if (params.hasOwnProperty('password') && params.hasOwnProperty('email')) {
                this.db.User.findOne({
                    where: params
                }).then((data) => {
                    if (data) {
                        var json = data.toJSON()
                        delete json["password"]
                        json["status"] = true
                        resolve(json)
                    }
                }).catch(err => {
                    console.log(err);
                    resolve({status:false, message: "miss email or password."})
                });
            } else {
                resolve({status: false, message: "Please specify an email"})
            }
        });
    }

    update(iduser, params) {
        return new Promise((resolve, reject) => {
            if (params["isAdmin"])
                resolve({status:false, message:"Are you serious ? Go fuck another guy bro"})
            if (params["id"])
                resolve({status:false, message:"Don't try to do shit with my application blyat"})
            this.db.User.update(
                params,
                {where:{id:iduser}}
            ).then((rowUpdated) => {
                var json = {status: (typeof rowUpdated !== undefined)}
                this.db.User.findOne({id:iduser})
                    .then((user) => {
                        json["user"] = user.toJSON()
                        json["user"]["password"]=null;
                        resolve(json)
                    })
                    .catch(err => {
                        console.log(err)
                        resolve({status:false, message:"An unknown error occured"})
                    })
            }).catch(err => {
                console.log(err)
                resolve({status: false, message: "Error."})
            })
        })
    }
}

module.exports = UserController;
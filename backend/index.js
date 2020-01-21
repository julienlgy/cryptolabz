/**
 * Cryptolabz
 * 2020 - EPITECH PROJECT
 */

const Logger = require('./mods/log/logger.js').Logger;
const Config = require(__dirname + "/mods/config.js");
const Server = require('./mods/server.js');

var db = require('./mods/ORM/database.js');
Server.listen(Config.httpserver.port, () => {
    console.log("Cryptolabz server started");
    Logger.log("Cryptolabz Server started.");
})


/*db.User.findAll().then(users => {
  console.log(users);
})/*
db.User.create({ email:"test@example.fr", password: "caca", perm_level: 1, username: "Jogny", firstname: "Jane", lastname: "Doe" }).then(jane => {
  console.log("Jane's auto-generated ID:", jane.id);
});/*
User.findAll().then(users => {
  console.log("All users:", JSON.stringify(users, null, 4));
});*/
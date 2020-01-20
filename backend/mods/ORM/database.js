/**
 * Cryptolabz
 * 2020 - EPITECH PROJECT
 * jlegay - last modified 13/01/2020
 */
const config = require('./../config.js');
const Sequelize = require('sequelize');
const Logger = require('./../log/logger.js').Logger;

const dbconf = config["database-"+config.env];
const sequelize = new Sequelize(dbconf.database, dbconf.username, dbconf.password, {
    host: dbconf.host,
    port: dbconf.port,
    dialect: 'mysql'
})
sequelize
  .authenticate()
  .then(() => {
    Logger.log("Success connecting to the database");
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    Logger.log("An error occured connecting to the database");
    process.exit(1);
});
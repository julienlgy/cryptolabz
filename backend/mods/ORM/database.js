'use strict';
/**
 * Cryptolabz
 * 2020 - EPITECH PROJECT
 * jlegay - last modified 13/01/2020
 */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

const config = require('./../config.js');
const dbconf = config["database-"+config.env];
const sequelize = new Sequelize(dbconf.database, dbconf.username, dbconf.password, {
    host: dbconf.host,
    port: dbconf.port,
    dialect: 'mysql'
})

/**
 * Reading models
 */
console.log("ORM | Reading models")
fs
  .readdirSync(__dirname+"/models")
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    console.log("ORM | "+file+" READ")
    const model = sequelize['import'](path.join(__dirname+"/models", file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log("ORM | Successfully connected")
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    Logger.log("An error occured connecting to the database");
    process.exit(1);
});

module.exports = db;


/**
 * Cryptolabz
 * 2020 - EPITECH PROJECT
 */

//const Logger = require('./mods/log/logger.js').Logger;
//const Config = require(__dirname + "/mods/config.js");
//const Server = require('./mods/server.js');
//const Logger = require('./mods/log/logger.js').Logger
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger')
const schedule = require('node-schedule')


const axios = require('axios')

const config = {
  name: 'cryptolabzAPI',
  port: 3000,
  host: '0.0.0.0'
}

/*var db = require('./mods/ORM/database.js');
Server.listen(Config.httpserver.port, () => {
    console.log("Cryptolabz server started");
    Logger.log("Cryptolabz Server started.");
})*/

const app = express()
const logger = log({ console: true, file: false, label: config.name})

app.use(bodyParser.json())
app.use(cors())
app.use(ExpressAPILogMiddleware(logger, {request: true}))



var currencies = []

schedule.scheduleJob('*/10 * * * * *', () => {
  axios.get("https://www.coinbase.com/api/v2/assets/search?base=EUR&filter=all&include_prices=true&limit=10&order=asc&query=&resolution=day&sort=rank")
    .then(response => {
      currencies = []
      var result = response.data.data
      result.forEach(element => {
        currencies
          .push({ name: element.name,
                  symbol: element.symbol,
                  slug: element.slug,
                  currentPrice: element.latest + ' €',
                  imageUrl: element.image_url
                })
      });
      console.log(currencies)
    })
    .catch(error => {
      console.log(error)
    })
})




app.listen(config.port, config.host, (e) => {
    if(e) {
        throw new Error('Internal Server Error')    
    }
    logger.info(`${config.name} running on ${config.host}:${config.port}`) 
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
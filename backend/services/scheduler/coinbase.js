/**
 * CRYPTOLABZ 2020
 * Last modified: 27/01/2020
 * EPITECH PROJECT
 */

//const schedule = require('node-schedule')
const axios = require('axios')
const CryptosController = require('../../controllers/cryptoscontroller')
var cryptosController = new CryptosController();

class CoinbaseAPI {

    constructor(speed) {
        console.log("COINBASE | API Class Loaded")
        if (!speed) speed = 30
        this.speed = speed;
    }

    start() {
        if (!this.isStarted()) {
            console.log("COINBASE | Coinbase interval API Started")
            this.started = true
            this.perform()
            setInterval(() => {
                this.perform()
              }, this.speed * 1000)
        } else {
            return false;
        }
    }

    perform() {
        axios.get("https://www.coinbase.com/api/v2/assets/search?base=EUR&filter=all&include_prices=true&limit=100&order=asc&query=&resolution=day&sort=rank")
        .then(response => {
          var result = response.data.data
          result.forEach(element => {
          cryptosController
              .update({ name: element.name,
                      symbol: element.symbol,
                      slug: element.slug,
                      currentPrice: element.latest,
                      imageUrl: element.image_url
                    })
          });
        })
        .catch(error => {
          console.log(error)
        })
    }

    stop() {
        if (this.isStarted()) {
            console.log("COINBASE | API stopped")
            this.scheduled.cancel();
            this.started = false;
        } else 
            return false;
    }

    isStarted() {
        return this.started;
    }
}

module.exports = CoinbaseAPI;
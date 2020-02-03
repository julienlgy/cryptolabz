/**
 * CRYPTOLABZ 2020
 * Last modified: 27/01/2020
 * EPITECH PROJECT
 */
const axios = require('axios');
const ArticleController = require("../controller/articlescontroller");

class RSS {
    constructor(speed = 30) {
        console.log("COINBASE | API Class Loaded");
        this.speed = speed;
        this.started = false;
    }

    start() {
        if (!this.isStarted()) {
            console.log("COINBASE | Coinbase interval API Started")
            this.started = true;
            this.perform();
            this.interval = setInterval(() => {
                this.perform();
              }, this.speed * 1000)
        } else {
            return false;
        }
    }

    perform() {
        ArticleController.updateRSS();
    }

    stop() {
        if (this.isStarted()) {
            console.log("COINBASE | API stopped")
            clearInterval(this.interval);
            this.started = false;
        } else {
            return false;
        }
    }

    isStarted() {
        return this.started;
    }
}

module.exports = RSS;
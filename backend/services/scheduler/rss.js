/**
 * CRYPTOLABZ 2020
 * Last modified: 27/01/2020
 * EPITECH PROJECT
 */
const ArticleController = require("../../controllers/articlescontroller");

class RSS {
    constructor(speed = 60) {
        console.log("RSS | API Class Loaded");
        this.speed = speed;
        this.started = false;
    }

    start() {
        if (!this.isStarted()) {
            console.log("RSS | RSS interval Started")
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
        if (this.started) {
            console.log("RSS | API stopped")
            clearInterval(this.interval);
            this.started = false;
        }
    }

    isStarted() {
        return this.started;
    }
}

module.exports = RSS;

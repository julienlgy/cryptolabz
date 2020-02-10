'use strict';

const ArticleSourceController = require("./articlesourcecontroller");
const Parser = require('rss-parser');

class ArticleController {
    constructor() {
        this.db = require('../models/index');
    }

    // Updates the articles with RSS
    static async updateRSS() {
        const parser = new Parser();
        ArticleSourceController.getSources()
        .then(sources => {
            for (const url of sources) {
                // To replace with putting the articles in the database if the 
                // URL is not present
                parser.parseURL(url)
                .then(feed => {
                    feed.items.forEach(item => {
                        console.log(item.title + ':' + item.link);
                    })
                })
            }
        })
    }
}

module.exports = ArticleController;

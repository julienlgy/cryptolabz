"use strict";

class ArticleSourceController {
  constructor() {
  }

  // Get all the articles
  static getSources() {
    return new Promise((resolve, reject) => {
      const db = require("../models/index");
      db.ArticleSource.findAll()
        .then(sources => {
          if (sources) {
            resolve(sources);
          }
          resolve(false);
        })
        .catch(err => {
          console.error(err);
          resolve(false);
        });
    });
  }
}

module.exports = ArticleSourceController;

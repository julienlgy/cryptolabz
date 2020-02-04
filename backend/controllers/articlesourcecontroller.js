'use strict';

class ArticleSourceController {
    constructor() {
        this.db = require('../models/index');
    }

    // Get all the articles
    static getSources() {
        return new Promise((resolve, reject) => {
            this.db.ArticleSource.findAll()
            .then(sources => {
                if (sources) {
                    resolve(sources);
                }
                resolve(false);
            })
            .catch(err => { 
                console.error(err); 
                resolve(false); 
            })
        })
    }
}

export default ArticleSourceController;

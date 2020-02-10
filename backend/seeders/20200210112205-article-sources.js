"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ArticleSources", [
      {
        id: 1,
        title: "CoinDesk",
        url: "https://www.coindesk.com/feed",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: "Cointelegraph",
        url: "https://cointelegraph.com/feed",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: "Reddit bitcoin",
        url: "https://www.reddit.com/r/Bitcoin/.rss",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        title: "Bitcoin.org",
        url: "https://bitcoin.org/en/rss/blog.xml",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ArticleSources", null, {});
  }
};

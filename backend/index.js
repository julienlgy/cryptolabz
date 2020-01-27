
/**
 * Cryptolabz
 * 2020 - EPITECH PROJECT
 */

const Logger = require(__dirname + '/mods/log/logger.js').Logger;
const Config = require(__dirname + "/mods/config.js");
const Server = require(__dirname + '/mods/server.js');
const CoinbaseAPI = require(__dirname+"/mods/scheduler/coinbase");

Server.listen(Config.httpserver.port, () => {
    console.log("Cryptolabz server started");
    Logger.log("Cryptolabz Server started.");
})

// LAUNCHING SCHEDULED TASKS
var coinbaseApi = new CoinbaseAPI(60);
coinbaseApi.start();
/**
 * Cryptolabz - Logger
 * 2020 - EPITECH PROJECT
 * Jlegay last modified : 13/01/2020
 */

var exports = (module.exports = {});
const fs = require("fs");
const shell = require("shelljs");

/**
 * Static class to log
 */
class Logger {
  static getEnv() {
    var config = require(process.cwd() + "/config.json");
    return config.env;
  }

  static log(msg) {
    msg = "\n[" + new Date().toISOString() + "] : " + msg;
    var fullPath = process.cwd() + "/var/logs/";
    var filePath = fullPath + Logger.getEnv() + ".log";
    shell.mkdir("-p", fullPath);
    fs.open(filePath, "r", function(err, fd) {
      if (err) {
        fs.writeFile(filePath, msg, function(err) {
          if (err) throw err;
        });
      } else {
        fs.appendFile(filePath, msg, function(err) {
          if (err) throw err;
        });
      }
    });
  }
}

exports.Logger = Logger;

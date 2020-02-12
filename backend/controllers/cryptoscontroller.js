/**
 * Cryptolabz 2020
 * EPITECH PROJECT
 * last modified : 10/02/2020
 */

const CryptoDB = require('../models/index').Crypto
const CryptoDBsHisto = require('../models/index').CryptoHisto
const Op = require('../models/index').Sequelize.Op;
const sequelize = require('../models/index').sequelize;
const Sequelize = require('../models/index').Sequelize;
const tokenController= require('./tokencontroller')

module.exports = {
    update(JsonCurrency) {
        this.getBySymbol(JsonCurrency.symbol)
            .then((crypto) => {
                if (crypto) {
                    if (crypto.currentPrice != JsonCurrency.currentPrice) {
                        var CryptoHisto = CryptoDBsHisto.build({
                            symbol: crypto.symbol,
                            price: crypto.currentPrice
                        })
                        crypto.currentPrice = JsonCurrency.currentPrice
                        CryptoHisto.save()
                        crypto.save()
                    }
                } else {
                    this.create(JsonCurrency);
                }
            })
            .catch(err => (
                console.log(err)
            ))
    },

    create(JsonCurrency) {
        var newCrypto = CryptoDB.build(JsonCurrency)
        newCrypto.save()
        .then((item) => {
        })
        .catch((err) => {
            console.log(err);
            if (err.name == "SequelizeValidationError")
                console.log("Validation error");
            else
                console.log("Other error");
            process.exit(0);
        })
    },

    getBySymbol(name) {
        return new Promise((resolve, reject) => {
            CryptoDB.findOne({
                where: { "symbol": name }
            }).then((crypto) => {
                if (crypto)
                    resolve(crypto);
                resolve(false);
            }).catch((err) => { console.error(err); resolve(false); })
        }) 
    },

    web : {
        async getCryptosByIds(req, res) {
            var ids = req.query.cmids;
            console.log(ids);
            if (typeof ids != "undefined" && ids ){
                var ids = ids.split(',');
                await CryptoDB.findAll({
                    where: { "symbol": ids }
                }).then((cryptos) => {
                    res.status(200).json({
                        error: false,
                        data: cryptos
                    })
                }).catch((err) => {
                    console.error(err)
                    res.status(403).json({
                        error:true,
                        message: "An error occured"
                    })
                })
            } else {
                res.status(403).json({
                    error: true,
                    message: "You have to provide cmids parameter."
                })
            } 
        },
        async getCryptoById(req, res) {
            var cmid = req.params.cmid;
            if (typeof cmid !== "undefined") {
                module.exports.getBySymbol(cmid)
                    .then((currency) => {
                        res.status(200).json({
                            error: false,
                            data: currency
                        })
                    }).catch((err) => {
                        res.status(500).json({
                            error: true,
                            message: "An error occured. Please check your params"
                        })
                    });
            } else {
                res.status(400).json({
                    error: true,
                    message: "Content not given"
                })
            }
        },
        
        async getCryptoHistoById(req, res) {
            var cmid = req.params.cmid
            var period = req.params.period
            var currentDate = new Date();
            var startDate = new Date();
            var truncation = "%Y-%m-%d"

            if (typeof cmid !== "undefined" && ["daily","hourly","minute"].includes(period)) {
                switch(period) {
                    case "daily":
                        startDate.setDate(currentDate.getDate() - 60)
                        break;
                    case "hourly":
                        startDate.setDate(currentDate.getDate() - 2)
                        truncation = "%Y-%m-%d %H:00:00"
                        break;
                    case "minute":
                        startDate.setHours(currentDate.getHours() - 2)
                        truncation = "%Y-%m-%d %H:%i:00"
                }
                console.log(startDate);
                console.log(currentDate);
                CryptoDBsHisto.findAll({
                    attributes: [
                        [sequelize.fn('AVG', sequelize.col('price')), 'price'],
                        [Sequelize.literal("DATE_FORMAT(`createdAt`, '"+truncation+"')"), 'date'],
                        //'createdAt', [sequelize.fn('date_trunc', truncation, sequelize.col('createdAt'))]
                    ],
                    where: {
                        "symbol": cmid,
                        "createdAt": {
                            [Op.between]: [startDate, currentDate]
                        }
                    },
                    group: ['date']
                }).then((histos) => {
                    res.status(200).json({
                        error: false,
                        data: histos
                    })
                }).catch((err) => {
                    console.error(err);
                    res.status(500).json({
                        error: true,
                        message: "An error occured. Please check your CMID."
                    })
                })
            } else {
                res.status(400).json({
                    error: true,
                    message: "Missing parameters : period [daily, hourly, minute]"
                })
            }
        },

        async getHome(req, res) {
            var currentDate = new Date();
            var startDate = new Date();
            startDate.setHours(currentDate.getHours() - 2)
            
            // @TODO: Check if user is logged, and display his favorite cryptos instead

            CryptoDB.findAll({
                attributes : [ 'symbol' ],
                where: { rank: { [Op.lt]: 6} },
                raw: true
            }).then((smbls) => {
                var symbols = []
                for (var i = 0; i < smbls.length; i++) {
                    symbols.push(Object.values(smbls[i]))
                }
                console.log(symbols)
                CryptoDBsHisto.findAll({
                    attributes: [
                        'symbol',
                        [sequelize.fn('AVG', sequelize.col('price')), 'price'],
                        [Sequelize.literal("DATE_FORMAT(`createdAt`, '%Y-%m-%d %H:%i:00')"), 'date']
                    ],
                    where: {
                        "symbol": symbols,
                        "createdAt": {
                            [Op.between]: [startDate, currentDate]
                        }
                    },
                    group: ['symbol', 'date']
                }).then((histos) => {
                        CryptoDB.findAll({
                            where: { "symbol": symbols }
                        }).then((cryptos) => {
                            res.status(200).json({
                                error: false,
                                cryptos: cryptos,
                                graph: histos
                            })
                        })
                }).catch((err) => {
                    console.error(err)
                    res.status("500").json({
                        error: true,
                        message: "We're sorry, an error occured"
                    })
                    return
                })
                /*for (var i = 0, len = cryptos.length; i < len; i++) {
                    
                }*/
            }).catch((err) => {
                console.error(err)
                res.status("500").json({
                    error: true,
                    message: "We're sorry, an error occured"
                })
            })
        },

        async getAll(req, res) {
            var user = null
            if (user = tokenController.getUser(req)) {
                CryptoDB.findAll({
                    attributes: [ 'symbol', 'name' ]
                }).then((crypto) => {
                    res.json({
                        error: false,
                        data: crypto
                    })
                }).catch((err) => {
                    console.error(err)
                    res.status(500).json({
                        error:true,
                        message: "An error occured"
                    })
                })
            }
        }

    }

}
/**
 * Cryptolabz 2020
 * EPITECH PROJECT
 * last modified : 27/01/2020
 */

class CryptosController {
    constructor() {
        this.db = require('../models/index')
    }

    update(JsonCurrency) {
        this.getBySymbol(JsonCurrency.symbol)
            .then((crypto) => {
                if (crypto) {
                    if (crypto.currentPrice != JsonCurrency.currentPrice) {
                        var CryptoHisto = this.db.CryptosHisto.build({
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
    }

    create(JsonCurrency) {
        var newCrypto = this.db.Cryptos.build(JsonCurrency)
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
    }

    getBySymbol(name) {
        return new Promise((resolve, reject) => {
            this.db.Cryptos.findOne({
                where: { "symbol": name }
            }).then((crypto) => {
                if (crypto)
                    resolve(crypto);
                resolve(false);
            }).catch((err) => { console.error(err); resolve(false); })
        })
    }
    
}

module.exports = CryptosController;
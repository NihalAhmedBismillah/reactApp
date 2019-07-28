/**
 * Import npm module
 */

const config = require('./config.json'),
    MongoClient = require('mongodb').MongoClient;
_ = require('lodash')


class MongodbClient {
    constructor() { }
    static dbConnect() {
        return new Promise((resolve, reject) => {
            if (_.isUndefined(global['db'])) {
                MongoClient.connect(config['dbConnectionUrl'] + config['dbName'],{ useNewUrlParser: true }, (error, db) => {
                    if (error) {
                        console.log('Database connection error occur!', JSON.stringify(error));
                        reject(error)
                    }
                    else {
                        global['db'] = db;
                        resolve(true);
                    }
                });
            } else {
                resolve(true)
            }
        });
    }

}


module.exports = MongodbClient;
/**
 * Import npm packages
 */
const config = require('./config.json')

class DbOperation {


    /**
     * 
     * @param data 
     * @param collectionName 
     */
    static async save(data, collectionName) {

        return new Promise((resolve, reject) => {
            if (!data || !collectionName) return reject('Invalid paramater');
            this.getDbCollectionInstance(collectionName).insertOne(data, (error, result) => {
                return (!error) ? resolve(result.result) : reject(error);
            });
        });
    }
    /**
     * 
     * @param updateOptions 
     * @param collectionName 
     */
    static async updateFields(updateOptions, collectionName) {
        return new Promise((res, rej) => {
            if (!updateOptions || !collectionName) return rej('Invalid paramater');
            this.getDbCollectionInstance(collectionName).updateOne(updateOptions.query, { $set: updateOptions.updateFields }, { upsert: true }, (error, result) => {
                if (!error) {
                    res(result.result);
                } else {
                    rej(error);
                }
            });
        });
    }
    /**
     * 
     * @param query 
     * @param collectionName 
     */
    static async find(query, collectionName) {

        return new Promise((res, rej) => {

            if (!query || !collectionName) return rej('Invalid paramater');

            this.getDbCollectionInstance(collectionName).find(query).toArray((error, result) => {
                return (!error) ? res(result) : rej(error);
            });
        });
    }

    /**
     * 
     * @param pageNo 
     * @param pageSize 
     * @param collectionName 
     */
    static async findWithPagination(pageInfo, collectionName) {
        return new Promise((resolve, reject) => {
            const { pageNo, pageSize } = pageInfo;
            if (!collectionName) return reject('Invalid paramater');
            const collection = this.getDbCollectionInstance(collectionName);
            collection.find({}).count((error, count) => {
                if (!error) {
                    collection.find({})
                        .sort({ createOn: 1 }) //descending order
                        .skip((+pageSize * +pageNo) - +pageSize)
                        .limit(pageSize).toArray((error, result) => {
                            if (!error) {
                                resolve({ data: result, currentPage: pageNo, totalPages: Math.ceil(count / pageSize), totalItem: count });
                            } else {
                                reject(error);
                            }
                        });
                } else {
                    reject(error);
                }
            });
        });
    }
    /**
     * 
     * @param query 
     * @param collectionName 
     */
    static async remove(query, collectionName) {

        return new Promise((res, rej) => {
            if (!query || !collectionName) return rej('Invalid paramater');
            this.getDbCollectionInstance(collectionName).remove(query, (error, result) => {
                return (!error) ? res(result.result) : rej(error);
            });
        });
    }

    static SearchUser(query, collectionName) {

        return new Promise((resolve, reject) => {
            const collection = this.getDbCollectionInstance(collectionName);
            collection.find(query, {projection:{ _id: 1, userName: 1, address: 1, mobileNo: 1,emailId:1} }).toArray((error, result) => {
                if (!error) {
                    resolve({ data: result });
                } else {
                    reject(error);
                }
            });

        });
    }

    static getDbCollectionInstance(collectionName) {
        const client = global['db'];
        const db = client.db(config['dbName']);
        return db.collection(collectionName);
    }
}

module.exports = DbOperation;
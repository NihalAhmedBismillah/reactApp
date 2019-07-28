const DbOperation = require('./dbOperation'),
    shortId = require('shortid'),
    faker = require('faker');
class User {
    constructor(values) {
        this._id = null;
        this.userName = null;
        this.emailId = null;
        this.address = null;
        this.mobileNo = null;
        this.createdBy = 1;// TODO: Need to change with login user id
        this.updatedBy = 2;  //
        this.createOn = new Date().toISOString();
        this.updatedOn = new Date().toISOString();
        this.status = 1;
        if (values) {
            Object.assign(this, values);
        }
    }
    toJson() {
        return {
            userName: this.userName,
            emailId: this.emailId,
            address: this.address,
            mobileNo: this.mobileNo,
            createdBy: this.createdBy,
            createOn: this.createOn,
            updatedBy: this.updatedBy,
            updatedOn: this.updatedOn,
            status: this.status,
            _id: this._id
        }
    }

    toJsonUpdate() {
        return {
            userName: this.userName,
            emailId: this.emailId,
            address: this.address,
            mobileNo: this.mobileNo,
            updatedBy: this.updatedBy,
            updatedOn: this.updatedOn,
            status: this.status,
        }
    }
    /**
     * 
     */
    async saveUser() {
        //TODO : Apply validation
        this._id = shortId.generate();
        return await DbOperation.save(this.toJson(), 'USER');

    }

    /**
     * 
     */
    async saveFakeUser(noOfUsers) {
        for (let i = 0; i < +noOfUsers; i++) {

            this._id = shortId.generate();
            this.address = `${faker.address.city()} ,${faker.address.state()}, ${faker.address.country()}`;
            this.mobileNo = faker.phone.phoneNumber();
            this.emailId = faker.internet.email();
            this.userName = `${faker.internet.userName()}`;
            console.log('data Inserted ', this.toJson());
            await DbOperation.save(this.toJson(), 'USER');
        }
        return Promise.resolve({ noOfUserInserted: noOfUsers });

    }
    /**
     * 
     */
    async updateUser() {
        //TODO : Apply validation
        const updateObject = { query: { _id: this._id }, updateFields: this.toJsonUpdate() }
        return await DbOperation.updateFields(updateObject, 'USER');

    }
    /**
     * 
     */
    async getUserById() {
        //TODO : Apply validation
        const findQuery = { _id: this._id }
        return await DbOperation.find(findQuery, 'USER');
    }
    /**
    * 
    */
    async getUserByPageWise(pageInfo) {
        return await DbOperation.findWithPagination(pageInfo, 'USER');
    }
    /**
     * 
     */
    async getAllActiveUser() {
        //TODO : Apply validation
        const findQuery = {}; // get only active users
        return await DbOperation.find(findQuery, 'USER');
    }
    /**
     * 
     */
    async getAllUser() {
        //TODO : Apply validation
        const findQuery = { status: 1 }; // get only active users
        return await DbOperation.find(findQuery, 'USER');
    }
    /**
    * 
    */
    async softUserDelete() {
        //TODO : Apply validation
        const updateObject = { query: { _id: this._id }, updateFields: { status: 2, updatedBy: 2, updatedOn: new Date().toISOString() } }
        return await DbOperation.updateFields(updateObject, 'USER');
    }

    /**
    * 
    */
    async searchUser(term) {
        //TODO : Apply validation
        //  const query = { userName: { $regex: new RegExp('^' + term.term) } };
        // const query = { userName: { $regex: /^Nihal/i } };

        const query = {
            $or: [
                { userName: { $regex: new RegExp(".*" + term.term + ".*"), $options: 'i' } },
                { address: { $regex: new RegExp(".*" + term.term + "."), $options: 'i' } }]
        }
        return await DbOperation.SearchUser(query, 'USER');
    }

    /**
    * 
    */
    async hardUserDelete() {
        //TODO : Apply validation
        const updateObject = { _id: this._id }
        return await DbOperation.remove(updateObject, 'USER');
    }
}

module.exports = User;

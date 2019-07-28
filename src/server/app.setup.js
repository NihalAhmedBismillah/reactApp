const MongodbClient = require('./dbConfig');
const UserController = require('./user.controller');
const bodyParser = require("body-parser");
const cors = require("cors");
class AppSetup {
    constructor(app) {
        this.app = app;
    }
    async initApp() {
        try {
            this.app.use(bodyParser.json());
            this.app.use(cors());
            this.app.use(bodyParser.urlencoded({ extended: true }));
            await MongodbClient.dbConnect();
            console.log('Data base setup')
            await new UserController(this.app).init();
            console.log('controllers registered!')
            this.app.get("/", (req, res) => res.send(`Server running port no: 3001  ${new Date()}`));
        }
        catch (error) {
            console.log('error ', JSON.stringify(error))
            throw (error);
        }
    }
}

module.exports = AppSetup;
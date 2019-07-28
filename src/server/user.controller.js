const User = require('./user.model');

class UserController {
    constructor(app) {
        this.app = app
    }
    init() {
        return new Promise((res, rej) => {
            this.app.post("/api/v1/user", async (req, res) => {
                const body = req.body;
                const response = await new User(body).saveUser();
                res.send(response);
            });
            this.app.post("/api/v1/user/fake", async (req, res) => {
                const body = req.body;
                const response = await new User().saveFakeUser(body.no);
                res.send(response);
            });
            this.app.delete("/api/v1/user/soft/:id", async (req, res) => {
                const response = await new User({ _id: req.params['id'] }).softUserDelete()
                res.send(response);
            });

            this.app.delete("/api/v1/user/hard/:id", async (req, res) => {
                const response = await new User({ _id: req.params['id'] }).hardUserDelete();
                res.send(response);
            });

            this.app.get("/api/v1/user/:id", async (req, res) => {
                const response = await new User({ _id: req.params['id'] }).getUserById()
                res.send(response);
            });
            this.app.get("/api/v1/user", async (req, res) => {
                console.log('/api/v1/user/page"')
                let pageInfo = { pageNo: +req.query.pageno || 1, pageSize: +req.query.pagesize || 10 }
                const response = await new User().getUserByPageWise(pageInfo)
                res.send(response);
            });
            this.app.get("/api/v1/search/user", async (req, res) => {
                console.log('api/v1/search/user')
                let term = { term: req.query.terms};
               /// console.log('query ',term)
                const response = await new User().searchUser(term);
                res.send(response);
            });
            this.app.put("/api/v1/user/:id", async (req, res) => {
                const body = req.body;
                body._id = req.params['id'];
                const response = await new User(body).updateUser()
                res.send(response);
            });
            res(true);
        })
    }
}

module.exports = UserController;
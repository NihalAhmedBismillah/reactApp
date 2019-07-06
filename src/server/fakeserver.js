const express = require("express"),
  bodyParser = require("body-parser"),
 cors = require("cors"),
 faker = require('faker'),
 shortid = require('shortid'),
 app = express();

app.use((err, req, res, next) => {
  console.error(err);
  res.render('internal server error :500');
});
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3001, () => {
  console.log(`server started in port No 3001 and db connected!`);
});

app.get("/", (req, res) => {
  res.send(`Server running port no: 3000  ${new Date()}`);
});

app.post("/user", (req, res) => {
  const body = req.body;
  console.log("body", JSON.stringify(body));
  res.send(fakeUser());
});

app.delete("/user/:id", (req, res) => {
  let id = req.params["id"];
  console.log("id", id);
  res.send({ status: 'deleted' });
});

app.get("/user", (req, res) => {
  let users = [];
  for (let index = 0; index < 10; index++) {
    users = users.concat(fakeUser());
  }
  res.send(users);
});
app.get("/user/:id", (req, res) => {
  res.send(fakeUser());
});

app.put("/user/:id", (req, res) => {
  let id = req.params["id"];
  console.log("id", id);
  
  res.send(fakeUser());
});

const fakeUser=()=>{
  return {
    _id: shortid.generate(),
    address: `${faker.address.city()} ,${faker.address.state()}, ${faker.address.country()}`,
    mobileNo: faker.phone.phoneNumber(),
    emailId: faker.internet.email(),
    userName: `${faker.internet.userName()}`
  }

}




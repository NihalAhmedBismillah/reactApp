const express = require("express"),
  appSetup = require('./app.setup'),
  app = express();
app.use((err, req, res, next) => {
  console.error(err);
  res.render('internal server error :500');
});
app.listen(3001, async () => {
  try {
    await new appSetup(app).initApp();
    console.log(`server started in port No 3001 and db connected!`);
  }
  catch (error) {
    console.log('Error : ', error);
    process.exit(1)
  }
});








module.exports = app => {
  const user = require("../controllers/user.js");  
  const auth = require('../middleware/auth');

  var router = require("express").Router();


  router.get("/login", user.auth);

  router.post("/register", user.create);

  router.get("/info", auth, user.findOne);

  router.put("/update", auth, user.update);

  app.use('/api/user', router);
};

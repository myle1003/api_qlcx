const md5 = require('md5');
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Không được để trống!"
    });
  }

  const user = new User({
    login_name: req.body.login_name,
    user_name: req.body.user_name,
    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    email: req.body.email,
    password: req.body.password,
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  User.findById(req.user.id, req.user.id_role, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateById(
    req.user.id, req.user.id_role, 
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User .`
          });
        } else {
          res.status(500).send({
            message: "Error updating User"
          });
        }
      } else res.send(data);
    }
  );
};

exports.auth = (req, res) => {
  User.auth(req.body.login_name, md5(req.body.password) , (err, data) => {
    let token;
    if (err) {
      User.authEmployee(req.body.login_name, md5(req.body.password) , (err, data) => {
        let token;
        if (err) {
            res.status(500).send({
              message: "Tên đăng nhập hoặc mật khẩu không đúng! " 
            })
        } else {
          // console.log(data);
          token = jwt.sign({ Account: data[0].login_name, id: data[0].user_id, id_role: 1 }, "qlcx", {
            expiresIn: 1440,
        });
        res.json({ 
          token: token ,
          id_role: 1
        });
        }
      });
    } else {
      // console.log(data);
      token = jwt.sign({ Account: data[0].login_name, id: data[0].id, id_role: 0 }, "qlcx", {
        expiresIn: 1440,
    });
    res.json({ 
      token: token ,
      id_role: 0
    });
    }
  });
};




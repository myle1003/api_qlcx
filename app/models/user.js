const sql = require("./db.js");
const md5 = require('md5');

// constructor
const User = function(user) {
  this.id = user.id;
  this.login_name = user.login_name;
  this.user_name = user.user_name;
  this.avatar = user.avatar;
  this.email = user.email;
  this.password = user.password;
};


User.findById = (id,id_role, result) => {
  if (id_role == 0 ){
    sql.query(`SELECT login_name, user_name, email, avatar FROM customer_user WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("user: ", res[0]);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  } else {
    sql.query(`SELECT login_name, user_name, email, avatar FROM sys_user WHERE user_id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("user: ", res[0]);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    });
  }
};

User.updateById = (id,id_role, user, result) => {
  if (id_role == 0 ){
    sql.query(
      "UPDATE customer_user SET login_name = ?, avatar = ?, user_name = ?, email = ?, password = ? WHERE id = ?",
      [user.login_name, user.avatar, user.user_name, user.email, md5(user.password), id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;user_name
        }

        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  } else {
    sql.query(
      "UPDATE sys_user SET login_name = ?, avatar = ?, user_name = ?, email = ? WHERE user_id = ?",
      [user.login_name, user.avatar, user.user_name, user.email, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;user_name
        }

        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  }
};

User.auth = (login_name, password, result) => {
  sql.query(`SELECT * FROM customer_user WHERE login_name = '${login_name}' AND password = '${password}' `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("user: ", res[0]);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

User.authEmployee = (login_name, password, result) => {
  sql.query(`SELECT * FROM sys_user WHERE login_name = '${login_name}' AND password = '${password}' `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("user: ", res[0]);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO customer_user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.newUser, ...newUser });
  });
};

module.exports = User;

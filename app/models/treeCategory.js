const sql = require("./db.js");

// constructor
const TreeCategory = function(treeCategory) {
  this.id = treeCategory.id;
  this.name = treeCategory.name;
  this.description = treeCategory.description;
};

TreeCategory.getAll = (title, result) => {
  let query = "SELECT * FROM tree_category ORDER BY tree_category.name ASC";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("category: ", res);
    result(null, res);
  });
};

TreeCategory.findById = (id, result) => {
  sql.query(`SELECT * FROM tree_category WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("category: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};
module.exports = TreeCategory;

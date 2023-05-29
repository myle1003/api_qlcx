const Tree = require("../models/tree.js");

exports.findAll = (req, res) => {
  const title = req.query.title;

  Tree.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message 
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Tree.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tree with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving tree with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findSome = (req, res) => {
  Tree.findByIdCategory(req.params.id_category, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tree with id ${req.params.id_category}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving tree with id " + req.params.id_category
        });
      }
    } else res.send(data);
  });
};

exports.findTreeByName = (req, res) => {
  Tree.findByName(req.body.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tree with name ${req.body.name}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving tree with name " + req.body.name
        });
      }
    } else res.send(data);
  });
};



const Address = require("../models/address.js");

exports.findWard = (req, res) => {
  Address.findWardsById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tree wards with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving wards with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findCities = (req, res) => {
  Address.findCitiesById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tree city with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving city with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.findProvinces = (req, res) => {
  Address.findProvincesById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found tree province with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving province with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};



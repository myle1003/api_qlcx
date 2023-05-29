const Work = require("../models/work.js");



exports.update = (req, res) => {

  Work.updateById(
    req.params.id,
    req.body.status,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found work .`
          });
        } else {
          res.status(500).send({
            message: "Error updating work"
          });
        }
      } else res.send(data);
    }
  );
};

exports.findSome = (req, res) => {
  Work.findByIdEmployee(req.user.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found work.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving work"
        });
      }
    } else res.send(data);
  });
};

exports.findByFilter = (req, res) => {
  Work.findByFilter(req.user.id, req.body.start_day, req.body.end_day ,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found work.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving work"
        });
      }
    } else res.send(data);
  });
};

exports.findDetail = (req, res) => {
  Work.findDetail(req.params.id ,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found work.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving work"
        });
      }
    } else res.send(data);
  });
};


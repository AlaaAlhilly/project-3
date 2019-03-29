const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Comments
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Comments
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Comments
      .create(req.body)
      .then(dbModel => {
        db.Snippets
        .findOneAndUpdate({_id:req.body.snippet_id},
          {
            $push:{comments:dbModel}
          }
          ).then(result=>{
            res.json(result)
          }).catch(err=>{
            console.log("err at snippet cr"+err)
            res.status(442).json(err)})
      })
      .catch(err => {
        console.log("err at comm cr"+err)
        res.status(422).json(err)});
  },
  update: function(req, res) {
    db.Comments
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Comments
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

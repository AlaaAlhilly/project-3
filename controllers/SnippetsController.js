const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Snippets
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Snippets
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User.findOneAndUpdate({okta_id:req.body.author.okta_id},
      {
        $push: {snippets: req.body[0]}
      },(err,result)=>{
        if(err){
          console.log(err)
        } 
        console.log(req.body)
        db.Snippets
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => {console.log(err); res.status(422).json(err)});
  
      }
      )

    },
  update: function(req, res) {
    db.Snippets
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Snippets
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

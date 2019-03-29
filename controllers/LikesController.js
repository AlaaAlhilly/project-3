const db = require("../models");
module.exports = {
  findAll: function(req, res) {
    db.Likes
      .find({})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Likes
      .findOne({author_id:req.params.u_id,snippet_id:req.params.p_id})
      .then(dbModel => {
        console.log(dbModel)
        if(dbModel){
          console.log("inside snippet find")
          db.Snippets.find({},(err,result)=>{
            if(err) {
              res.status(442).json(err)}
            res.json(result)}
            )
        }else{
          console.log("inside null dbModel")
          res.json(null)
        }
      })
      .catch(err => res.json(null));
    
  },
  create: function(req, res) {
    db.Likes.create(req.body).then(data =>{
      db.User
      .findOneAndUpdate({okta_id:req.body.author_id},
        {
          $push:{likes:data._id}
        }
        )
      .then(result=>{
        db.Snippets
        .findOneAndUpdate({_id:req.body.snippet_id},{
          $push:{likes:data}
        }).then(result=>{
          res.json(result)
        })
        .catch(err=>res.status(442).json(err))
      })
      .catch(err=>res.status(442).json(err))
    })
  },
  update: function(req, res) {
    db.Likes
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Likes
      .findOneAndDelete({ author_id: req.params.u_id,snippet_id:req.params.p_id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => {
        db.User
          .findOneAndUpdate({okta_id:req.params.u_id},
            {
              $pull:{likes:dbModel._id}
            }
            )
          .then(result=>{
            db.Snippets
            .findOneAndUpdate({_id:req.params.p_id},
              {
                $pull:{likes:dbModel}
              }
              ).then(result=>{
                db.Snippets.find({},(err,result)=>{
                  if(err) {res.status(442).json(err)}
                  res.json(result)
                })
              }).catch(err=>res.status(442).json(err))
          }).catch(err=>res.status(442).json(err))
      })
      .catch(err => {res.json(err)});
  }
};

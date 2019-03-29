var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var CommentsSchema = new Schema({
  body: {
    type: String
  },
  author_id:String,
  snippet_id:String,
  author_name:String,
  auth_pic:String,
});
var Comments = mongoose.model("Comments", CommentsSchema);
module.exports = Comments;

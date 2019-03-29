var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var LikeSchema = new Schema({
  author_id:String,
  snippet_id:String
});
var Likes = mongoose.model("Likes", LikeSchema);
module.exports = Likes;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchecma = new Schema({
  name: { type: String, required: true },
  okta_id: { type: String, required: true },
  pic: { type: String, required: true,default:"https://res.cloudinary.com/dh7ooikgx/image/upload/v1553397211/favicon_rklfor.ico" },
  phone:String,
  email:{type:String,required:true},
  likes:[
      {
        type: Schema.Types.ObjectId,
        ref: "Likes"
      }
  ],
  snippets:[{
    type: Schema.Types.ObjectId,
    ref: "Snippets"
  }]
});

const User = mongoose.model("User", userSchecma);

module.exports = User;

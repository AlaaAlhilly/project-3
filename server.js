const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profiles = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const passport = require("passport");
const app = express();

// EXPRESS BODY-PARSER
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DB CONFIG
const db = require("./config/keys").mongoURI;

// CONNECT TO MONGO WITH MONGOOSE
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(err));

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
require("./config/passport")(passport);

// ROUTES SETUP
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profiles);

// PORT SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

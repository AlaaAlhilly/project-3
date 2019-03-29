const express = require("express");
const http = require("http")
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path')
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use((req, res, next) => {
  res.header({ 'Access-Control-Allow-Origin': '*' })
  res.header({ 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE' });
  res.header({ 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' })
  next();
}); 
// Add routes, both API and view
app.use(routes);

app.get('*',function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
// Connect to the Mongo DB
DBURL = process.env.MONGODB_URI || "mongodb://localhost/react_snippers";
mongoose.connect(DBURL, (err) => {
  if (err) { console.log(err); return; }
  console.log("connected to MONGO");
})
let db = mongoose.connection;

db.on("error", function(error) {
console.log(" Error: ", error);
});

db.once("open", function() {
console.log(" connected.");
});
const server = http.createServer(app);

// Start the API server
server.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

const router = require("express").Router();
const snippetRoutes = require("./snippets");
const likeRoute = require("./likes");
const userRoute = require("./user");
const commentRoute = require("./comments");
const regUser = require('./users')
router.use("/snippets", snippetRoutes);
router.use("/likes", likeRoute);
router.use("/comments", commentRoute);
router.use("/user", userRoute);
router.use('/users', regUser);
module.exports = router;

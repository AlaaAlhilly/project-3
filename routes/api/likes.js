const router = require("express").Router();
const likesController = require("../../controllers/LikesController");

router.route("/")
  .get(likesController.findAll)
  .post(likesController.create);

router
  .route("/:u_id/:p_id")
  .get(likesController.findById)
  .put(likesController.update)
  .delete(likesController.remove);

module.exports = router;

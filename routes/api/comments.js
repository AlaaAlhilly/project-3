const router = require("express").Router();
const commentsController = require("../../controllers/CommentsController");

router.route("/")
  .get(commentsController.findAll)
  .post(commentsController.create);

router
  .route("/:u_id")
  .get(commentsController.findById)
  .put(commentsController.update)
  .delete(commentsController.remove);

module.exports = router;

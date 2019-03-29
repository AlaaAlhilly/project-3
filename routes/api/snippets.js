const router = require("express").Router();
const snippetsController = require("../../controllers/SnippetsController");

router.route("/")
  .get(snippetsController.findAll)
  .post(snippetsController.create);

router
  .route("/:id")
  .get(snippetsController.findById)
  .put(snippetsController.update)
  .delete(snippetsController.remove);

module.exports = router;

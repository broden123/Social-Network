const router = require("express").Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReactions,
  deleteReactions,
} = require("../../controllers/thoughtcontroller");

// /api/thoughts/
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought);
router.route("/:thoughtId").put(updateThought);
router.route("/:thoughtId").delete(deleteThought);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").post(addReactions);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReactions);

module.exports = router;

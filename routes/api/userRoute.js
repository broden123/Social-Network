const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriends,
  deleteFriends,
} = require("../../controllers/userController");

// /api/users/
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser);
router.route("/:userId").put(updateUser);
router.route("/:userId").delete(deleteUser);

// /api/users/:userId/friends/friendId
router.route("/:userId/friends/:friendId").post(addFriends);
router.route("/:userId/friends/:friendId").delete(deleteFriends);

module.exports = router;

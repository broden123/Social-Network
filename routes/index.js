const router = require("express").Router();
const thoughtRoutes = require("./api/thoughtRoute");
const userRoutes = require("./api/userRoute");

router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);

module.exports = router;

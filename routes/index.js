const router = require("express").Router();
const thoughtRoutes = require("./api/thoughtRoute");
const userRoutes = require("./api/userRoute");

router.use("/api/thoughts", thoughtRoutes);
router.use("/api/users", userRoutes);

module.exports = router;

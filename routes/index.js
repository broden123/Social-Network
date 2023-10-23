const router = require("express").Router();
const thoughtRoutes = require("./api/thoughtRoute");
const userRoutes = require("./api/userRoute");

router.use("/thought", thoughtRoutes);
router.use("/user", userRoutes);

module.exports = router;

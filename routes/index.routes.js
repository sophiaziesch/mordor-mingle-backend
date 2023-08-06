const router = require("express").Router();

router.get("/", (req, res, next) => {
	res.json("All good in index");
});

/* Routes to events */
const eventsRoutes = require("./events.routes");
router.use("/events", eventsRoutes);

/* Auth routes */
const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

module.exports = router;

const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/jwt.middleware");

router.get("/", (req, res, next) => {
	res.json("All good in index");
});

router.get("/getUser", isAuthenticated, (req, res) => {
	console.log(req.payload);
	res.status(200).json({ userId: req.payload });
});
/* Routes to events */
const eventsRoutes = require("./events.routes");
router.use("/events", eventsRoutes);

/* Auth routes */
const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);

module.exports = router;

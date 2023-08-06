const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

router.get("/", (req, res, next) => {
	res.json("All good in auth");
});

/* POST route to signup */
router.post("/signup", async (req, res) => {
	const payload = req.body;
	const salt = bcrypt.genSaltSync(13);
	const passwordHash = bcrypt.hashSync(payload.password, salt);
	try {
		await User.create({ username: payload.username, password: passwordHash });
		res.status(201).json({ message: "User created" });
	} catch (error) {
		console.log("Error on POST signup: ", error);
		res.json(500).json(error);
	}
});

/* POST route to login */
router.post("/login", async (req, res) => {
	const payload = req.body;
	/* Check if user exists */
	const potentialUser = await User.findOne({ username: payload.username });
	if (potentialUser) {
		if (bcrypt.compareSync(payload.password, potentialUser.password)) {
			/* Sign the JWT */
			const authToken = jwt.sign(
				{ userId: potentialUser._id },
				process.env.TOKEN_SECRET,
				{ algorithm: "H256", expiresIn: "6h" }
			);
			/* Sending back token to the front */
			res.status(202).json({ token: authToken });
		} else {
			/* Incorrect pasword */
			res.status(403).json({ errorMessage: "Password invalid" });
		}
	} else {
		/* No user found */
		res.status(403).json({ errorMessage: "No user found" });
	}
});

/* GET route to verify token */

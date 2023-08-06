const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

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

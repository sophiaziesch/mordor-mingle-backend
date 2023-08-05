const Event = require("../models/Event.model");
const router = require("express").Router();

/* GET all events (read) */
router.get("/", async (req, res) => {
	try {
		const events = await Event.find();
		res.status(200).json(events);
	} catch (error) {
		console.log("Error in GET all events: ", error);
		res.status(500).json(error);
	}
});

/* GET one event (read) */
router.get("/:eventId", async (req, res) => {
	try {
		const event = await Event.findById(req.params.eventId);
		res.status(200).json(event);
	} catch (error) {
		console.log("Error in GET on event: ", error);
		res.status(500).json(error);
	}
});

/* POST one event (create) */

/* PUT one event (update) */

/* DELETE one event (delete) */

module.exports = router;

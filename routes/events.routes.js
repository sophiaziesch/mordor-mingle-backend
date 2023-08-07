const Event = require("../models/Event.model");
const Comment = require("../models/Comment.model");
const router = require("express").Router();

router.get("/", (req, res, next) => {
	res.json("All good in events");
});

/* GET all events (read) */
router.get("/", async (req, res) => {
	try {
		const events = await Event.find();
		res.status(200).json(events);
	} catch (error) {
		console.log("Error on GET all events: ", error);
		res.status(500).json(error);
	}
});

/* GET one event (read) */
router.get("/:eventId", async (req, res) => {
	try {
		const event = await Event.findById(req.params.eventId);
		res.status(200).json(event);
	} catch (error) {
		console.log("Error on GET on event: ", error);
		res.status(500).json(error);
	}
});

/* POST one event (create) */
router.post("/", async (req, res) => {
	try {
		const payload = req.body;
		const newEvent = await Event.create(payload);
	} catch (error) {
		console.log("Error on POST one event: ", error);
		res.status(500).json(error);
	}
});

/* PUT one event (update) */
router.put("/:eventId"),
	async (req, res) => {
		const payload = req.body;
		const updatedEvent = await Event.findByIdAndUpdate(
			req.params.eventId,
			payload,
			{ new: true }
		);
		res.status(202).json(updatedEvent);
		try {
		} catch (error) {
			console.log("Error on PUT one event: ", error);
			res.status(500).json(error);
		}
	};

/* DELETE one event (delete) */
router.delete("/:eventId", async (req, res) => {
	try {
		await Event.findByIdAndDelete(req.params.eventId);
		res.status(202).json({ message: "Event deleted" });
	} catch (error) {
		console.log("Error on DELETE one student: ", error);
		res.status(500).json(error);
	}
});

/* COMMENTS ROUTES */
/* GET all comments */
router.get("/:eventId/comments", async (req, res) => {
	try {
		const eventId = req.params.eventId;
		const comments = await Comment.find({ event: eventId });
		res.status(200).json(comments);
	} catch (error) {
		console.log("Error on GET all comments: ", error);
		res.status(500).json(error);
	}
});

/* POST new comment */
router.post("/:eventId/comments", async (req, res) => {
	try {
		const eventId = req.params.eventId;
		const payload = req.body;
		payload.event = eventId;

		const newComment = await Comment.create(payload);
		await newComment.populate("userId").execPopulate();

		res.status(201).json(newComment);
	} catch (error) {
		console.log("Error on POST one comment: ", error);
		res.status(500).json(error);
	}
});

/* DELETE comment */
router.delete("/:eventId/comments/:commentId", async (req, res) => {
	try {
		await Comment.findByIdAndDelete(req.params.commentId);
		res.status(202).json({ message: "Event deleted" });
	} catch (error) {
		console.log("Error on DELETE one event: ", error);
		res.status(500).json(error);
	}
});

module.exports = router;

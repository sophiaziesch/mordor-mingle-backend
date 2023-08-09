const Event = require("../models/Event.model");
const Comment = require("../models/Comment.model");
const router = require("express").Router();
const { isAuthenticated } = require("../middlewares/jwt.middleware");
const User = require("../models/User.model");

// router.get("/", (req, res, next) => {
// 	res.json("All good in events");
// });
//MY FUCKING GOD I SPENT TWO HOURS ON THIS SHITTTTTTTTT

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
    const event = await Event.findById(req.params.eventId)
      .populate("userId")
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          model: "User",
        },
      });
    console.log(event);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
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
    res.status(201).json(newEvent);
    console.log(newEvent);
  } catch (error) {
    console.log("Error on POST one event: ", error);
    res.status(500).json(error);
  }
});
// router.post("/", async (req, res) => {
// 	try {
// 		const payload = req.body;
// 		const userId = req.payload.userId;
// 		console.log("POST event payload: ", payload);
// 		const newEvent = await Event.create(payload);
// 		res.status(201).json(newEvent);
// 		//console.log(newEvent);
// 	} catch (error) {
// 		console.log("Error on POST one event: ", error);
// 		res.status(500).json(error);
// 	}
// });

/* PUT one event (update) */
router.put("/update/:eventId", async (req, res) => {
  console.log(req.params.eventId);
  try {
    const payload = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventId,
      payload,
      { new: true }
    );
    res.status(202).json(updatedEvent);
  } catch (error) {
    console.log("Error on PUT one event: ", error);
    res.status(500).json(error);
  }
});

/* DELETE one event (delete) */
router.delete("/:eventId", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.eventId);
    res.status(202).json({ message: "Event deleted" });
  } catch (error) {
    console.log("Error on DELETE one event: ", error);
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
router.post("/:eventId", isAuthenticated, async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const payload = req.body;
    const userId = req.payload.userId;
    console.log(payload);
    const newComment = await Comment.create({
      text: payload.text,
      event: eventId,
      userId,
    });
    const updatedEvent = await Event.findByIdAndUpdate(eventId, {
      $push: { comments: newComment },
    });
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
    res.status(202).json({ message: "Comment deleted" });
  } catch (error) {
    console.log("Error on DELETE one comment ", error);
    res.status(500).json(error);
  }
});

module.exports = router;

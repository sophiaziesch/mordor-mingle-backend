const Event = require("../models/Event.model");
const router = require("express").Router();

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
    res.status(201).json(newEvent);
    console.log(newEvent);
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
    console.log("Error on DELETE one event: ", error);
    res.status(500).json(error);
  }
});

module.exports = router;

const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

const { isAuthenticated } = require("../middlewares/jwt.middleware");

router.get("/", (req, res, next) => {
  res.json("All good in auth");
});

/* POST route to signup */
router.post("/signup", async (req, res, next) => {
  const payload = req.body;
  console.log(payload);
  const salt = bcrypt.genSaltSync(13);
  const passwordHash = bcrypt.hashSync(payload.password, salt);
  try {
    await User.create({
      username: payload.username,
      email: payload.email,
      password: passwordHash,
    });
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log("Error on POST signup: ", error);
    res.json(500).json(error);
  }
});

/* POST route to login */
router.post("/login", async (req, res, next) => {
  const payload = req.body;
  console.log(payload);
  try {
    /* Check if user exists */
    const potentialUser = await User.findOne({ username: payload.username });
    console.log(potentialUser);
    if (potentialUser) {
      if (bcrypt.compareSync(payload.password, potentialUser.password)) {
        /* Sign the JWT */
        const authToken = jwt.sign(
          { userId: potentialUser._id },
          process.env.TOKEN_SECRET,
          { algorithm: "HS256", expiresIn: "6h" }
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
  } catch (error) {
    console.log("Error on POST login: ", error);
    res.status(500).json.error;
  }
});

/* GET route to verify token */
router.get("/verify", isAuthenticated, async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.payload.userId);
    /* Never send password to front end */
    currentUser.password = "*****";
    res.status(200).json({ message: "Token is valid", currentUser });
  } catch (error) {
    console.log("Error on GET verify: ", error);
  }
});

/* GET one user route */

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId)
      .populate("eventsCreated")
      .populate("eventsLiked");

    res.status(200).json(user);
  } catch (error) {
    console.log("Error on GET on event: ", error);
    res.status(500).json(error);
  }
});

/* update user info (PUT) */
router.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const payload = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, payload, {
      new: true,
    });
    res.status(202).json(updatedUser);
  } catch (error) {
    console.log("Error updating user info: ", error);
    res.status(500).json(error);
  }
});

//  POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post(
  "/upload",
  fileUploader.single("profileImage"),
  (req, res, next) => {
    // console.log("file is: ", req.file)

    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }

    // Get the URL of the uploaded file and send it as a response.
    // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
    res.json({ fileUrl: req.file.path });
  }
);

module.exports = router;

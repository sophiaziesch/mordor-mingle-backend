const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    date: {
      type: Date,
      default: Date.now,
      required: [true, "Date is required."],
    },
    location: {
      type: [String],
      enum: [
        "Edoras",
        "Fangorn",
        "Gondor",
        "Isengard",
        "Minas Tirith",
        "Mordor",
        "Moria",
        "Rivendell",
        "Rohan",
        "The Shire",
      ],
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;

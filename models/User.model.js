const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, "Username is required."],
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: [true, "Email is required."],
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Password is required."],
		},
		eventsCreated: [{ type: Schema.Types.ObjectId, ref: "Event" }],
		eventsLiked: [{ type: Schema.Types.ObjectId, ref: "Event" }],
		profileImage: String,
		race: {
			type: [String],
			enum: [
				"Dwarf",
				"Elf",
				"Ent",
				"Hobbit",
				"Human",
				"Orc",
				"Uruk-hai",
				"Wizzard",
				"Other",
			],
		},
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const User = model("User", userSchema);

module.exports = User;

const { Schema, model, SchemaType } = require("mongoose");

const commentSchema = new Schema(
	{
		text: {
			type: String,
			required: [true, "Text is required."],
			trim: true,
		},
		event: {
			type: Schema.Types.ObjectId,
			ref: "Event",
		},
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;

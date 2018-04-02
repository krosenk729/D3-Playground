const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create CommentSchema object 
const CommentSchema = new Schema({
	text: {
		type: String,
		required: true
	}
});


// Create model from schema 
const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
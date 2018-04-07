const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create ArticleSchema object
const ArticleSchema = new Schema({
	title: {
		type: String,
		unique: true,
		required: true
	},
	img: {
		type: String
	},
	comment_link: {
		type: String
	},
	desc: {
		type: String
	},
	link: {
		type: String
	},
	isOnion: {
		type: Boolean,
		default: false
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}]
});

// Create model from schema 
const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create ArticleSchema object
const ArticleSchema = new Schema({
	title: {
		type: String,
		unique: true
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
	comments: [{
			type: Schema.Types.ObjectId,
			ref: "Comment"
		}]
});

let Article;
try{
	Article = mongoose.model("Article");
} catch (err){
	Article = mongoose.model("Article", ArticleSchema);
}


// Create model from schema 
// const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const logger = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const router = express.Router();
const app = express();

// =============================================================
// Middleware 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.static( path.join(__dirname, 'src', 'client') ));

// =============================================================
// Scrape Site Endpoints

const cheerio = require("cheerio");
const request = require("request");

router
.get("/rnto", function (req, res) {
	const site = "https://www.reddit.com/r/nottheonion/";
	request(site, function(req_err, req_res, data){
		const $ = cheerio.load(data);
		let scraped = [];
		
		$("[data-subreddit='nottheonion'].thing").each((iterator, element) => {
			scraped.push({
				title: $(element).find(".top-matter .title a").text(),
				img: $(element).find(".thumbnail img").attr("src"),
				comment_link: "https://www.reddit.com" + $(element).find(".flat-list.buttons .first a").attr("href"),
				link: $(element).find("a.thumbnail").attr("href")
			});
		});

		res.json(scraped);
	});
})
.get("/to", function (req, res) {
	const site = "https://local.theonion.com/";
	request(site, function(req_err, req_res, data){
		const $ = cheerio.load(data);
		let scraped = [];
		
		$(".post-wrapper > article").each((iterator, element) => {
			scraped.push({
				title: $(element).find("a.js_entry-link").text(),
				img: $(element).find("picture > source").attr("data-srcset"),
				link: $(element).find("a.js_entry-link").attr("href")
			});
		});

		res.json(scraped);
	});
});



// =============================================================
// Mongo, Mongoose CRUD 
const db = require("../models");

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/my_db",{
	useMongoClient: true
});

router
.get("/saved", function(req, res){

	db.Article.find()
	.populate("comments")
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.json(err);
	});

})
.post("/article", function(req, res){
	console.log(req.body);
	db.Article.create(req.body)
	.then(data => {
		res.json(data); 
	})
	.catch(err => {
		res.json(err);
	});

})
.get("/article/:articleid", function(req, res){

	db.Article.find({_id: req.params.articleid})
	.populate("comments")
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.json(err);
	});

})
.post("/comment/:articleid", function(req, res){
	console.log(req.body);
	db.Comment.create(req.body)
	.then(data => {
		return db.Article.findOneAndUpdate({_id: req.params.articleid}, {$push: {comments: data._id}}, {new: true});
	})
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.json(err);
	});

})
.put("/comment/:commentid", function(req, res){
	console.log("PUT REQUEST FOR... " + req.params.commentid);
	console.log(req.body);
	db.Comment.findOneAndUpdate({_id: req.params.commentid}, {$set: {text: req.body.text}})
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.json(err);
	});

})
.delete("/comment/:commentid", function(req, res){
	console.log(req.body);
	db.Comment.findOneAndRemove({_id: req.params.commentid})
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.json(err);
	});
});


// =============================================================
// Export

module.exports = router;
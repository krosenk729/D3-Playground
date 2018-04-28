const express = require("express");
const bodyParser = require("body-parser");
const async = require("asyncawait/async");
const await = require("asyncawait/await");
const path = require("path");
const logger = require("morgan");
const router = express.Router();
const app = express();

// =============================================================
// Middleware 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.static( path.join(__dirname, "src", "client") ));

// =============================================================
// Scrape Site Endpoints

const cheerio = require("cheerio");
const request = require("request");

router.get("/trends", function (req, res) {
	const site = "https://medium.com/";
	request(site, function(req_err, req_res, data){
		const $ = cheerio.load(data);
		let scraped = [];
		
		$("h3.ui-h3").each((iterator, element) => {
			let title = $(element).text();
			scraped.push(countLetters(title));
		});

		res.json(scraped);
	});
});

router.get("/colors", function (req, res) {
	console.log("running");
	const site = "https://webgradients.com/";
	request(site, function(req_err, req_res, data){
		const $ = cheerio.load(data);
		let pairs = [];

		$(".gradient__colors_box").each((iterator, element)=>{
			pairs.push( [
				$(element).find(".gradient__color").first().text(),
				$(element).find(".gradient__color").last().text()
				] );
		});

		res.json(pairs);
	});
});

// =============================================================
// Util Function

function countLetters(text){
	const vowels = text.split('').filter(i => ["a", "e", "i", "o", "u"].indexOf(i) > -1).length,
		consonants = text.length - vowels,
		caps = text.split('').filter(i => i === i.toUpperCase()).length,
		lowers = text.length - caps,
		katherines = text.match(/[katherine]/gmi) ? text.match(/[katherine]/gmi).length : 0,
		extras = text.match(/\W/gmi) ? text.match(/\W/gmi).length : 0,
		nums = text.match(/\d/gmi) ? text.match(/\d/gmi).length : 0;

	return {text, vowels, consonants, caps, lowers, katherines, extras, nums};
}

// =============================================================
// Export

module.exports = router;
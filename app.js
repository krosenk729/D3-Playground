const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const logger = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const app = express();


// =============================================================
// Middleware 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.static( path.join(__dirname, "src", "client") ));

// =============================================================
// API Endpoint Routes

const api = require("./src/server/api");
app.use("/api", api);

// =============================================================
// Views

app.get("*", function(req, res){
	res.sendFile( path.join(__dirname, "src", "client", "index.html") );
});

// =============================================================
// Starting Server

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("App running on port " + PORT);
});


// =============================================================
// Export App for Testing

module.exports = app;

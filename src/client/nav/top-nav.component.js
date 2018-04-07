angular.module("onionQuiz").component("topNav", {
	template: `
	<nav class="app-nav top-nav">
	<div class="play">
	<a href="#/quiz">Play "Guess The Onions"</a>
	</div>
	<div class="d-none d-md-block">
	<a href="#/scraped">See All Scrapes (Spoiler Alert)</a>
	<a href="#/saved">Saved Articles</a>
	</div>
	</nav>
	`,
	controller: function AppNavController(){ }
});
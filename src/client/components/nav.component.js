angular.module("onionQuiz").component("appNav", {
	template: `
	<nav class="top-nav">
	<div class="play">
	<a href="#/quiz">Play "Guess The Onions"</a>
	</div>
	<div>
	<a href="#/scraped">See All Scrapes (Spoiler Alert)</a>
	<a href="#/saved">Saved Articles</a>
	</div>
	</nav>
	`,
	controller: function AppNavController(){ }
});
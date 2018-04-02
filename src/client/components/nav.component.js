angular.module("onionQuiz").component("appNav", {
	template: `
	<nav>
	<a href="#/quiz">Play</a>
	<a href="#/scraped">Spoiler Alert</a>
	<a href="#/saved">Saves</a>
	</nav>
	`,
	controller: function AppNavController(){ }
});
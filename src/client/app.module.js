angular.module("onionQuiz", [
	"ngRoute",
	"quiz",
	"savedArticles",
	"scrapedArticles"
]).config(["$routeProvider", function($routeProvider){
	$routeProvider.when("/quiz", {
		template: "<quiz></quiz>"
	}).when("/scraped", {
		template: "<scraped-articles></scraped-articles>"
	}).when("/saved", {
		template: "<saved-articles></saved-articles>"
	}).otherwise("/quiz");
}]);

angular.module("onionQuiz", [
	"ngRoute",
	"quiz",
	"savedArticles",
	"scrapedArticles"
]).config(["$routeProvider", function($routeProvider){
	$routeProvider.when("/", {
		template: "<div>teestttttinggggg</div>"
	}).when("/quiz", {
		template: "<quiz></quiz>"
	}).when("/scraped", {
		template: "<scraped-articles></scraped-articles>"
	}).when("/saved", {
		template: "<saved-articles></saved-articles>"
	});
}]);

/*

angular.module("onionQuiz", [
	"ngRoute",
	"quiz",
	"savedArticles",
	"scrapedArticles"
])
.config(["$locationProvider", "$routeProvider"],
function config($locationProvider, $routeProvider){
	$locationProvider.html5Mode(true);
	
	$routeProvider
	.when("/quiz", {
		template: "<quiz></quiz>"
	})
	.when("/scrapes", {
		template: "<scraped-articles></scraped-articles>"
	})
	.when("/saves", {
		template: "<saved-articles></saved-articles>"
	});
	// .otherwise("/quiz");

});;

*/
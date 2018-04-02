angular.module("scrapedArticles", []).component("scrapedArticles", {
	templateUrl: "templates/scraped.template.html",
	controller: function ScrapedArticlesController($http){

		console.log('scraped component');
		
		this.spoiled = false;
		this.onions = [];
		this.notonions = [];

		$http.get('/api/rnto').then( data => {
			this.notonions = data;
		});

		$http.get('/api/to').then( data => {
			this.onions = data;
		});

		this.spoil = function(){
			this.spoiled = true;
		}
	}
});
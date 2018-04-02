angular.module("scrapedArticles", []).component("scrapedArticles", {
	templateUrl: "templates/scraped.template.html",
	controller: function ScrapedArticlesController($http){
		this.spoiled = false;
		this.onions = [];
		this.notonions = [];

		$http.get('/api/rnto').then( data => {
			this.notonions = data.data;
		});

		$http.get('/api/to').then( data => {
			this.onions = data.data;
		});

		this.spoil = function(){
			this.spoiled = true;
		}
	}
});
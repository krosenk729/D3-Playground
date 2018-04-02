angular.module("scrapedArticles", []).component("scrapedArticles", {
	templateUrl: "templates/scraped.template.html",
	controller: function ScrapedArticlesController($http){
		this.spoiled = false;
		this.onions = [];
		this.notonions = [];

		$http.get('/api/rnto').then( data => {
			this.notonions = data.data.splice(0, 6);
		});

		$http.get('/api/to').then( data => {
			this.onions = data.data.slice(0, 6);
		});

		this.spoil = function(){
			this.spoiled = true;
		}
	}
});
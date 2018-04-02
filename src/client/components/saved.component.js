angular.module("savedArticles", []).component("savedArticles", {
	templateUrl: "templates/saved.template.html",
	controller: function SavedArticlesController($http){
		console.log('saved component');
		this.saved = [];

		$http.get('/api/saved').then( data => {
			this.saved = data.data;
			console.log(data.data);
		});

	}
});
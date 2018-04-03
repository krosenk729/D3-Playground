angular.module("quiz", []).component("quiz", {
	templateUrl: "templates/quiz.template.html",
	controller: function QuizController($http){
		this.playing = false;
		this.allQuestions = [];

		this.$onInit = function(){
			async function getNotOnion(){
				return $http.get("/api/rnto");
			}
			async function getOnion(){
				return $http.get("/api/to");
			}

			async function getQuestions(){
				const notonions = await getNotOnion();
				const onions = await getOnion();

				console.log("notonions", notonions.data);

				notonions["data"].forEach(article => article.isOnion = false);
				onions["data"].forEach(article => article.isOnion = true);

				this.allQuestions = [...notonions.data, ...onions.data].sort((a, b) => 0.5 - Math.random() > 0);

			}
			getQuestions();
		}

		this.saveArticle = function(article){
			console.log(article);
			$http({
				url: "/api/article/",
				method: "POST",
				data: {...article}
			}).then( data => {
				article.saved = true;
			});
		}
	}
});
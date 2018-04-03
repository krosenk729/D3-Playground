angular.module("quiz", []).component("quiz", {
	templateUrl: "templates/quiz.template.html",
	controller: function QuizController($http){
		this.ready = false;
		this.started = false;
		this.resultShow = false;
		this.allQuestions = [];
		this.currentQuestion = [];

		this.$onInit = function(){
			const self = this;
			async function getNotOnion(){
				return $http.get("/api/rnto");
			}
			async function getOnion(){
				return $http.get("/api/to");
			}

			async function getQuestions(){
				const [notonions, onions] = await Promise.all([getNotOnion(), getOnion()]);

				notonions["data"].forEach(article => article.isOnion = false);
				onions["data"].forEach(article => article.isOnion = true);

				self.allQuestions = [...notonions.data, ...onions.data].sort((a, b) => 0.5 - Math.random() > 0);

				self.ready = true;
				self.currentQuestion = self.allQuestions.pop();
				console.log(self.ready);
			}
			getQuestions();

			setTimeout( ()=> console.log(this.ready), 10000);
		}

		this.startGame = function(){
			this.started = true;
		}

		this.checkOnion = function(isOnionGuess){
			console.log(isOnionGuess === this.currentQuestion.isOnion);
			this.currentQuestion.guessWasRight = isOnionGuess === this.currentQuestion.isOnion;
			this.resultShow = true;

			console.log("Show results", this.resultShow);
		}

		this.nextQuestion = function(){
			this.currentQuestion = this.allQuestions.pop();
		}

		this.saveArticle = function(article){
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
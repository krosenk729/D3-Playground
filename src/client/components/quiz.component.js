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
			self.ready = false;
			async function getNotOnion(){
				return $http.get("/api/rnto");
			}
			async function getOnion(){
				self.ready = true;
				return $http.get("/api/to");
			}

			async function getQuestions(){
				const [notonions, onions] = await Promise.all([getNotOnion(), getOnion()]);

				notonions["data"].forEach(article => article.isOnion = false);
				onions["data"].forEach(article => article.isOnion = true);

				self.allQuestions = [...notonions.data, ...onions.data].sort((a, b) => 0.5 - Math.random() > 0);
				self.currentQuestion = self.allQuestions.pop();
				return true
			}
			getQuestions().then(()=> self.ready = true );
		}

		this.startGame = function(){
			if(this.allQuestions.length < 1){ return }
			this.started = true;
			console.log(this.allQuestions);
		}

		this.checkOnion = function(isOnionGuess){
			console.log(isOnionGuess === this.currentQuestion.isOnion);
			this.currentQuestion.guessWasRight = isOnionGuess === this.currentQuestion.isOnion;
			this.resultShow = true;

			console.log("Show results", this.resultShow);
		}

		this.nextQuestion = function(){
			this.resultShow = false;
			this.currentQuestion = this.allQuestions.pop();
		}

		this.saveCurrentArticle = function(){
			$http({
				url: "/api/article/",
				method: "POST",
				data: {
					title: $this.currentQuestion.title,
					img: $this.currentQuestion.img,
					link: $this.currentQuestion.link,
					comment_link: $this.currentQuestion.comment_link
				}
			}).then( data => {
				currentQuestion.saved = true;
			});
		}
	}
});
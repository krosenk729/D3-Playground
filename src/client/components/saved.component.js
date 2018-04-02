angular.module("savedArticles", []).component("savedArticles", {
	templateUrl: "templates/saved.template.html",
	controller: function SavedArticlesController($http){
		console.log("saved component");
		this.saved = [];
		this.newComment = "";

		$http.get("/api/saved").then( data => {
			this.saved = data.data;
			console.log(data.data);
		});

		this.saveComment = function(articleId){
			console.log(articleId);
			console.log(this.newComment);
			$http({
				url: `/api/comment/${articleId}`,
				method: 'POST',
				data: {
					text: this.newComment
				}
			}).then( data => {
				// push results to array of comments
				// and clear out form
				const articleUpdate = this.saved.filter(article => article._id === data.data._id)[0];
				const comment = {
					text: this.newComment,
					_id: data.data.comments[data.data.comments.length-1]
				};
				articleUpdate.comments.push(comment);
				this.newComment = "";
			});
		}

		this.updateComment = function(commentId, commentText){
			console.log(commentId, commentText);
			$http({
				url: `/api/comment/${commentId}`,
				method: 'PUT',
				data: {
					text: commentText
				}
			}).then( data => {
				console.log("cool ", data);
			});
		}

		this.deleteComment = function(commentId){
			console.log(commentId);
		}

	}
});
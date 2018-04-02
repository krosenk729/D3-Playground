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
			if(!this.newComment){ return }
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
			if(!commentText){ return }
			$http({
				url: `/api/comment/${commentId}`,
				method: 'PUT',
				data: {
					text: commentText
				}
			});
		}

		this.deleteComment = function(commentId, articleId){
			// delete comment
			// then find the article it is attached to
			// and delete from its comments 
			$http({
				url: `/api/comment/${commentId}`,
				method: 'DELETE'
			}).then(data => {
				const articleUpdate = this.saved.filter(article => article._id === articleId)[0];
				articleUpdate.comments.forEach((comment, index, arr) => {
					if(comment._id === commentId){ arr.splice(index, 1) }
				});
			});
		}

	}
});
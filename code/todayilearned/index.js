// We're using the JSON API, doing a GET request to http://www.reddit.com/r/todayilearned/top.json?sort=top&t=day

var request = require('request');

request.get({ url : 'http://www.reddit.com/r/todayilearned/top.json?sort=top&t=day', json : true }, function (err, response, body) {
	var posts = body.data.children;
	posts.forEach(function (post) {
		console.log(post.data.title);
	});
});

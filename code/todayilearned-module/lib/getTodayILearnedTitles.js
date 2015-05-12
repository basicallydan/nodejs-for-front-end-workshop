// We're using the JSON API, doing a GET request to http://www.reddit.com/r/todayilearned/top.json?sort=top&t=day

var request = require('request');

function getTodayILearnedTitles(options, callback) {
	var titles = [];
	if (!options) {
		options = {
			timeFrame: 'day' // or week, or month, or year
		};
	}
	request.get({ url : 'http://www.reddit.com/r/todayilearned/top.json?sort=top&t=' + options.timeFrame, json : true }, function (err, response, body) {
		if (err) {
			callback(err);
		}

		var posts = body.data.children;
		posts.forEach(function (post) {
			titles.push(post.data.title);
		});

		callback(null, titles);
	});
}

module.exports = getTodayILearnedTitles;
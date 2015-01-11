var getTodayILearnedTitles = require('./lib/getTodayILearnedTitles');

getTodayILearnedTitles({ timeFrame : 'day' }, function (err, titles) {
	titles.forEach(function (title) {
		console.log(title);
	});
});
"use strict";

(function() {
	$(function() {
		var tweetLink = "https://twitter.com/intent/tweet?text=";
		var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
		var counter = 0;

		function getQuote() {
			$.getJSON(quoteUrl, createTweet);
			console.log('ONE');
		}

		function createTweet(input) {
			console.log('TWO');
			var data = input[0];

			var quoteText = $(data.content).text().trim();
			var quoteAuthor = data.title;

			if(!quoteAuthor.length) {
				quoteAuthor = "Unknown author";
			}

			console.log('THREE');

			var tweetText = "Quote of the day - " + quoteText + ". Author: " + quoteAuthor;
			if((tweetText.length > 140) && (counter < 30)) {
				getQuote();
				counter++;
			} else {
				var tweet = tweetLink + encodeURIComponent(tweetText);
				$('.quote').text(quoteText);
				$('.author').text("Author: " + quoteAuthor);
				$('.tweet').attr('href', tweet);
			}
		}

		$(document).ready(function() {
			getQuote();
			$('.trigger').click(function() {
				getQuote();
			});
		});
	});
})();
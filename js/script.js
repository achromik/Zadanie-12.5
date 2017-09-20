var prefix = "https://cors-anywhere.herokuapp.com/";
var tweetLink = 'https://twitter.com/intent/tweet?text=',
    quoteUrl = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';

// $.ajax({
//     dataType: 'json',
//     url: quoteUrl,
//     data: null,
//     success: createTweet
// });
//
// above is alternate to code below
//
function getQuote() {
    $.ajaxSetup({ cache: false });
    $.getJSON(prefix + quoteUrl, createTweet);
}

function createTweet(input) {
    var data = input[0];

    var quoteText = $(data.content).text().trim();
    var quoteAuthor = data.title;

    if(!quoteAuthor.length) { 
        quoteAuthor = 'Unknown';
    }

    var tweetText = 'Quote of the day - ' + quoteText + ' Author: ' + quoteAuthor;

    if (tweetText.length > 140) {
        getQuote();
    } else {
        var tweet = tweetLink + encodeURIComponent(tweetText);
        $('.quote').text(quoteText);
        $('.author').text(quoteAuthor);
        $('.tweet').attr('href', tweet);
    }
}


$(document).ready(function() {
    getQuote();
    $('.trigger').on('click', function() {
        getQuote();
    });
});


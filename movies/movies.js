var cheerio = require('cheerio');
var request = require('request');
var iconv = require('iconv-lite');
var encoding = require('encoding');

exports.getMovies = function(url, callback) {
    var movies = [];
    request(url, function(err, res, body) {
        if(err) {
            return callback(err);
        }

        var html = encoding.convert(body, 'gb2312');
        var $ = cheerio.load(html.toString());
        $('.co_content8 .ulink').each(function (index, item) {
            var title = $(item).text();
            var link = $(item).attr('href');
            var movie = {
                title: title,
                link: link
            }
            movies.push(movie);
        });
        callback(null, movies);
    });
};
var request = require('request');
var cheerio = require('cheerio');

exports.videoCrawler = function videoCrawler(url, callback) {
    request(url, function(err, res) {
        if(err) {
            callback(err);
        }

        var $ = cheerio.load(res.body.toString());
        var videoList = [];
        var chapters = $('.chapter');
        chapters.each(function(item) {
            var chapterTitle = $(this).find('h3').text().trim();
            var videos = $('.video').children('li');

            videos.each(function(item) {
                var videoTitle = $(this).find('.J-media-item').text().trim();
                item = {
                    title: chapterTitle,
                    url: 'http://www.imooc.com' + $(this).attr('href'),
                    name: videoTitle
                };
                videoList.push(item);
            });
        });
        callback(null, videoList);
    });
};

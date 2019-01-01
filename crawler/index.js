var async = require('async');
var video = require('./video');
var save = require('./save');
var url = 'http://www.imooc.com/learn/46';
var videoList;

async.series([
    function (done) {
        video.videoCrawler(url, function(err, list) {
            videoList = list;
            done(err);
        })
    },
    function (done){
        save.videoSave(videoList, done);
    },
], function(err) {
    if(err) {
        console.log(err);
    }
    console.log('保存成功');
    process.exit(0);
});

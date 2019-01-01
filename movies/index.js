var movies = require('./movies');
var save = require('./save');
var async = require('async');
var url = 'http://www.ygdy8.net/html/gndy/dyzz/index.html';
var movieList;

async.series([
    function(done) {
        movies.getMovies(url, function(err, list) {
            movieList = list;
            console.log(movieList);
            done(err);
        })
    },
    function(done) {
        save.save(movieList, done);
    },
], function(err) {
    if(err) {
        console.log(err.message);
    } else {
        console.log('保存成功');
    }
    process.exit(0);
});
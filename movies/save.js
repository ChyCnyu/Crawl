var mysql = require('mysql');
var async = require('async');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});

exports.save = function(list, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            callback(err);
        }

        var insertSql = 'insert into movies set title = ?, link = ?';
        async.eachSeries(list, function(item, next) {
            connection.query(insertSql, [item.title, item.link], next)
        }, callback);
        connection.release();
    });
};
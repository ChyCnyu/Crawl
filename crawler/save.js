var mysql = require('mysql');
var async = require('async');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});

exports.videoSave = function(list, callback) {
    pool.getConnection(function(err, connection) {
        if(err) {
            return callback(err);
        }

        var findSql = 'select * from course where id=?';
        var updateSql = 'update course set title = ?, url = ? , name = ? where id = ?';
        var insertSql = 'insert into course (title, url, name) values(?, ?, ?)';

        async.eachSeries(list,function(item,next) {
            connection.query(findSql, [item.id], function(err, result) {
                if(err) {
                    return next(err);
                }
                if(result.length >= 1) {
                    connection.query(updateSql, [item.title, item.url, item.name], next);
                } else {
                    connection.query(insertSql, [item.title, item.url, item.name], next);
                }
            });
        }, callback)
        connection.release();
    })
};
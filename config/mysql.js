/**
 * mysql数据库封装
 */
'use strict';

const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'laikunqi5280',
    database: 'today_sign'
});

var query = function(sql, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function(qerr, vals, fields) {
                //释放连接  
                conn.release();
                //事件驱动回调  
                callback(qerr, vals, fields);
            });

        }
    });
};

module.exports = query;
var express = require('express');
var router = express.Router();
var mysql = require('../mysql/mysql');

/* GET users listing. */
router.get('/', function (req, res, next) {
    mysql('select * from activity LIMIT 10', function (err, rows, fields) {
        if (err) throw err;
        console.log('获取mysql查询数据:' + JSON.stringify(rows));
        res.send('获取mysql查询数据:' + JSON.stringify(rows));
    });
});


module.exports = router;
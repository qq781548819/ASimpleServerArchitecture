'use strict';

var mysql = require('../config/mysql');
var jwt = require("jsonwebtoken");

exports.auth = function (req, res) {
    var username = req.query.username || req.body.username;
    var psw = req.query.psw || req.body.psw;
    console.log('username:' + username + ',psw:' + psw);
    if (!username) {
        return res.status(400).send("username require!");
    }
    if (!psw) {
        return res.status(400).send("psw require!");
    }

    //mysql查询用户表,暂时模拟
    if (username != 'admin' && psw != '123456') {
        return res.status(401).send('无效账号密码，请校验！');
    }
    var authToken = jwt.sign({
        username: username
    }, "laikunqidagege", {
        'expiresIn': '1h' // 设置过期时间20秒20
    });
    res.status(200).json({
        access_token: authToken,
        expires_in: '1h', //'1h'
        token_type: 'json web token',
        scope: 'all scope'
    });
}
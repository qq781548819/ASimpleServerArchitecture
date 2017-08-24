"use strict";

var mysql = require('../../mysql/mysql');
var jwt = require("jsonwebtoken");

exports.auth = function (req, res) {
    
    let username = req.query.username || req.body.username;
    let psw = req.query.psw || req.body.psw;
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

    // TODO: 验证实际用户
    let profile = {
        first_name: 'kunqi',
        last_name: 'lai',
        email: '781548819@qq.com',
        id: 123
    };
    //设置加密密钥
    let jwtSecret = 'laikunqidagege';
    //生成json web token
    let authToken = jwt.sign(profile, jwtSecret, {
        'expiresIn': '1h' // 设置过期时间20秒20
    });
    res.status(200).json({
        token: authToken,
        expires_in: '1h', //'1h'
        token_type: 'json web token',
        scope: 'all scope'
    });
}
var express = require('express');
var router = express.Router();
var c_auth = require('../controller/c_auth');

//用户账号密码授权token
router.get('/', c_auth.auth);
module.exports = router;
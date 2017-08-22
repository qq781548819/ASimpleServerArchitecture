
'use strict'

//代理控制器路由模块，该模块用来测试
import express from 'express';
import Test from '../controller/test/test'
const router = express.Router();


//用户账号密码授权token
router.post('/add', Test.addUser);
router.post('/req',Test.requestData);



export default router;
'use strict';

//这是测试mongodb数据库的建议增删改查方法
import UserModel from '../../models/user/user'

import request from 'request'

import _ from 'lodash';

class User {
    // constructor() {}
    //添加新用户测试
    addUser(req, res, next) {
        let body = req.body;
        if (!body.user_name || !body.password || !body.nick_name) {
            return res.send({
                status: 1,
                type: 'ADD_USER_FAILED',
                message: '用户名或密码不合法',
            })
        }
        let user = {
            user_name: body.user_name,
            nick_name: body.nick_name,
            password: body.password,
            city: body.city,
            school: body.school,
        }
        UserModel.count({
            user_name: body.user_name
        }, (err, count) => {
            if (err) return res.send({
                status: 1,
                type: 'ADD_USER_FAILED',
                message: '用户名或密码不合法',
            })
            if (count == 0) {
                UserModel.create(user, (err) => {
                    if (err) {
                        console.log(`添加错误:${err}`)
                        res.send({
                            status: 1,
                            type: 'ADD_USER_FAILED',
                            message: '添加用户失败',
                        })
                    }
                    res.send({
                        status: 0,
                        type: 'ADD_USER_SUCCESS',
                        message: '添加用户成功',
                    })
                })
            } else {
                return res.send({
                    status: 1,
                    type: 'ADD_USER_FAILED',
                    message: '该用户名已经被注册了，请重新提交用户名',
                })
            }

        })


    }

    //使用request转发http请求
    requestData(req, res, next) {
        request('http://v.juhe.cn/movie/index?key=c866a90f54c09fe9d9de8bc66a93ff24&title=%E9%92%A2%E9%93%81%E4%BE%A03', function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred 
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
            console.log('body:', body); // Print the HTML for the Google homepage. 
            if (error) {
                return res.send({
                    status: 0,
                    type: 'err',
                    message: '获得数据',
                    data: error
                })
            } else {
                res.send({
                    body,
                    random: _.random(15, 20)
                })
            }
        });
    }
}


export default new User();
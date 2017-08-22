'use strict';

//这是测试mongodb数据库的建议增删改查方法
import UserModel from '../../models/user/user'
class User {
    constructor() {

    }
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
}


export default new User();
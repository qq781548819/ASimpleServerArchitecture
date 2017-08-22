'use strict';

//用户鉴权中间件
import expressJwt from 'express-jwt';


export default expressJwt({
    //jwt密钥，要保证授权密钥与鉴权密钥相同
    secret: 'laikunqidagege',
    //是否开启token鉴权
    credentialsRequired: true,
    //扩展token获取方案
    getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({
    path: ["/auth", "/"]//, '/test'
})












// class Auth {
//     constructor() {

//     }

//     getExpressJwt() {
//         return expressJwt({
//             //jwt密钥，要保证授权密钥与鉴权密钥相同
//             secret: 'laikunqidagege',
//             //是否开启token鉴权
//             credentialsRequired: true,
//             //扩展token获取方案
//             getToken: function fromHeaderOrQuerystring(req) {
//                 if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//                     return req.headers.authorization.split(' ')[1];
//                 } else if (req.query && req.query.token) {
//                     return req.query.token;
//                 }
//                 return null;
//             }
//         }).unless({
//             path: ["/auth", "/", '/test']
//         })
//     }

// }
// export default new Auth();


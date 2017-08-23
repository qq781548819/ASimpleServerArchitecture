import express from 'express';
import db from './mongodb/db.js';
import router from './routes/index.js';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import winston from 'winston';
import expressWinston from 'express-winston';
import history from 'connect-history-api-fallback';
import jwtAuth from './middleware/jwtAuth';
const config = require('config-lite')(__dirname); //获取默认配置文件
//socket.io鉴权库
var socketioJwt = require('socketio-jwt');
var app = express();

//socket.io
var server = require('http').Server(app);
var sio = require('socket.io')(server);


// sio.set('authorization', socketioJwt.authorize({
//     secret: 'laikunqidagege',
//     handshake: true
// }));
// //上述JWT用密钥 jwtSecret 签名加密。
// sio.sockets
//     .on('connection', function (socket) {
//         console.log(socket.handshake.decoded_token.email, 'connected');
//         //socket.on('event');
//     });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function (req, res, next) {
    res.io = sio;
    next();
});


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//设置header
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.setHeader('Content-Type', 'text/html;charset=UTF-8');
    // res.setHeader('content-type', 'text/html;charset=gb2312');
    res.header("X-Powered-By", '3.2.1')
    console.log(`query参数：${JSON.stringify(req.query)}`)
    console.log(`body参数：${JSON.stringify(req.body)}`)
    console.log(`params参数：${JSON.stringify(req.params)}`)
    console.log(`------------------------------------------------------------------`)
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

//用户鉴权中间件
app.use(jwtAuth);


app.use(expressWinston.logger({
    transports: [
        //关闭日志loger打印
        // new(winston.transports.Console)({
        //     json: true,
        //     colorize: true
        // }),
        new winston.transports.File({
            filename: 'logs/success.log'
        })
    ]
}));

router(app);

//日志记录中间件
app.use(expressWinston.errorLogger({
    transports: [
        // new winston.transports.Console({
        //     json: true,
        //     colorize: true
        // }),
        new winston.transports.File({
            filename: 'logs/error.log'
        })
    ]
}));


//401鉴权失败返回提示码
app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            req.headers.authorization.split(' ')[1];
            res.status(401).send("token过期，请重新获取token");
        } else if (req.query && req.query.token) {
            req.query.token;
            res.status(401).send("token过期，请重新获取token");
        } else {
            res.status(401).send("请提交授权的token值，进行用户鉴权校验，感谢您的访问!!!!");
        }
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('未找到当前路由');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.use(history());


server.listen(config.port);

// module.exports = app;
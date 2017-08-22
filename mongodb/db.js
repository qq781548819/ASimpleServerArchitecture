'use strict';
//mongo数据库连接
import mongoose from 'mongoose';
const config = require('config-lite')(__dirname);
mongoose.connect(config.url, {server:{auto_reconnect:true}});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open' ,() => {
	console.log('连接数据库成功')
})

db.on('error', function(error) {
    console.error('连接数据库失败: ' + error);
    mongoose.disconnect();
});

db.on('close', function() {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect(config.url, {server:{auto_reconnect:true}});
});

export default db;

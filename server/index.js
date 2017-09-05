const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // 解析body字段模块
const morgan = require('morgan'); // 命令行log显示
const mongoose = require('mongoose');
const passport = require('passport'); // 用户认证模块passport
const Strategy = require('passport-http-bearer').Strategy; // token验证模块
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const routes = require('./routes');
const config = require('./config');

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

let port = process.env.PORT || 8090;

app.use(passport.initialize()); // 初始化passport模块
app.use(morgan('dev')); // 命令行中显示程序运行日志,便于bug调试
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // 调用bodyParser模块以便程序正确解析body传入值

var identityKey = 'skey';
app.use(session({
    name: identityKey,
    secret: 'chyingp', // 用来对session id相关的cookie进行签名
    store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 15 * 60 * 1000 // 有效期，单位是毫秒, 这里设置的是15分钟
    }
}));

routes(app);

mongoose.Promise = global.Promise;
mongoose.connect(config.database); // 连接数据库

app.listen(port, () => {
    console.log('listening on port : ' + port);
})
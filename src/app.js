var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/db', { useMongoClient: true });
mongoose.Promise = global.Promise; //clean Deprecation Warning: Mongoose: mpromise (mongoose's default promise library) is deprecated

var app = express();



//静态文件
app.use('/public', express.static(path.join(__dirname,'public')));


app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.all('/', function (req, res, next) {
    console.log('Accessing the secret section ...');
    console.log('Cookies: ', typeof req.cookies);
    next(); // pass control to the next handler
});

//错误处理中间件有 4 个参数
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 将路由挂载至应用
// app.use('/', apiRouter);
app.use('/api',  require('./router/api'));
app.use('/admin', require('./router/admin'));


app.get('/', function (req, res) {
    res.render('index.html', {
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
});

app.listen(3000);
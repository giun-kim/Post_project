var express = require('express');
var cookieParser = require('cookie-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/posts');

var sequelize = require('./models').sequelize;

var app = express();
app.use(express.json())
sequelize.sync();

app.set('view engine', 'jade');

app.use(cookieParser());

app.use('/api', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let db = require("./models/");
var app = express();

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.get('/', (req, res, next) => {
  db.user.findAll({}).then((users) => {
    res.render('index.ejs', {users: users});
  });
});

//新規作成画面のルーティング
app.get('/new', (req, res) => {
  res.render('new.ejs');
});

//新規作成アクション
app.post('/create', (req, res) => {
  db.user.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  res.render('/')
});

//編集画面へのルーティング
app.get('/edit/:id', (req, res, next)=> {
  db.user.findByPk(req.params.id).then(user => {
    res.render('edit.ejs', {user: user});
  });
});

//更新アクション
app.post('/update/:id', (req, res) => {
  db.user.findByPk(req.params.id).then(user => {
    user.id = req.params.id,
    user.firstName = req.body.firstName,
    user.lastName = req.body.lastName,
    user.email = req.body.email,
    user.createdAt = new Date(),
    user.updatedAt = new Date()
    user.save();
    res.render('/');
  });
});

//削除
app.post('/delete/:id', (req, res) => {
  db.user.findByPk(req.params.id).then(user => {
    user.destroy();
    res.render('/');
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
//setup-----------------------------------------
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//mysql--------------------------------------
const mysql = require('mysql');
var conn = mysql.createConnection({
  host : 'avatar.cxaktgbldso1.ap-northeast-2.rds.amazonaws.com',
  user : 'avatar',
  password : 'ghdwo966',
  database : 'avatar'
});
conn.connect(function(err){
  if (err) throw err;
  console.log('mysql successful!')
});

// var sql = 'insert into test values(201354243,"LEE YONGJAE")';
// conn.query(sql,function(err,rows,fields){
//   if(err)
//     console.log(err);
//   else{
//     console.log(rows.insertId);
//   }
// })

var sql = 'select * from test';
conn.query(sql, function(err, rows, fields){
  if (err) throw err;
  else{
    for(var i=0;i<rows.length;i++){
      console.log(rows[i].name + " : " + rows[i].pid);
    }
  }
})
/*
var sql = 'insert into student values(?,?,?)';
var params = [201224322,'PARK SENGHYUN',2];
conn.query(sql,params,function(err,rows,fields){
  if(err)
    console.log(err);
  else{
    console.log(rows);
    console.log(rows.insertId);
  }
})

var sql = 'update student set name=?, class=? where id=?';
var params = ['SUPERHONGJAE',99,201221027];
conn.query(sql,params,function(err,rows,fields){
  if(err)
    console.log(err);
  else{
    console.log(rows);
  }
})
*/
conn.end();
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

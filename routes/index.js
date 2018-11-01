var express = require('express');
var router = express.Router();
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

/* route. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//route--------------------------------------------------------

router.post('/signup',function(req,res){
  // var id = req.body.id;
  // var pass = req.body.pass;
})


insert_id('이홍재','01086175766','남','hongss94','dkqkxk');
insert_id('이현재','01086175764','남','hongss92','dkqkxk');

function insert_id(name,phone,sex,id,pass){
  let sql_1 = 'insert into person (name,phone,sex) values(?,?,?)';
  let sql_2 = 'insert into blind (user_id,user_pass,p_id) values(?,?,?)'
  conn.query(sql_1,[name,phone,sex],function(err,rows,table){
    if(err) console.log(err);
      else{
        console.log(rows);
        conn.query(sql_2,[id,pass,rows.insertId],function(err,rows,fields){
          if(err) console.log(err);
          else{
            console.log(rows);
          }
        })
      }
  })
}

module.exports = router;

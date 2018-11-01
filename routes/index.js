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
  console.log('mysql connect ok!')
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


//signup('이홍재','01086175766','남','hongss94','dkqkxk');
//signup('이현재','01086175764','남','hongss92','dkqkxk');
signin('hongss94','dkqkxk');
//회원가입 함수
function signup(name,phone,sex,id,pass){
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
//로그인 함수
function signin(id,pass){
  let sql = 'select * from blind where user_id = ?';
  conn.query(sql,id,function(err,rows,fields){
    if(err) throw err;
    else{
      let id_db = rows[0].user_id;
      let pass_db = rows[0].user_pass;
      //console.log(id_db, pass_db);
      if(id == id_db && pass == pass_db)
        console.log('login ok!');
      else
        console.log('login fail!');
    }
  })
}


// var sql = 'select * from student';
// conn.query(sql, function(err, rows, fields){
//   if (err) throw err;
//   else{
//     for(var i=0;i<rows.length;i++){
//       console.log(rows[i].name);
//     }
//   }
// })


module.exports = router;

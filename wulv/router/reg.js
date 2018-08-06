const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
    crypto = require('crypto');


router.get('/',(req,res)=>{
    res.render('reg.ejs');
});
router.post('/',(req,res)=>{
    const user = req.body.name;
    const pass = req.body.pass;
    const md5 = crypto.createHash('md5');
    sql('SELECT * FROM nodeuser where user = ?',[user],(err,data)=>{
        //console.log(data);
        if(data.length === 0){//没有查询到  可以注册
                        //加密密码          编码格式 hex
            let newpass = md5.update(pass).digest('hex');

            sql('INSERT INTO nodeuser (id,user,pass,admin) VALUES (0,?,?,false)',[user,newpass],(err,data)=>{
                if(err){
                    res.render('err.ejs');
                    return;
                }else{ //注册成功了
                    res.locals.result = '<h1>注册成功</h1>';
                    res.render('reg');
                }
            })
        }else{ //查询到了
            res.render('err.ejs');
        }
    })
});

module.exports = router;
const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
    crypto = require('crypto');

router.get('/',(req,res)=>{
   //得到cookie
   //console.log(req.cookies['login']);
   res.render('login');
});
router.post('/',(req,res)=>{
   const user = req.body['name'],
       pass = req.body['pass'],
       md5 = crypto.createHash('md5');
   sql('SELECT * FROM nodeuser where user = ?',[user],(err,data)=>{
       if(data.length){ //这里是匹配到了
          let newpass = md5.update(pass).digest('hex');
          if(data[0]['pass'] === newpass){//密码匹配成功了

               //登录成功 设置cookie
               //1.cookie的名称 2.数据   3.过期时间
               res.cookie('login',{name:user},{maxAge:1000*60*60*24});
               req.session.admin = Number(data[0]['admin']);
               if(req.session.admin){//如果是管理员
                   res.locals.admin = '管理员';
               }
               res.json({
                   result:'成功'
               })
           }else{//密码错误了
               res.send('密码错误')
           }
       }else{ // 这里是匹配不到 没有此用户名
         res.send('错误user');
      }
   });
});

module.exports = router;
const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql');

router.get('/',(req,res)=>{
    if(req.session.admin) {
        res.locals.admin = '管理员';
    }
    sql('SELECT * FROM article order by id desc limit 0,3',(err,data)=>{
        res.render('index',{data:data});
    });
});

router.get('/nav',(req,res)=>{
    //console.log(req.session.navdata);
    res.render('nav',{navdata:req.session.navdata});
});

    //?page=1
router.get('/article/list-:page.html',(req,res)=>{
    sql('select * from article order by id desc limit ?,2',[(req.params['page']-1)*2],(err,data)=>{
        if(data.length === 0){
            res.send(err);
            //res.render('articlelist',{data:data});      //文章列表
        }
        sql('SELECT * FROM article',(err,alldata)=>{
            res.render('articlelist',{articleListdata:data,alldata:alldata.length});
            console.log(alldata);
        })
    })
});


router.get('/article/:id.html',(req,res)=>{
    //console.log(req.params);
    sql('select * from article where id = ?',[req.params.id],(err,data)=>{
        if(data.length === 0){
            res.status(404).render('404');
        }else{
            sql('select * from articlepinglun where aid = ?',[req.params.id],(err,data1)=>{
                res.render('admin/article',{data:data,pinglun:data1});
            });
        }
    })
});

router.post('/article/:id.html',(req,res)=>{
    let content = req.body.content,
        aid = req.params.id,
        uid = req.session.userid;
    sql('INSERT INTO articlepinglun (id,uid,aid,content) VALUES (0,?,?,?)',[uid,aid,content],(err,data)=>{
            console.log(data);
            console.log(err);
        });
    res.send('成功');

});


router.get('/logout',(req,res)=>{
    res.clearCookie('login');   //清除req.ression.admin
    req.session.admin = 0;
    res.redirect('/'); //网址重定向
});

router.get('/search',(req,res)=>{
    console.log(req.query.search);
    sql(`select * from article where title like ?`,['%'+req.query.search+'%'],(err,data)=>{
        res.send(data);
    })
});

router.get('/ue',(req,res)=>{
   res.render('ue');
});

//注册
router.use('/reg',require('./reg'));
//登录
router.use('/login',require('./login'));
router.use('/admin',require('./admin'));

module.exports = router;













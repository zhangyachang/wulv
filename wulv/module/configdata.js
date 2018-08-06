const app = require('../app'),
    sql = require('./mysql'),
    navdata = require('./nav');



app.use(function (req,res,next) {
    if(req.cookies['login']){
        res.locals.login = req.cookies.login['name'];
        //已经登录了才去检验好吧
        sql('SELECT * FROM nodeuser where user = ?',[res.locals.login],(err,data)=>{
            //把用户的id保存下来以供其他人员使用
            req.session.userid = data[0]['id'];
            if(data[0]['admin'] === '1'){
                req.session.admin = '管理员';
                res.locals.admin = '管理员';
                next();
            }else{
                next();
            }
        })
    }else{
        next();
    }
});

app.use(function (req,res,next) {
    if(req.session.navdata === undefined){
        navdata(onedata=>{
            req.session.navdata = onedata;
            next();
        })
    }else{
        next();
    }
});

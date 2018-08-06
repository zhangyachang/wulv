const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
    upload = require('../module/multer'),
    fs = require('fs');


router.use((req,res,next)=>{
    if(req.session.admin){
        next();
    }else{
        res.send('请使用管理员账号登录');
    }
});

router.get('/',(req,res)=>{
    res.render('admin/admin');
});
router.get('/user',(req,res)=>{
    sql('SELECT * FROM nodeuser',(err,data)=>{
        res.render('admin/user',{data:data});
    })
});
router.post('/user',(req,res)=>{
    let id = req.body.id;
    sql('DELETE FROM nodeuser WHERE id = ?',[id],(err,data)=>{
        res.render('admin/user');
    });
});

router.get('/updateuser',(req,res)=>{
   let cont = req.query;
   if(cont.name){
       console.log("这是更新");
       sql('UPDATE `nodeuser` SET `user` = ?, `admin` = ? WHERE `nodeuser``id` = 17',[cont.name,cont.admin],(err,data)=>{
            if(data.protocol41){
                sql('SELECT * FROM nodeuser',(err,data)=>{
                    res.render('admin/updateuser',{data:data});
                })
            }
       })
   }else{
       console.log('这是查询');
       sql('SELECT * FROM nodeuser',(err,data)=>{
           res.render('admin/updateuser',{data:data});
           console.log(data);
       })
   }
});

router.get('/article',(req,res)=>{
    res.render('admin/fabu');
});
router.post('/article',upload.fields([{ name: 'wulv1', maxCount: 4 }, { name: 'wulv2', maxCount: 8 }]),(req,res)=>{
    //console.log(req.upload);
});

/*router.post('/article',(req,res)=>{
    console.log(req.body);
    let title = req.body.title,
        tag = req.body.tag,
        author = req.body.author,
        content = req.body.content,
        img = '/img/' + req.file.filename,
        //后台来发布时间，害怕前台的时间不正确
        time = new Date().toLocaleString().substring(0,10);
    sql('INSERT INTO article (id,title,tag,author,content,time) VALUES (0,?,?,?,?,?)',[title,tag,author,content,time],(err,data)=>{
        if(err){
            res.send('保存失败');
            return ;
        }else{
            res.json({
                result : '保存成功'
            })
        }
    })

});*/

router.get('/views',(req,res)=>{
    let dir = fs.readdirSync(`${process.cwd()}/views`);
    //console.log(dir);
    res.render('views',{dir:dir});
});
router.post('/views',(req,res)=>{
   console.log(req.body);
   let dirtype = req.body.dirtype,
       dirname = req.body.dirname,
       content = req.body.content;
   if(dirtype === '1'){
       //console.log(dirname);
       fs.readFile(`${process.cwd()}/views/${dirname}`,'utf-8',(err,data)=>{
           console.log('返回数据');
           console.log('data');
           res.json({
               dirname : dirname,
               content : data
           })
       });
       return ;
   }
   if(dirtype === '2'){
       fs.readdir(`${process.cwd()}/views/${dirname}`,(err,data)=>{
           res.json({
               dirtype : 2,
               dirname : dirname,
               content : data
           })
       });
       return ;
   }

   if(dirtype === '3'){
       fs.writeFile(`${process.cwd()}/views/${dirname}`,content,(err,data)=>{
           res.json({
               result : '成功'
           })
       })
   }
   //再把所有的一起读取出来 返回给前台

   /* let dir = fs.readdirSync(`${process.cwd()}/views`);
   for(let i in dir){
       dir[i].inludes('.')
   }
*/

});

module.exports = router;




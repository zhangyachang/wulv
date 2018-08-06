const http = require('http'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    ws = require('socket.io');

module.exports = app;

app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser('adkfjsdkffg'));//密钥

app.use(session({
    resave:false,       //添加 resave 选项
    saveUninitialized:true,////添加 saveUninitialized 选项
    secret:'node',   //密钥
}));

require('./module/configdata');

app.use('/',require('./router/index'));

let server = http.createServer(app).listen(233);

//用ws监控这个东西
let io = ws(server);


let userList = {},
    usernum = 0;
//回调里的 socket 每个用户都是独立的
io.on('connection',socket=>{
    //console.log(socket);

    socket.on('jrlt',data=>{
        //加入房间的方法
        socket.join('lt');
        io.sockets.in('lt').emit('hello','欢迎加入聊天房间');
    });
    socket.on('tclt',data=>{
        socket.leave('lt');
        io.sockets.in('lt').emit('hello','您已离开聊天房间');
    });

    //接受前端发送过来的聊天内容
    socket.on('login',(data)=>{
        //console.log(data);
        //把内容广播出去
        userList[data.userid] = data.name;
        socket.name = data.name;
        socket.userid = data.userid;
        usernum++;
        data.num = usernum;
        //console.log(data);
        io.emit('login',{data:data,userList:userList});
    });

    socket.on('msg',(data)=>{
        console.log(data);
        io.emit('liaotian',data);
    });

    socket.on('disconnect',()=>{
        delete userList[socket.userid];
        console.log(socket.userid);
        usernum--;

        io.emit('out',{name:socket.name, num:usernum,userList:userList});
    })

});














const http = require('http'),
    https = require('https');
   /* option = {
        hostname : 'nodejs.cn',
        path:'/api/',
        port:'80'  //端口

    };*/

const fs = require('fs');
//向外发起http get请求
https.get('https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=8d59070cb73eb13544c7b0bd9e25cfee/58ee3d6d55fbb2fb4e4573f6444a20a44723dce3.jpg',function (res) {
    //回调里面有几个东西
    res.setEncoding('binary');
    let img = '';
    //监听 当请求有数据的时候触发
    res.on('data',function (data) {
        img += data;
    });
    //当请求完成的时候触发
    res.on('end',function () {
        fs.writeFile('./2.png',img,'binary');
    })

});













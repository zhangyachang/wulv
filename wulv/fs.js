const fs = require('fs');

/*fs.open('./1.txt','wx',(err,data)=>{
   console.log(err);
   console.log(data);
});*/


/*fs.mkdir('./wulv',(err,data)=>{
   console.log(data);
});*/

/*
fs.rmdir('./wulv',(err,data)=>{
   console.log(err);
   console.log(data);
});*/

/*fs.rmdir('./css',(err,data)=>{
   console.log(err);
   console.log(data);
});*/

/*fs.stat('./public',(err,data)=>{
   console.log(err);
   console.log(data);
});*/


/*fs.access('./app.js',fs.constants.R_OK | fs.constants.W_OK,(err,data)=>{
    console.log(err);
    console.log(data);
});*/


/*fs.appendFile('./1.txt','wowowow',(err,data)=>{
   console.log(err);
    console.log(data);
});*/

/*fs.writeFile('./1.txt','这个方法是替换',(err,data)=>{
    console.log(err);
    console.log(data);
});*/

/*fs.readFile('./app.js',(err,data)=>{
    console.log(err);
    console.log(data);
    fs.appendFile('./1.txt',data,(err,data)=>{
       console.log(err);
        console.log(data);
    })
});*/

/*fs.readFile('./app.js','utf-8',(err,data)=>{
    console.log(err);
    console.log(data);
});*/

/*fs.readdir('./views',(err,data)=>{
    console.log(err);
    console.log(data);
});*/

/*fs.rename('./1.txt','wwww1',(err,data)=>{
    console.log(err);
    console.log(data);
});*/

let a = fs.readdirSync('./views/admin');
console.log('aaa');
console.log(a);


















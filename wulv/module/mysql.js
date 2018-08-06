const mysql = require('mysql');

module.exports = function (sql,value,callback) {
    let config = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        port:"3306",
        database:"node",
    });
    config.connect(); //开始连接
    config.query(sql,value,(err,data)=>{
        callback && callback(err,data);
    });
    config.end();
};
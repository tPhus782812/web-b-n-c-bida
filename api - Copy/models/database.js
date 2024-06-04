var mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'api',
    multipleStatements: true
});
db.connect(function(err){
    if(err) { console.log('loi ket noi',err); db.end();}
    else console.log('Đã kết nói với database thành công !!');
});
module.exports = db;
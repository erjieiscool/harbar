//连接mysql数据库
const mysql=require("mysql");
var pool=mysql.createPool({
	host:'127.0.0.1',
	port:3306,
	user:'root',
	password:'',
	database:'hd',
	connectionLimit:20
});
console.log('连接池创建成功');
//导出连接
module.exports=pool;























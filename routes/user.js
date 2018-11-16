const express=require('express');
//引入mysql连接池
const pool=require('../pool.js');
//创建路由器
var router=express.Router();
//在路由器下添加路由--登录功能
router.post("/login",(req,res)=>{
	var uname=req.body.uname;
	var upwd=req.body.upwd;
	console.log(uname,upwd)
	var sql="select * from hd_user where uname=? and upwd=?";
	pool.query(sql,[uname,upwd],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.length>0){
			res.writeHead(200);
			var user=result[0];
			req.session["user_id"]=user["user_id"];			
			res.write(JSON.stringify({
				ok:1
			}))
		}else{
			res.write(JSON.stringify({
				ok:-1,
				msg:"用户名或密码错误！"
			}))
		}
		res.end();
	})
})
//验证用户是否登录
router.get("/islogin",(req,res)=>{
	res.writeHead(200);
	if(req.session["user_id"]===undefined){
		res.write(JSON.stringify({ok:-1}))
		res.end()
	}else{
		var user_id=req.session.user_id;
		var sql=`select * from hd_user where user_id=?`;
		pool.query(sql,[user_id],(err,result)=>{
			if(err) console.log(err);
			var user=result[0];
			res.write(JSON.stringify({ok:1,uname:user.uname}))
			res.end();
		})		
	}	
})
//注销
router.get("/signout",(req,res)=>{
	req.session["user_id"]=undefined;
	res.end();
})
//检查用户名是否已存在
router.post("/selectUname",(req,res)=>{
	var $uname=req.body.uname;
	if(!$uname){
		res.send("-1");
		return;
	}
	var sql=`select * from hd_user where uname=?`;
	pool.query(sql,[$uname],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("1");
		}else{
			res.send("0");
		}
	})
})
//注册功能
router.post("/register",(req,res)=>{
	var obj=req.body;
	var $uname=obj.uname;
	var $upwd=obj.upwd;
	if(!$upwd){
		console.log("密码空")
		res.send("用户密码不能为空");
		return;
	}
	console.log($uname,$upwd)
	var $pwd=obj.pwd;
	var sql=`insert into hd_user values(NULL,?,?,NULL,NULL,NULL)`;
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		res.send("注册成功");
	})
})





module.exports=router;


















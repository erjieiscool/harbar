const express=require("express");
const router=express.Router();
const pool=require('../pool');

router.get("/add",(req,res)=>{
    var product_id=req.query.product_id;
    var count=req.query.count;
    var user_id=req.session.user_id;
    //验证user_id是否添加过product_id,当前user_id为已登录的用户
    var sql1=`select * from hd_shopping_cart where user_id=? and product_id=?`;
    pool.query(sql1,[user_id,product_id],(err,result)=>{
        if(err) console.log(err);
        if(result.length==0){
            var sql=`insert into hd_shopping_cart values(null,?,?,?,0)`;
            pool.query(sql,[user_id,product_id,count],(err,result)=>{
            if(err) console.log(err);
            res.end();
            })
        }else{
            var sql2=`update hd_shopping_cart set count=count+? where user_id=? and product_id=?`;
            pool.query(sql2,[count,user_id,product_id],(err,result)=>{
                if(err) console.log(err);
                res.end();
            })
        }
    })
    
})









module.exports=router;
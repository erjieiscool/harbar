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
//查找我的购物车
router.get("/items",(req,res)=>{
    var user_id=req.session.user_id;
    var sql=`SELECT *,(select md from hd_product_pic where hd_product_pic.product_id=hd_shopping_cart.product_id limit 1)as md FROM hd_shopping_cart inner join hd_laptop on hd_laptop.product_id=hd_shopping_cart.product_id where user_id=?`;
    pool.query(sql,[user_id],(err,result)=>{
        if(err) console.log(err);
        res.writeHead(200);
        res.write(JSON.stringify(result));
        res.end();
    })
})
//修改购物车数据
router.get("/update",(req,res)=>{
    var tid=req.query.tid;
    var count=req.query.count;
    if(count>0){
        var sql=`update hd_shopping_cart set count=? where tid=?`;
        var data=[count,tid];
    }else{
        var sql=`delete from hd_shopping_cart where tid=?`;
        var data=[tid];
    }
    pool.query(sql,data,(err,result)=>{
        if(err) console.log(err);
        res.end();
    })
})







module.exports=router;
const express=require("express");
const router=express.Router();
const pool=require("../pool");
router.get("/",(req,res)=>{
    var product_id=req.query.product_id;
    var obj={details:[],image:[]};
    var sql1=`select * from hd_laptop where product_id=?`;
    var sql2=`select * from hd_product_pic where product_id=?`;
    Promise.all([
        new Promise(function(open){
          pool.query(sql1,[product_id],(err,result)=>{
            if(err) console.log(err);
             obj.details=result;
             console.log(obj.details);             
            open();
          })
        }),
        new Promise(function(open){
          pool.query(sql2,[product_id],(err,result)=>{
            if(err) console.log(err);
            //console.log(result);
            obj.image=result;
            console.log(obj.image);
            open()
          })
        })
      ]).then(function(){
        res.writeHead(200,{
          "Content-Type":"application/json;charset=utf-8",
          "Access-Control-Allow-Origin":"*"
        })
        res.write(JSON.stringify(obj));
        res.end();
        console.log("响应完成!");
      })
})

module.exports=router;
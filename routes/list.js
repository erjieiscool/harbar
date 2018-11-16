const express=require("express");
const router=express.Router();
const pool=require("../pool");
router.get("/",(req,res)=>{
    var product_id=req.query.product_id;
    var sql1=`select * from hd_products`;
    pool.query(sql1,[],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})




module.exports=router;
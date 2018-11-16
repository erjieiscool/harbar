const express=require('express');
const http=require("http");
const bodyParser=require('body-parser');
const session=require("express-session");
const user=require('./routes/user.js');
const product=require('./routes/product.js');
const index=require('./routes/index');
const cart=require("./routes/cart");
const list=require("./routes/list");

const product_details=require("./routes/product_details");

//构建web服务器
var app=express();
app.listen(9000);
console.log("服务器创建成功");
//托管静态资源
app.use(express.static('./public'));
app.use(session({
	secret:'128位随机字符串',
	resave:false,
	saveUninitialized:true,
}))
//使用bodyparser中间件
app.use(bodyParser.urlencoded({
	extended:false
}));
//使用路由器
//把路由器挂载到/user下
app.use('/user',user);
/*app.use('/product',product);*/
app.use("/index",index);

app.use("/product_details",product_details);
app.use("/cart",cart);
app.use("/list",list);










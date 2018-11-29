#设置编码方式为utf-8，删除数据库hd，如果存在，创建数据库，进入数据库
SET NAMES UTF8;
DROP DATABASE IF EXISTS hd;
CREATE DATABASE hd CHARSET=UTF8;
USE hd;

#创建用户信息表--hd_user;
CREATE TABLE hd_user(
    user_id INT PRIMARY KEY AUTO_INCREMENT,  #用户编码
    uname VARCHAR(32),                          #用户姓名
    upwd VARCHAR(32),                           #用户密码
    email VARCHAR(64),                          #用户邮箱
    phone VARCHAR(16),         #联系方式
    user_name VARCHAR(32)                       #真实姓名
);
#用户表
INSERT INTO hd_user VALUES
(1,'dalin','123456','dalin@qq.com',15685469685,'林子'),
(NULL,'doudou','123456','doudou@qq.com',13965423654,'豆豆'),
(NULL,'meimei','123456','meimei@qq.com',18854632568,'梅梅'),
(NULL,'feifei','123456','feifei@qq.com',13311526847,'飞飞');

#创建商品类别表：hd_laptop_family
CREATE TABLE hd_laptop_family(
    fid INT PRIMARY KEY AUTO_INCREMENT,     #商品类别编码
    fname VARCHAR(32)                        #商品类别名称
);
/*-------商品类别表--------*/
INSERT INTO hd_laptop_family VALUES(1,'家具'),(NULL,'灯具墙饰'),(NULL,'窗帘地毯'),(NULL,'家纺'),(NULL,'装饰品'),(NULL,'餐厨用品'),(NULL,'儿童');

#创建商品类别明细表：hd_family_child
CREATE TABLE hd_family_child(
    cid  INT PRIMARY KEY AUTO_INCREMENT,          #商品小编码
    cname  VARCHAR(32),                            #商品小名称
    fid  VARCHAR(32)                               #商品类别编码
);
INSERT INTO hd_family_child VALUES(1,'餐厅家具',1),(2,'客厅家具',1),(3,'沙发',1),(4,'卧室家具',1);

#创建商品类别之最终的表
CREATE TABLE hd_family_children(
    zid INT PRIMARY KEY AUTO_INCREMENT,            #类别码：家具——>餐厅家具——>餐桌
    cid  INT,                                        #商品小编码：家具——>餐厅家具
    fid  VARCHAR(32),                                #商品类别编码:家具
    zname  VARCHAR(32)                               #类别名称
);
INSERT INTO hd_family_children VALUES(1,1,1,'餐桌'),(2,1,1,'餐椅'),(3,1,1,'餐边柜酒柜'),(4,1,1,'吧台/吧椅');

#创建商品详情表：hd_laptop
CREATE TABLE hd_laptop(
    product_id INT ,                                #商品编码/商品货号
    zid INT,                                        #类别码00*
    cid  INT,                                       #商品小编码
    fid  INT,                                       #商品类别编码
    title VARCHAR(128),                            #标题
    price DECIMAL(10,2),                           #价格
    promise VARCHAR(64),                           #服务承诺
    spec VARCHAR(64),                              #规格
    series VARCHAR(64),                            #商品系列
    material VARCHAR(64),                          #材质
    lname VARCHAR(64),                             #商品名称
    style  VARCHAR(64),                            #风格
    details varchar(1024),                          #产品详细说明
    detailsTwo varchar(1024)                       #产品说明2
);
#商品表
INSERT INTO hd_laptop VALUES
(1,001,01,1,'Farmhouse餐桌',7980,'该产品享受Harbar House门店所在城市免费安装服务','直径132X高76CM','Farmhouse','俄罗斯榆木/榆木单板/环保人造板','Farmhouse 餐桌','自然乡村','选用国产榆木，榆木单板，及环保人造板，纹理清晰，材质细腻，耐腐蚀，耐刮擦，适合雕琢，绿色环保。','餐桌造型圆润、弧线柔雅；蜿蜒铺展的榆木纹理掩映于水洗棕色调中，带来丰富层次感，也令餐桌倍显质朴的自然气息，营造轻松惬意的用餐氛围。'),
(2,001,01,1,'Asheville 可拉伸餐桌',10800,'该产品享受Harbor House门店所在城市免费安装服务。','长168/120X宽120X高76.5CM','Asheville','美国红橡木/红橡木单板/环保人造板','Asheville 可拉伸餐桌','自然乡村,传统经典','Asheville系列选用优质木材，用料厚实；精湛的涂漆工艺，保留了木材原有的纹理，柔和的色调配以传统的做旧效果，典雅质朴；表面多处采用装饰性线条，彰显家具大气时尚质感，是美式家居的经典之作。该系列家具包括床、床头柜、斗柜，梳妆台、边桌、边几、餐桌、电视柜、餐边柜、可拉伸餐桌等，可以根据实际需求搭配选购。现有两种颜色可选择，浓蜂蜜色和核桃色。','选用美国红橡木，红橡木单板，及环保人造板为主材，取自美国原始森林，具有鲜明的山形木纹，纹理美观大方，质地坚硬、密度高，经久耐用。餐桌台面及桌脚边线均采用装饰性线条及阴影效果处理，桌腿圆柱型及圆形弧线错落搭配，层次感丰富、细节精致。添加中间跳板，可拉伸到168厘米，可坐4-6人，令餐桌自由适应不同空间，满足多样使用需求。'),
(3,001,01,1,'Pierson 餐桌',4980,'该产品享受Harbor House门店所在城市免费安装服务。','长140X宽80X高76CM','Pierson','河南白杨木/桦木单板/环保人造板','Pierson 餐桌','自然乡村,传统经典','Pierson系列适合搭配90平上下的小户型房屋，卧房适合15-20平，客厅适合15-25平，餐厅适合6-10平。该套系家具均选用白杨木实木和环保人造板为主材，采用覆盖色油漆不凸显木纹的做法，来着重体现家具的轮廓，并且着重在轮廓上采用轻微的灰色阴影擦边处理，凸显油漆的质感。该系列在同一款式上提供灰白两种颜色，为小户型增添更多色彩，给予不同空间感受，同时灰白也能和谐搭配。','选用国产白杨木，木性坚韧，密度适中；面板部分采用E1级环保人造板，材质细腻柔和有光泽。
Pierson 餐桌设计简约大方，桌面轮廓的阴影擦边处理，呈现微旧的质感，凸显美式做旧效果；圆润的桌角设计防止磕碰，安全性高；纤细的桌腿采用了正统的车旋腿造型，精致细腻，婉约中带着复古气息，整体也更秀气。');


#创建首页轮播图表：hd_index_carousel
CREATE TABLE hd_index_carousel(
    Lid INT PRIMARY KEY AUTO_INCREMENT,           #图片编码
    img VARCHAR(128),                              #图片
    title VARCHAR(64)                              #标题
);
#轮播图表
INSERT INTO hd_index_carousel VALUES
(1,'img/index/banner.jpg',NULL),(2,'img/index/HHbanner.jpg',NULL),(3,'img/index/banner01.jpg',NULL),(4,'img/index/banner-2.jpg',NULL);

#创建首页商品图表：hd_index_product
CREATE TABLE hd_index_product(
    mid INT PRIMARY KEY AUTO_INCREMENT,            #编号
    img VARCHAR(128),                               #图片
    title VARCHAR(64),                              #标题
    href VARCHAR(128)
);
INSERT INTO hd_index_product VALUES
(1,'img/index/index2.jpg',NULL,NULL),
(NULL,'img/index/Notice.jpg',NULL,NULL),
(NULL,'img/index/index02.jpg',NULL,NULL),
(NULL,'img/index/index03.jpg',NULL,NULL),
(NULL,'img/index/slick-1.jpg',"花与花瓶",NULL),
(NULL,'img/index/slick-2.jpg',"收纳容器",NULL),
(NULL,'img/index/slick-3.jpg',"蜡烛烛台",NULL),
(NULL,'img/index/slick-4.jpg',"装饰摆件",NULL),
(NULL,'img/index/index04.jpg',NULL,NULL),
(NULL,'img/index/index08.jpg',NULL,NULL),
(NULL,'img/index/index05.jpg',NULL,NULL),
(NULL,'img/index/index06.jpg',NULL,NULL),
(NULL,'img/index/index07.jpg',NULL,NULL),
(NULL,'img/index/home.jpg',NULL,NULL),
(NULL,'img/index/index08.jpg',NULL,NULL),
(NULL,'img/index/slick-5.jpg',"锅具系列",NULL),
(NULL,'img/index/slick-6.jpg',"烘焙磨具",NULL),
(NULL,'img/index/slick-7.jpg',"彩盘餐具",NULL),
(NULL,'img/index/slick-8.jpg',"餐厅用品",NULL),
(NULL,'img/index/index09.jpg',NULL,NULL),
(NULL,'img/index/index10.jpg',NULL,NULL),
(NULL,'img/index/index11.jpg',NULL,NULL),
(NULL,'img/index/index12.jpg',NULL,NULL);

#创建商品图片表：hd_product_pic
CREATE TABLE hd_product_pic(
    pid INT PRIMARY KEY AUTO_INCREMENT,       #图片编号
    product_id INT,                          #所属商品编码
    zid INT,                                   #类别码
    sm  VARCHAR(128),                          #小图
    md  VARCHAR(128),                          #中图
    lg VARCHAR(128),                            #大图
    big VARCHAR(128)                            #放大镜图
);
INSERT INTO hd_product_pic VALUES
(1,1,1,'img/product_details/sm/113623.jpg','img/product_details/md/113623-1.jpg','img/product_details/lg/113623-1.jpg','img/product_details/big/113623-1.jpg'),
(2,1,1,'img/product_details/sm/113623.jpg','img/product_details/md/113623-2.jpg','img/product_details/lg/113623-2.jpg','img/product_details/big/113623-2.jpg'),
(3,1,1,'img/product_details/sm/113623.jpg','img/product_details/md/113623-3.jpg','img/product_details/lg/113623-3.jpg','img/product_details/big/113623-3.jpg'),
(4,1,1,'img/product_details/sm/113623.jpg','img/product_details/md/113623-4.jpg','img/product_details/lg/113623-4.jpg','img/product_details/big/113623-4.jpg'),
(NULL,2,1,'img/product_details/sm/2-113625.jpg','img/product_details/md/113625-1.jpg','img/product_details/lg/113625-1.jpg','img/product_details/big/113625-1.jpg'),
(NULL,2,1,'img/product_details/sm/2-113625.jpg','img/product_details/md/113625-2.jpg','img/product_details/lg/113625-2.jpg','img/product_details/big/113625-2.jpg'),
(NULL,2,1,'img/product_details/sm/2-113625.jpg','img/product_details/md/113625-3.jpg','img/product_details/lg/113625-3.jpg','img/product_details/big/113625-3.jpg'),
(NULL,2,1,'img/product_details/sm/2-113625.jpg','img/product_details/md/113625-4.jpg','img/product_details/lg/113625-4.jpg','img/product_details/big/113625-4.jpg'),
(NULL,3,1,'img/product_details/sm/2-113625.jpg','img/product_details/md/110908-1.jpg','img/product_details/lg/110908-1.jpg','img/product_details/big/110908-1.jpg'),
(NULL,3,1,'img/product_details/sm/2-113625.jpg','img/product_details/md/110908-2.jpg','img/product_details/lg/110908-2.jpg','img/product_details/big/110908-2.jpg'),
(NULL,3,1,'img/product_details/sm/2-113625.jpg','img/product_details/md/110908-3.jpg','img/product_details/lg/110908-3.jpg','img/product_details/big/110908-3.jpg'),
(NULL,3,1,'img/product_details/sm/2-113625.jpg','img/product_details/md/110908-4.jpg','img/product_details/lg/110908-4.jpg','img/product_details/big/110908-4.jpg');

#创建用户订单表：hd_order
CREATE TABLE hd_order(
    did INT PRIMARY KEY AUTO_INCREMENT,         #订单编号
    order_id INT,                                #订单编号
    product_id INT,                              #产品编号
    count INT                                   #购买数量
);

#创建用户购物车表：hd_shopping_cart
CREATE TABLE hd_shopping_cart(
tid INT PRIMARY KEY AUTO_INCREMENT,         #编码
user_id INT,                                 #用户编码
product_id INT,                              #商品编码
count INT,                                   #数量
is_checked bool                               #是否勾选
);
INSERT INTO hd_shopping_cart VALUES
(1,1,3,2,NULL),
(NULL,4,1,1,NULL),
(NULL,2,2,1,NULL),
(NULL,3,3,2,NULL);


#创建商品页表：hd_products
CREATE TABLE hd_products(
    sid INT PRIMARY KEY AUTO_INCREMENT,            #列表编码
    product_id INT,                                #商品编码/商品货号
    cid INT,                                        #编码
    img  VARCHAR(128),                              #图片
    sm  VARCHAR(128),                               #小图
    image VARCHAR(128),                             #鼠标移入图片
    title VARCHAR(128),                             #标题
    price VARCHAR(32),                              #价格
    href VARCHAR(128)                               #跳转路径
);
INSERT INTO hd_products VALUES
(1,1,1,'img/products/113623-0.jpg','img/products/113623.jpg','img/products/image/113623-1.jpg','Farmhouse 餐桌','7980','product_details.html?product_id=1'),
(NULL,2,1,'img/products/113625(1).jpg','img/products/113623.jpg','img/products/image/113625-1.jpg','Farmhouse 餐桌','10800','product_details.html?product_id=2'),
(NULL,3,1,'img/products/110908(1).jpg','img/products/113623.jpg','img/products/image/110908-1.jpg','Farmhouse 餐桌','8980','product_details.html?product_id=3'),
(NULL,4,1,'img/products/113154.jpg','img/products/113623.jpg','img/products/image/113623-1.jpg','Farmhouse 餐桌','9980','product_details.html?product_id=4'),
(NULL,5,1,'img/products/113158.jpg','img/products/113623.jpg','img/products/image/113154-1.jpg','Farmhouse 餐桌','7980','product_details.html?product_id=5'),
(NULL,6,1,'img/products/112594.jpg','img/products/113623.jpg','img/products/image/112594-1.jpg','Farmhouse 餐桌','4980','product_details.html?product_id=6'),
(NULL,7,1,'img/products/111904.jpg','img/products/113623.jpg','img/products/image/111904-1.jpg','Worcester 餐桌','5980','product_details.html?product_id=7'),
(NULL,8,1,'img/products/111429.jpg','img/products/113623.jpg','img/products/image/111429-1.jpg','Farmhouse 餐桌','3486','product_details.html?product_id=8'),
(NULL,9,1,'img/products/111047.jpg','img/products/113623.jpg','img/products/image/111047-1.jpg','Pierson 餐桌','14210','product_details.html?product_id=9'),
(NULL,10,1,'img/products/105913.jpg','img/products/113623.jpg','img/products/image/105913-1.jpg','Manor 可拉伸餐桌','7184','product_details.html?product_id=10'),
(NULL,11,1,'img/products/105494.jpg','img/products/113623.jpg','img/products/image/105494-1.jpg','Evansville 餐桌','7980','product_details.html?product_id=11'),
(NULL,12,1,'img/products/105252.jpg','img/products/113623.jpg','img/products/image/105252-1.jpg','Eaton 餐桌','3486','product_details.html?product_id=12'),
(NULL,13,1,'img/products/104974.jpg','img/products/113623.jpg','img/products/image/104974-1.jpg','Pierson 餐桌','7980','product_details.html?product_id=13'),
(NULL,14,1,'img/products/104972.jpg','img/products/113623.jpg','img/products/image/104972-1.jpg','Asheville 可拉伸餐桌','10800','product_details.html?product_id=14'),
(NULL,15,1,'img/products/104360.jpg','img/products/113623.jpg','img/products/image/104360-1.jpg','Parkview 餐桌','5980','product_details.html?product_id=15'),
(NULL,16,1,'img/products/103364.jpg','img/products/113623.jpg','img/products/image/103364-1.jpg','Meadow Wood 可拉伸圆形餐桌','8980','product_details.html?product_id=16'),
(NULL,17,1,'img/products/102948.jpg','img/products/113623.jpg','img/products/image/102948-1.jpg','Devin 餐桌','7980','product_details.html?product_id=17'),
(NULL,18,1,'img/products/104974.jpg','img/products/113623.jpg','img/products/image/102852-1.jpg','Beldin 餐桌','15800','product_details.html?product_id=18'),
(NULL,19,1,'img/products/101110.jpg','img/products/113623.jpg','img/products/image/101110-1.jpg','Harbor 餐桌','7980','product_details.html?product_id=19'),
(NULL,20,1,'img/products/113623-0.jpg','img/products/113623.jpg','img/products/image/113623-1.jpg','Harbor 餐桌','8980','product_details.html?product_id=20'),
(NULL,21,1,'img/products/113623-0.jpg','img/products/113623.jpg','img/products/image/113623-1.jpg','Lauren 餐桌','25800','product_details.html?product_id=21'),
(NULL,22,1,'img/products/113623-0.jpg','img/products/113623.jpg','img/products/image/113623-1.jpg','Harbor 可拉伸餐桌','9980','product_details.html?product_id=22'),
(NULL,23,1,'img/products/113623-0.jpg','img/products/113623.jpg','img/products/image/113623-1.jpg','Parker 可拉伸圆形餐桌','8980','product_details.html?product_id=23');















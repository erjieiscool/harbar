$(function(){
    var product_id=location.search.split("=")[1];
    //console.log(product_id);
    $.ajax({
        url:"http://localhost:9000/product_details/",
        type:"get",
        data:{product_id},
        dataType:"json",//ajax可自动将json转为obj
        success: function(res){
            var {details,image}=res;
            //1.中图片        
            var html="";
            for(var i=0;i<image.length;i++){
                //console.log(image[i]);
                html+=`<img src='${image[i].md}' data-lg='${image[i].lg}' data-big='${image[i].big}'>`;
            }
            var parent=document.querySelector(".md");
            parent.innerHTML=html;
            //左边大图片
            var lgImg=document.querySelector("div.details>div.productImg>img");
            lgImg.src=image[0].lg;
            //放大镜图片
            var bigImg=document.querySelector("div.details>div.div_big");
            bigImg.style.background=`url(${image[0].big})`;
            //----鼠标点击小图片，切换大图片和放大镜图片
            var $div=document.querySelector("div.md");
            $div.onclick=function(e){
                if(e.target.nodeName==="IMG"){
                    var img=e.target;
                    var lg=img.dataset.lg;
                    var big=img.dataset.big;
                    lgImg.src=lg;
                    bigImg.style.background=`url(${big})`;
                }
            }
            var $div=$(".md");
            $div.on("click","img",function(){
                var $img=$(this);
                $img.addClass("md_active").siblings().removeClass("md_active")
            })
            //2.右侧商品详情
            var {title,product_id,price,promise}=details[0];
            var html=`<p class="productName">${title}</p>
            <p class="count"><span>编号：</span><span  class="num">${product_id}</span><span>销量：11</span></p>
            <p class="productPrice">¥${price}</p>
        <p class="service">${promise}<a href="#">[点击了解详情]</a></p>`;
            var parent=document.querySelector(".details_base>div>div:first-child");
            parent.innerHTML=html;
            //3.商品规格列表
            var {material,spec}=details[0];
            var sm=image[0].sm;
            var html=`<li class="count">材质<span class="cate">${material}</span></li>
            <li class="count">颜色<img src="${sm}" alt="" class="sm"></li>
            <li class="count">规格<span class="cate">${spec}</span></li>
            `;
            var parent=document.querySelector(".product_key");
            parent.innerHTML=html;
            //加入购物车内容生成
            var html=`<button class="btn_gray" data-id="${product_id}">加入购物车</button>`;
            var parent=document.querySelector(".divCart");
            parent.innerHTML=html;
            //4.二楼商品详情
            var {series,style}=details[0];
            var html=`<tr>
            <th class="td1">商品系列</th>
            <td>${series}</td>
            <th>商品名称</th>
            <td>${title}</td>
            <th>商品货号</th>
            <td>${product_id}</td>
        </tr>
        <tr>
            <th class="td1">材质</th>
            <td class="material">${material}</td>
            <th>规格</th>
            <td>${spec}</td>
            <th>风格</th>
            <td>${style}</td>
        </tr> `;
            var parent=document.querySelector(".details_table");
            parent.innerHTML=html;
            //产品内容介绍
            var {details,detailsTwo}=details[0];
            var html=`<p>${details}</p>
            <p>${detailsTwo}</p>`;
            var parent=document.querySelector(".descript");
            parent.innerHTML=html;

            //放大镜效果
            var $lgImg=$(lgImg),$bigImg=$(bigImg),$mask=$("div.mask"),$smask=$("div.super_mask");
            var MSIZE=309,//透明板
                MAX=620-MSIZE;//
            $smask.hover(
                function(){
                $mask.removeClass("d_none");
                $bigImg.removeClass("d_none");
                },
                function(){
                    $mask.addClass("d_none");
                    $bigImg.addClass("d_none");
                }
            )
            .mousemove(function(e){
                var left=e.offsetX-MSIZE/2;
                var top=e.offsetY-MSIZE/2;
                if(left<0){
                    left=0;
                }else if(left>MAX){
                    left=MAX;
                }
                if(top<0){
                    top=0;
                }else if(top>MAX){
                    top=MAX;
                }
                $mask.css({left,top});
                $bigImg.css("background-position",`-${40/19*left}px -${40/19*top}px`)
            })
        }
    })
    //button加减效果
    $btnAdd=$("li.count>div.qty");
    $btnAdd.on("click","button",function(){
        var $btn=$(this),
        $input=$btn.siblings("input");
        var n=parseInt($input.val());
        if($btn[0].className=="plus"){
            n++;
        }else{
            if(n>1) n--;
        }
        $input.val(n);
    })
    //加入购物车
    $addCart=$(".btn_gray").parent();
    $addCart.on("click",function(e){
        (async function(){
            var res=await $.ajax({
                url:"http://localhost:9000/user/islogin",
                type:"get",
                dataType:"JSON"
            });
            if(res.ok==1){
                e.preventDefault();        
                var $btn=$(this);
                var product_id=$btn.children().attr("data-id");
                var count=$(".qty").children().first().val();
                console.log(count,product_id);
                await $.ajax({
                    url:"http://localhost:9000/cart/add",
                    type:"get",
                    data:{product_id,count}
                })
                $(".qty").children().first().val(1);
                alert("添加成功！");
            }else{
                alert("请先登录！");
            }
        })()
    })
})
//商品详情/售后保养
$(function(){
    $(".shopp").on("click",function(){
        $(".div_block").css("display","block");
        $(".shopp").addClass("active");
        $(".maintain").css("display","none");
        $(".baoyang").removeClass("active");
    })
    $(".baoyang").on("click",function(){
        $(".maintain").css("display","block");
        $(".baoyang").addClass("active");
        $(".div_block").css("display","none");
        $(".shopp").removeClass("active");
    })
    //类似推荐
    $("#recommend1").on("click",function(){
        $("#recommend1").addClass("active").siblings().removeClass("active");
        $("#div_a").css("display","block").siblings().css("display","none");
    })
    $("#recommend2").on("click",function(){
        $("#recommend2").addClass("active").siblings().removeClass("active");
        $("#div_b").css("display","block").siblings().css("display","none");
    })
    $("#recommend3").on("click",function(){
        $("#recommend3").addClass("active").siblings().removeClass("active");
        $("#div_c").css("display","block").siblings().css("display","none");
    })
    //人人，微博
    $(".sina").mouseover(function(){
        $(".sina").css("background","url('../img/bg.png') no-repeat -361px -40px");
    })
    .mouseout(function(){
        $(".sina").css("background","url('../img/bg.png') no-repeat -361px 0px");
    })
    $(".tenxun").mouseover(function(){
        $(".tenxun").css("background","url('../img/bg.png') no-repeat -400px -40px");
    })
    .mouseout(function(){
        $(".tenxun").css("background","url('../img/bg.png') no-repeat -400px 0px");
    })
    $(".renren").mouseover(function(){
        $(".renren").css("background","url('../img/bg.png') no-repeat -441px -40px");
    })
    .mouseout(function(){
        $(".renren").css("background","url('../img/bg.png') no-repeat -441px 0px");
    })
})

























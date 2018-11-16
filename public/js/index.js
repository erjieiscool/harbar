(async function(){
    var res=await ajax({
        url:"http://localhost:9000/index/",
        type:"get",
        dataType:"json"
    });
    console.log(res);
    //1.
    var p=res[0];
    //var {img}=p;
    var html=`<div class="index-one">
    <img src="${p.img}" alt="Harbar house美式家纺">
    <a href="user_login.html" id="index-1" target="_blank"></a>
    <a href="product.html" id="index-2" target="_blank"></a>
    <a href="product.html" id="index-3" target="_blank"></a>
</div>`;
    var parent=document.querySelector("#father>div:first-child");
    parent.innerHTML=html;
    //2
    var p=res[1];
    var html=`<div>
    <img src="${p.img}" alt="美式家纺" class="my_notice">
</div>`;
    var parent=document.querySelector("#father>div:nth-child(2)");
    parent.innerHTML=html;
    //3
    var p=res[2];
    var {img}=p;
    var html=`<div>
    <a href="product.html"><img src="${img}" alt=""></a>
</div>`;
    var parent=document.querySelector("#father>div:nth-child(3)");
    parent.innerHTML=html;
    //4
    var p=res[3];
    var {img}=p;
    var html=`<div>
    <a href=""><img src="${img}"></a>
</div>`;
    var parent=document.querySelector("#father>div:nth-child(4)");
    parent.innerHTML=html;
    //4张连图循环   
    var html=``;
    for(var p of res.slice(4,8)){
        var {img,title}=p;
        html+=`
         <a href="#" class="f1"><img src="${img}" alt="">
             <p>${title}&gt;</p>
         </a>`;        
    }
    var parent=document.querySelector(".index-three");
    parent.innerHTML=html;
    //循环七张图
    var html=``;
    for(var p of res.slice(8,15)){
        var {img}=p;
        html+=`<div class="index-one">
          <a href="#"><img src="${img}" alt=""></a>
      </div>`;        
    }
    var parent=document.querySelector(".seven");
    parent.innerHTML=html;
    //四张连图循环
    var html=``;
    for(var p of res.slice(15,19)){
        var {img,title}=p;
        html+=`
        <a href="#" class="f1"><img src="${img}" alt="">
        <p>${title}&gt;</p>
    </a>`;        
    }
    var parent=document.querySelector(".each>.index-three");
    parent.innerHTML=html;

    //底部三张图
    var html=``;
    for(var p of res.slice(19,22)){
        var {img}=p;
        html+=`<div>
        <a href="#"><img src="${img}" alt=""></a>
    </div>`;        
    }
    var parent=document.querySelector("#foot");
    parent.innerHTML=html;
    //最后一张
    var p=res[22];
    var {img}=p;
    var html=`<div>
    <img src="${img}" alt="">
    <a href="#" class="one"></a>
    <a href="#" class="two"></a>
    <a href="#" class="three"></a>
    <a href="#" class="fore"></a>
    </div>`;
    var parent=document.querySelector(".last");
    parent.innerHTML=html;
})()

$(function(){
    $left=$("div.btn_left");
    $right=$("div.btn_right");
    var moved=0;
    $left.on("click",function(){
        var $left=$(this);
        var $div=$left.parent().children().first();
        if(moved<=0){
            $div.css("left",0);
        }else{ 
            moved--;        
            $div.css("left",-(190+(190*moved)));
        }
    })
    $right.on("click",function(){
         var $right=$(this);
        var $div=$right.parent().children().first();
        if(moved>=4){
            $div.css("right",0);
        }else{
            moved++;
            $div.css("left",-190*moved);
        }
    })
})














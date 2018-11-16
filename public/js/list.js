$(function(){
    $.ajax({
        url:"http://localhost:9000/list",
        type:"get",
        dataType:"JSON",
        success:function(res){
            var html="";
            for(var i=0;i<res.length;i++){
                var {img,sm,image,title,price,href}=res[i];
                html+=`<div class="product">
                    <div>
                        <a href="${res[i].href}" class="zImg"><img src="${res[i].img}"></a>
                        <a href="${res[i].href}" class="yImg hidden"><img src="${res[i].image}"></a>
                        <div><img src="${res[i].sm}
                            " class="gallery">                   
                        </div>
                        <p><a href="${res[i].href}">${res[i].title}</a></p>
                        <p>￥${res[i].price}</p>
                    </div>
                </div>`;
            }
            var $div=$("div.pwrapper");
            $div.html(html);
            //鼠标移入移出切换图片
            $(".zImg").mouseover(function(){
                $zImg=$(this);
                $zImg.addClass("hidden").next().removeClass("hidden");
            })
            $(".yImg").mouseout(function(){
                $yImg=$(".yImg");
                $yImg.addClass("hidden").prev().removeClass("hidden");
            })
        }       
    }) 
    //按价格和系列筛选
    $("div.storyBy>ul>li:nth-child(1)>span").click(function(){
        $("div.price_list").toggle();
    })
    $("div.storyBy>ul>li:nth-child(2)>span").click(function(){
        $("div.drop_list").toggle();
    })
})
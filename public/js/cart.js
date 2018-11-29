$(function(){
    $.ajax({
        url:"http://localhost:9000/cart/items",
        type:"get",
        dataType:"json",
        success:function(res){
            var html=``,total=0,num=0;
            for(var i=0;i<res.length;i++){
                var {tid,product_id,md,lname,material,spec,price,count}=res[i]; 
                total+=price*count;
                num+=count;  
                html+=`<div class="item">
                <ul class="Float myboth">
                    <li class="box">
                        <input type="checkbox" checked="checked" style="position:relative;top:-70px;">
                        <div class="item_pic inline">                             
                            <a href="product_details.html?product_id=${product_id}" target="_blank">
                                <img src="${res[i].md}" name="picture style="width:100%">
                            </a>
                        </div>
                    </li>
                    <li class="product_name">
                        <div class="item_info inline">
                            <p class="fontColor">${res[i].lname}</p>
                            <p class=" colour">${res[i].material}</p>
                            <p class=" colour">${res[i].spec}</p>
                        </div>
                    </li>
                    <li class="product_price Center">
                        <div class="inline meta">
                            <p>￥${res[i].price}</p>
                        </div>
                    </li>
                    <li class="product_num Center">
                        <div class="inline meta" id="add">
                            <button data-tid="${res[i].tid}">-</button>
                            <input type="text" maxlength="3" value="${count}" class="qty_val">
                            <button data-tid="${res[i].tid}">+</button>
                        </div>
                    </li>
                    <li class="product_operate Center">
                        <div class="item_operate inline meta">
                            <button>[&nbsp;确认&nbsp;]</button>
                            <button>[&nbsp;收藏&nbsp;]</button>
                            <button>[&nbsp;删除&nbsp;]</button>
                        </div>
                    </li>
                </ul>
            </div>`; 
            }
            var parent=$("div.itembox");
            parent.html(html);
            //总价
            var html=`<span>商品数量总计：<span class="fontColor">${num}</span>&nbsp;件</span>
            <span class="Total">商品金额（不含运费）：<span>￥${total}</span></span>`;
            $("#sum").html(html);
            $("#totalPrice").html(`<p>合计:<span>￥${total}</span></p>`);
            //加减按钮
            var $div=$("#add");
            console.log($div)
            $div.on("click","button",function(){
                console.log(111)
                var $btn=$(this);
                (async function(){
                    var tid=$btn.attr("data-tid");
                    var count=$btn.siblings("input").val();
                    if($btn.html()=="+"){
                        count++;
                    }else{
                        count--;
                    }
                    await $.ajax({
                        url:"http://localhost:9000/cart/update",
                        type:"get",
                        data:{tid,count},
                    })
                })()
            })
        }
    })
    
})
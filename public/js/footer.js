$(function(){
    //创建link引用footer.css
    $("<link rel='stylesheet' href='css/footer.css'>").appendTo("head")
    //2.ajax请求footer.html片段
    $.ajax({
        url:"http://localhost:9000/footer.html",
        type:"get",
        success:function(res){
            $("#footer").replaceWith(res)
        }
    })
})
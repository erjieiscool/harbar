$(function(){
    $("#btn").click(function(e){
        e.preventDefault();
        var uname=$("#uname").val();
        var upwd=$("#upwd").val();
        (async function(res){
            var res=await $.ajax({
                url:"http://localhost:9000/user/selectUname",
                type:"post",
                data:{uname,upwd},
                dataType:"json"
            })
            if(res=="1"){
                $("#showUname").html("用户名已存在");
            }else if(res=="-1"){
                $("#showUname").html("用户名不能为空");
            }
            else{
                $("#showUname").html("用户名可用");
                    $.ajax({
                        url:"http://localhost:9000/user/register",
                        type:"post",
                        data:{uname,upwd},
                        dataType:"json",
                        success:function(){
                            console.log(999)
                            console.log(res)
                        }                             
                    })
                
            }
        })()
    })
    //密码获取焦点事件
    $("#upwd").focus(function(){
        $(".divUpwd").removeClass("hidden");
        console.log(123);
    })
    $("#upwd").blur(function(){
        $(".divUpwd").addClass("hidden");
    })
})
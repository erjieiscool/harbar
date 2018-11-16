$(function(){
    $("#userLogin").click(function(){ 
             
        var uname=$("#uname").val();
        var upwd=$("#upwd").val();
        //console.log(123);
        (async function(res){
            var res=await $.ajax({
                url:"http://localhost:9000/user/login",
                type:"post",
                data:{uname,upwd},
                dataType:"json"                
            })           
            if(res.ok==-1){
                alert(res.msg);
            }else{
                alert("登陆成功,返回来时的页面......");
                if(location.search.startsWith("?back=")){
                    var url=location.search.slice(6)
                }else{
                    var url="index.html"
                }
                location.href=url;
            }
        })()            
    })
})
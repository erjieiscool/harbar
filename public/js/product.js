$(".productSide_fl>ul>li").on("click",function(e){
    e.preventDefault();
    var $li=$(this);
    var $div=$(this).children().last();
   if($div.hasClass("fade")){
    $div.removeClass("fade");
   }else{
    $div.addClass("fade");
   }
})
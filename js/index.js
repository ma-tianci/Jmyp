$(function() {
    // 最顶部导航下拉菜单
    // 下拉菜单一
    $("#header_xia1").hover(function(){
        $(".xiala1").stop().slideDown(200);
    },function(){
        $(".xiala1").stop().slideUp(200);
    })
    // 下拉菜单二
    $("#header_xia2").hover(function(){
        $(".xiala2").stop().slideDown(200);
    },function(){
        $(".xiala2").stop().slideUp(200);
    })
    
})
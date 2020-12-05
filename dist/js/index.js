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
    // 底部li滑动效果
    $(".bottom_hua li").hover(function(){
        $(this).stop().animate({
            "left":"8px"
        },200);
    },function(){
        $(this).stop().animate({
            "left":"0px"
        },200);
    })
    // 右边导航栏弹出框向右滑动效果
    function dh_right (fu,zi){
        $(fu).hover(function(){
            $(zi).css({
                "display":"block"
            }).stop().animate({
                "left":"-92px",
                "opacity":"1"
            },300)

        },function(){
            $(zi).css({
                "display":"none"
            }).stop().animate({
                "left":"-132px",
                "opacity":"0.2"
            },300)
        })
    }
    dh_right(".caichan",".caichan h3");
    dh_right(".xinyuan",".xinyuan h3");
    dh_right(".kanguo",".kanguo h3");
    dh_right(".kefu",".kefu h3");
    
})
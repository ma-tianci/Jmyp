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
    // 轮播图
    var swiper3 = new Swiper(".lunbo", {
        effect: "fade", //切换方式为渐变
        slidesPerView: 1,
        loop: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2000, //自动轮播速度单位毫秒
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
      if(localStorage.getItem("yonghu")){
          $("#yidenglu").html(localStorage.getItem("yonghu")+"已登录").css({
              "color":" #e31256"
          });
      }
    //   楼梯效果
    let flag = true;
			$(window).scroll(function () {
				if (flag) {
					let st = $(this).scrollTop();
					if (st > 526) {
                        $("#floorNav").fadeIn();
                        $("#floorNav li").eq(1).addClass("hover").siblings().removeClass(
                        "hover");
                        if(st>$(".daiyan_wrap").offset().top){
                            $("#floorNav li").eq(2).addClass("hover").siblings().removeClass(
                                "hover");
                        }
					} else {
						$("#floorNav").fadeOut();
					}
				}
            });
            
			$("#floorNav li").eq(1).click(function () {
				flag = false;
				$("body,html").stop().animate({
					"scrollTop": 526
				}, 800, function () {
					flag = true;
				});
				$(this).addClass("hover").siblings().removeClass("hover");
            })

            $("#floorNav li").eq(2).click(function () {
				flag = false;
				
				$("body,html").stop().animate({
					"scrollTop": $(".daiyan_wrap").offset().top
				}, 800, function () {
					flag = true;
				});
				$(this).addClass("hover").siblings().removeClass("hover");
			})

			$("#floorNav li:last").click(function () {
				flag = false;
				$("body,html").stop().animate({
					"scrollTop": 0
				}, 800, function () {
					flag = true;
				});

				$("#floorNav").fadeOut();

			})

})
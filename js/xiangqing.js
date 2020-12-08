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
 //拿到商品
 $.ajax({
    url: 'http://jx.xuzhixiang.top/ap/api/detail.php',
    data: {
        id: location.search.split('=')[1],
    },
    success: function(res) {
        $('.xq_tu img').attr('src', `../${res.data.pimg}`)
        $('#mingcheng').html(`${res.data.pname}`)
        $('#miaoshu').html(`${res.data.pdesc}`)
        $('#jiage span').html(`${res.data.pprice}`)
    }
})
//  加入购物车
var jian = document.getElementById("jian");
var zhi = document.getElementById("zhi");
var jia = document.getElementById("jia");
var btn = document.getElementById("btn");
let paid = location.search.split('=')[1];
console.log(btn);
jian.onclick = function() {
zhi.value--;
if (zhi.value <= 1) {
    zhi.value = 1;
}
}
jia.onclick = function() {
zhi.value++;
}
btn.onclick = function() {
if(localStorage.getItem("u-id")){
$.ajax({
    type: "Get",
    url: "http://jx.xuzhixiang.top/ap/api/add-product.php",
    data: {
        uid: localStorage.getItem("u-id"),
        pid: paid,
        pnum: $("#zhi").val()
    },
    success:function(res){
        alert("加入购物车成功");
        
        location.href = "gouwuche.html";
    },
    error:function(){
        alert("不好意思，您的商品坐着火箭飞走了，程序员小哥哥正在马不停蹄的追赶中")
    }
})

}else{
    location.href = "denglu.html";
    alert("您还未登录，请先登录再加入购物车");
    

}


}
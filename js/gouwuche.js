// 获取购物车中商品
$(function () {
  function mm() {
    $.ajax({
      type: "Get",
      url: "http://jx.xuzhixiang.top/ap/api/cart-list.php",
      data: {
        id: localStorage.getItem("u-id"),
      },
      // async: false,
      success: function (res) {
        console.log(res.data);
        let html = "";
        res.data.forEach((v) => {
          html += `<li class="lid">
                    <input type="checkbox" class="choose checked-A-btn">
                    <img src="../${v.pimg}" alt="">
                    <p>${v.pname}</p>
                    <i class="danjia">${v.pprice}</i>
                    <div class="tianjia">
                        <div class="jian" data-id="${v.pid}">
                            -
                        </div>
                        <input type="text" value="${v.pnum}" class="zhi" data-num="${v.pnum}">
                        <div class="jia" data-id="${v.pid}">
                            +
                        </div>
                    </div>
                    <b class="xiaoji">${Number(v.pprice) * Number(v.pnum)}</b>
                    <button class="shan" li_id="${v.pid}">
                        删除
                    </button>
                </li>`;
        });
        $("#car_box").html(html);
        schanshu();//删除商品
        clickchoose();//复选框判断
        dataAdd();//增加商品
        dataReduce();//减少商品
      },
    });
  }
  mm();
  // 单价和总价的计算
 



  //减少商品
function dataReduce() {
    $(".jian").click(function() {
        let nowNum = $(this).next().attr('data-num')
        if ($(this).next().val() - 0 == 1) {
            return
        }
        $(this).next().attr('data-num', nowNum - 1)
        $.ajax({
            url: "http://jx.xuzhixiang.top/ap/api/cart-update-num.php",
            type: "Get",
            data: {
                uid: localStorage.getItem('u-id'),
                pid: $(this).attr('data-id'),
                pnum: nowNum - 1
            },
            success: () => {
                $(this).next().val($(this).next().val() - 1)
                $(this).parent().next().html(parseInt(parseInt($(this).parent().prev().html()) * $(this).next().val()))
                getTotalPrice()
            },
            error: (error) => {
                console.log(error)
            }
        })
    })
}

//增加商品
function dataAdd() {
    $(".jia").click(function() {
        let nowNum = $(this).prev().attr('data-num');
        $(this).prev().attr('data-num', nowNum - 0 + 1)
        $.ajax({
            url: "http://jx.xuzhixiang.top/ap/api/cart-update-num.php",
            type: "Get",
            data: {
                uid: localStorage.getItem('u-id'),
                pid: $(this).attr('data-id'),
                pnum: +nowNum + 1
            },
            success: () => {
                $(this).prev().val($(this).prev().val() - 0 + 1);
                $(this).parent().next().html(parseInt($(this).parent().prev().html()) * $(this).prev().val());
                getTotalPrice()
            },
            error: (error) => {
                console.log(error)
            }
        })

    })
}
  
//计算总价
function getTotalPrice() {
    var sum = 0;
    for (let i = 0; i < $(".checked-A-btn").length; i++) {
        if ($('.checked-A-btn').eq(i).prop('checked')) { //判断单选按钮是否勾选
            sum += +$(".xiaoji").eq(i).html(); //求和
        }
    }
    $("#zongjia").html(sum);
}

// -------------------------------------------------------
   //选择框判断

   function clickchoose() {
    var totoalchoose = document.querySelector("#quan");
    var achoose = document.querySelectorAll(".choose"); //单选框
    //点击全选的时候将所有单选框勾选上
    totoalchoose.onclick = function () {
        
      for (let j = 0; j < achoose.length; j++) {
        if (totoalchoose.checked) {
          achoose[j].checked = true;
        } else {
          achoose[j].checked = false;
        }
      }getTotalPrice()
    };

    //调用的时候遍历一遍单选按钮
    for (let i = 0; i < achoose.length; i++) {
        
      let flag = true;
      if (!achoose[i].checked) {
        flag = false;
        break;
      }
      totoalchoose.checked = flag;
      
    }

    //判断勾选的单选框的选择情况，有一个没选择全选按钮就不勾选
    for (let j = 0; j < achoose.length; j++) {
      achoose[j].onclick = function () {
        let flag = true;
        for (let i = 0; i < achoose.length; i++) {
          if (!achoose[i].checked) {
            flag = false;
            break;
          }
        }
        totoalchoose.checked = flag;
        getTotalPrice();
      };
    }
  }
  
  // 删除商品
  function schanshu() {
    let shan = document.getElementsByClassName("shan");
    for (let i = 0; i < shan.length; i++) {
      $(shan[i]).click(function () {
        let paid = this.getAttribute("li_id");
        $.ajax({
          type: "Get",
          url: "http://jx.xuzhixiang.top/ap/api/cart-delete.php",
          data: {
            uid: localStorage.getItem("u-id"),
            pid: paid,
          },
          success: function () {
            clickchoose();
            getTotalPrice();
            if($(".jia").length==0){
                var totoalchoose = document.querySelector("#quan");

                totoalchoose.checked = false;
            }
          },
        });
        this.parentNode.remove();
      });
    }
  }

});
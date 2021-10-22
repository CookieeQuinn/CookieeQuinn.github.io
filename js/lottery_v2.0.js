$(function () {
  // 入口函数
  let i = 0;      //当前选中框所在而的位置,起初是在1（0~7）
  let alreadyWin = null;  //中奖位置（1~8）
  let moveCount = 0; //本轮抽奖需要旋转的次数
  let movedC = 0; //本轮抽奖已经旋转的次数
  let ticto, ticto2; //计时器
  let playing = false;  //标记目前是否正在抽奖
  let chance = 3;  //共有3次抽奖机会
  let prizes = [  //奖品
    "万能券",
    "打游戏券",
    "睡懒觉券",
    "合照券",
    "电影券",
    "快乐券",
    "听歌券",
    "奶茶券",
  ];


  //为“开始抽奖”按钮绑定点击事件
  $('#start').click(function () {
    if (!playing) {

      //判断是否还具有抽奖机会
      if (chance == 0) {

        alert("已经没有抽奖机会了┭┮﹏┭┮");

      } else {
        //标记为正在抽奖，剩余抽奖机会减一
        playing = true;
        chance--;

        //产生一个随机数（50~100），作为本轮抽奖需要旋转的次数
        moveCount = Math.floor((Math.random() * 100 + 1));
        console.log(moveCount);

        //抽奖前初始化计数器等
        movedC = 0; //变化次数 计数器 归零
        alreadyWin = null; //中奖位置初始化
        // i = 0;  //抽奖起始位置初始化


        //转盘开始动
        lottering();

      }

    } else {
      //正在抽奖时，不允许再次点击抽奖
    }
  })


  //实现转盘转动的函数
  function lottering() {

    //用setInterval实现周期转动：初期快速转动，后期减速
    ticto = setInterval(() => {
      if (moveCount - movedC > 20) {
        // console.log(movedC);
        $("#unit-" + i).children("div").removeClass("selected");
        i = (i + 1) % 8;
        $("#unit-" + i).children("div").addClass("selected");
        movedC++;
      } else {
        //后期：剩余20次变化时，减速
        ticto2 = setInterval(() => {
          if (movedC < moveCount) {
            // console.log(movedC);
            $("#unit-" + i).children("div").removeClass("selected");
            i = (i + 1) % 8;
            $("#unit-" + i).children("div").addClass("selected");
            movedC++;
          } else {
            setTimeout(function () {
              playing = false;
              alreadyWin = i + 1;
              alert("恭喜你中了" + alreadyWin + "等奖！获得" + prizes[i] + "一张~")
            }, 500);
            clearInterval(ticto2);
          }
        }, 100)


        clearInterval(ticto);
      }
    }, 50);



  }
})





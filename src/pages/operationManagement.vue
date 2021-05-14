<template>
  <div id="operationManagement">
    <header>
      <div>
        <span class="title">作战时间</span>
        <span class="time">{{fightTime}}</span>
      </div>
      <img src="../assets/timg.png" />
      <div>
        <span class="title">天文时间</span>
        <span class="time">{{beijingTime}}</span>
      </div>
    </header>
    <div class="content">
      <div class="left">
        <span>方案运行</span>
        <Button type="primary" long>北斗授时</Button>
        <Button type="primary" long>时钟同步</Button>
      </div>
      <div class="center">
        <div>
          <table style="width: 100%">
            <tr>
              <td style="width: 80px">仿真效率：</td>
              <td style="text-align:center">
                <Slider v-model="slider_value" :step="10" show-stops></Slider>
              </td>
            </tr>
          </table>
        </div>
        <div style="text-align:center">
          <Button type="primary" style="width: 19%">加载</Button>
          <Button type="primary" style="width: 19%">开始</Button>
          <Button type="primary" style="width: 19%">暂停</Button>
          <Button type="primary" style="width: 19%">恢复</Button>
          <Button type="primary" style="width: 19%">停止</Button>
        </div>
      </div>
      <div class="right">
        <div>
          <span>运行总次数：</span>
          <Input v-model="totalOperationTimes" style="width: 200px" />
        </div>
        <div>
          <span>当前序号：</span>
          <Input v-model="CurrentSerialNumber" style="width: 200px" />
        </div>
        <div>
          <span>运行号：</span>
          <Input v-model="operationNo" style="width: 200px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDateTime_chinese } from "@/utils/utils";
export default {
  data() {
    return {
      fightTime: "0000年00月00日 00:00:00",
      beijingTime: formatDateTime_chinese(new Date()),
      totalOperationTimes: "",
      CurrentSerialNumber: "",
      operationNo: "",
      slider_value: 1,
      screenWidth: ""
    };
  },
  watch: {
    screenWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        this.timer = true;
        let self = this;
        setTimeout(function() {
          // 打印screenWidth变化的值
          // self.table_height =
          // document.getElementById("table_box").clientHeight - 30;
          self.html = document.documentElement;
          console.log(self.html);
          self.timer = false;
        }, 400);
      }
    }
  },
  methods: {
    getTime() {
      this.beijingTime = formatDateTime_chinese(new Date());
    }
  },
  mounted() {
    const self = this;

    this.interval = window.setInterval(() => {
      self.getTime();
    }, 1000);

    (function() {
      // 浏览器大小设置font-size
      function setRootFontSize() {
        let rem, rootWidth;
        let rootHtml = document.documentElement;
        //限制展现页面的最小宽度
        rootWidth = rootHtml.clientWidth < 1366 ? 1366 : rootHtml.clientWidth;
        // 19.2 = 设计图尺寸宽 / 100（ 设计图的rem = 100 ）
        rem = rootWidth / 19.2;
        // 动态写入样式
        rootHtml.style.fontSize = `${rem}px`;
      }
      setRootFontSize();
      window.addEventListener("resize", setRootFontSize, false);
    })();
  },
  destroyed() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped>
#operationManagement {
  height: 100%;
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
header {
  height: 49%;
  border: 5px solid #ccc;
  background-color: black;
  display: flex;
  align-items: center;
}
header > img {
  width: 10%;
}
header > div {
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
header span {
  font-size: 0.65rem;
  font-weight: bold;
}
header .title {
  /* font-size: 0.5rem; */
  color: rgb(0, 155, 39);
}
header .time {
  color: rgb(201, 181, 0);
}
.content {
  height: 25%;
  display: flex;
  /* padding: 15px; */
}
.content > div {
  width: 100%;
  margin: 20px;
}
.left {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.left span {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: #fff;
  padding: 0 10px;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.center div {
  width: 100%;
  height: 20px;
}
.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
}
</style>
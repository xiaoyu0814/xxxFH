<template>
  <div id="seatAllocation">
    <div
      style="
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: space-between;
      "
    >
      <div class="left">
        <div class="seatInformation">
          <span>席位信息</span>
          <p class="seat_title" style="color: red">红方席位</p>
          <div class="seat_border">
            <div
              v-for="(item, index) in $store.state.redSeat"
              :key="index"
              class="seat_box"
              :style="
                item.type
                  ? redSeat_index === index
                    ? 'background-color: #ffff00;color:#000'
                    : 'background-color: #ff8000;'
                  : 'background-color: red;'
              "
              @click="getSeat(item, index, 'red')"
            >
              {{ item.value.describeInfo.name }}
              <span v-if="item.type">(已登录)</span>
            </div>
          </div>
          <p class="seat_title" style="color: blue">蓝方席位</p>
          <div class="seat_border">
            <div
              v-for="(item, index) in $store.state.blueSeat"
              :key="index"
              class="seat_box"
              :style="
                item.type
                  ? blueSeat_index === index
                    ? 'background-color: #80ffff;color:#000'
                    : 'background-color: #0ba9f4;'
                  : 'background-color: blue;'
              "
              @click="getSeat(item, index, 'blue')"
            >
              {{ item.value.describeInfo.name }}
              <span v-if="item.type">(已登录)</span>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="redCommandInformation">
          <span>席位描述信息</span>
          <div>
            <table>
              <tr>
                <td>席位名称</td>
                <td>{{ describeInfo.name }}</td>
              </tr>
              <tr>
                <td>席位类别</td>
                <td>{{ describeInfo.seatCategory }}</td>
              </tr>
              <tr>
                <td>主要功能</td>
                <td>{{ describeInfo.function }}</td>
              </tr>
              <tr>
                <td>操作约束</td>
                <td>{{ describeInfo.constraints }}</td>
              </tr>
            </table>
          </div>
          <div id="list"></div>
        </div>
        <div class="blueCommandInformation" id="CommandInformation">
          <span>席位节点信息</span>
          <div>
            <table>
              <tr>
                <td>IP地址</td>
                <td>{{ nodeInfo.IP }}</td>
              </tr>
              <tr>
                <td>网络状态</td>
                <td>{{ nodeInfo.network }}</td>
              </tr>
              <tr>
                <td>内存状态</td>
                <td>{{ nodeInfo.memory }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="simulationInformation" id="table_box" v-if="false">
          <span>仿真信息</span>
          <Table
            border
            :height="table_height"
            size="small"
            :columns="tableHeader"
            :data="table_data"
            style="height: 100%"
          ></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import searStatus_data from "@/config/searStatus_data";
import { getUserIP } from "@/utils/utils";

export default {
  data() {
    return {
      slider_value: 3,
      screenWidth: "",
      table_height: "",
      table_height_top: "",
      tableHeader: [
        {
          title: "装备名称",
          key: "name",
        },
        {
          title: "装备数量",
          key: "age",
        },
        {
          title: "装备编码",
          key: "address",
        },
      ],
      table_data: searStatus_data.table_data,
      combatOrganization_data: searStatus_data.combatOrganization_data,
      redSeat_data: searStatus_data.redSeat_data,
      blueSeat_data: searStatus_data.blueSeat_data,
      redSeat_index: -1,
      blueSeat_index: -1,
      describeInfo: {
        name: "",
        function: "",
        constraints: "",
      },
      nodeInfo: {
        IP: "",
        network: "",
        memory: "",
      },
      LoadIP: "",
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
        setTimeout(function () {
          // 打印screenWidth变化的值
          // self.table_height =
          // document.getElementById("table_box").clientHeight - 30;
          self.table_height_top =
            document.getElementById("CommandInformation").clientHeight - 30;
          // console.log(self.table_height)
          console.log(self.table_height_top);
          self.timer = false;
        }, 400);
      }
    },
  },
  methods: {
    getSeat(item, index, seat) {
      if (!item.type) {
        this.$Message.info("未登录");
        return;
      }
      let _numIndex = index;
      if (seat === "red") {
        this.blueSeat_index = -1;
        this.redSeat_index = index;
        _numIndex = index + 8;
      } else if (seat === "blue") {
        this.redSeat_index = -1;
        this.blueSeat_index = index;
      }
      this.describeInfo = item.value.describeInfo;
      this.nodeInfo = item.value.nodeInfo;
      if (this.LoadIP) {
      } else {
        this.LoadIP = "192.168.126.206";
      }
      let _start = this.LoadIP.substr(0, this.LoadIP.lastIndexOf(".") + 1);
      let _lastNum =
        Number(this.LoadIP.substr(this.LoadIP.lastIndexOf(".") + 1)) +
        _numIndex;
      console.log(_start, _lastNum);
      this.nodeInfo.IP = _start + _lastNum;
    },
    getYourIP() {
      let _this = this;
      getUserIP(function (ip) {
        console.log(ip);
        _this.LoadIP = ip;
      });
    },
  },
  mounted() {
    const self = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        self.screenWidth = window.screenWidth;
      })();
    };
    window.screenWidth = document.body.clientWidth;
    self.screenWidth = window.screenWidth;
    // console.log(returnCitySN.cip);
    this.getYourIP();
    this.$Message.config({
      top: 70
    });
  },
};
</script>

<style scoped>
#seatAllocation {
  width: 100%;
  height: 100%;
  padding: 15px;
}
.left,
.right {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}
.left {
  width: 61%;
}
.right {
  width: 38%;
}
.seatInformation {
  height: 100%;
}
.simulationControl {
  height: 20%;
  margin-top: 15px;
}
.redCommandInformation,
.blueCommandInformation,
.simulationInformation {
  height: 49%;
}
.seatInformation,
.simulationControl,
.redCommandInformation,
.blueCommandInformation,
.simulationInformation {
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
  padding: 15px;
}
.seatInformation > span,
.simulationControl > span,
.redCommandInformation > span,
.blueCommandInformation > span,
.simulationInformation > span {
  position: absolute;
  top: -10px;
  left: 10px;
  font-size: 16px;
  font-weight: bold;
  background-color: #fff;
  padding: 0 5px;
}
.seatInformation {
  display: flex;
  flex-direction: column;
}
.seatInformation .seat_title {
  font-size: 18px;
  font-weight: bold;
  margin: 10px;
}
.seatInformation .seat_border {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  /* align-content: flex-start; */
  height: 100%;
}
.seatInformation .seat_border .seat_box {
  width: 11%;
  height: 34%;
  margin: 1.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.simulationControl > table {
  height: 100%;
  width: 100%;
}
.simulationControl > table td {
  text-align: center;
  /* padding: 5px; */
}
.redCommandInformation > div,
.blueCommandInformation > div {
  display: flex;
  height: 100%;
}
.redCommandInformation > div > .tree_box,
.blueCommandInformation > div > .tree_box {
  border: 1px solid #ccc;
  width: 20%;
  min-width: 150px;
  margin-right: 10px;
  padding: 0 10px;
  max-height: 230px;
  overflow: hidden auto;
}
.right table {
  width: 100%;
  border-collapse: collapse;
}
.right table td {
  border: 1px solid #ccc;
  padding: 10px;
  width: 70%;
}
.right table td:nth-child(odd) {
  text-align: right;
  font-size: 14px;
  font-weight: bold;
  background-color: #f1f1f1;
  width: 20%;
}
</style>
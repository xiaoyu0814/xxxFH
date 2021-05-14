<template>
  <div id="seatAllocation">
    <div style="display:flex;height:100%;width:100%;justify-content: space-between">
      <div class="left">
        <div class="seatInformation">
          <span>现有席位</span>
          <div class="seat_border">
            <div
              v-for="(item,index) in seat_data"
              :key="index"
              class="seat_box"
              :class="item.team?item.team==='red'?'red':'blue':''"
              :style="redSeat_index===index?'border-color: #000':'border-color: #ccc;'"
              @click="getSeat(item,index,'red')"
            >
              <img :src="item.imgUrl" />
              {{item.label}}
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="redCommandInformation" id="redCommandInformation">
          <span>席位描述信息</span>
          <div>
            <table>
              <tr>
                <td>席位名称</td>
                <td>
                  <Input v-model="describeInfo.name" placeholder="请输入..." />
                </td>
              </tr>
              <tr>
                <td>席位类别</td>
                <td>
                  <Select
                    v-model="describeInfo.seatCategory"
                    @on-change="change_selectValue"
                  >
                    <Option
                      v-for="item in seatCategorys"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </td>
              </tr>
              <tr>
                <td>主要功能</td>
                <td>
                  <Input v-model="describeInfo.function" placeholder="请输入..." />
                </td>
              </tr>
              <tr>
                <td>操作约束</td>
                <td>
                  <Input v-model="describeInfo.constraints" placeholder="请输入..." />
                </td>
              </tr>
            </table>
          </div>
          <div style="padding:10px 0;display:flex;justify-content: space-between;">
            <div>
              <span>添加至：</span>
              <Select
                v-model="combatAffiliation"
                style="width:200px"
                @on-change="change_selectValue"
              >
                <Option
                  v-for="item in combatAffiliations"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <div>
              <Button type="primary" @click="addToTeam" style="margin-right:5px">确定</Button>
            </div>
          </div>
        </div>
        <div class="blueCommandInformation" id="CommandInformation" v-if="false">
          <span>已添加席位</span>
          <div>
            <span>红方已添加席位</span>
            <ul>
              <li v-for="(item,index) in $store.state.redSeat" :key="index">{{item.label}}</li>
            </ul>
          </div>
          <div>
            <span>蓝方已添加席位</span>
            <ul>
              <li v-for="(item,index) in $store.state.blueSeat" :key="index">{{item.label}}</li>
            </ul>
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
            style="height:100%"
          ></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import seatAllocation_data from "@/config/seatAllocation_data";
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
          key: "name"
        },
        {
          title: "装备数量",
          key: "age"
        },
        {
          title: "装备编码",
          key: "address"
        }
      ],
      table_data: seatAllocation_data.table_data,
      combatOrganization_data: seatAllocation_data.combatOrganization_data,
      seat_data: seatAllocation_data.seat_data,
      blueSeat_data: seatAllocation_data.blueSeat_data,
      redSeat_index: -1,
      blueSeat_index: -1,
      describeInfo: {
        name: "",
        function: "",
        constraints: "",
        seatCategory:""
      },
      nodeInfo: {
        IP: "",
        network: "",
        memory: ""
      },
      LoadIP: "",
      seatCategory:"",
      seatCategorys:[
        {
          label: "导演席位",
          value: "导演席位"
        },
        {
          label: "控制席位",
          value: "控制席位"
        },
        {
          label: "管理席位",
          value: "管理席位"
        },
        {
          label: "作业席位",
          value: "作业席位"
        }
      ],
      combatAffiliation: "red",
      combatAffiliations: [
        {
          label: "红方",
          value: "red"
        },
        {
          label: "蓝方",
          value: "blue"
        }
      ],
      selectSeat: "",
      redSeat: [],
      blueSeat: []
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
          self.table_height_top =
            document.getElementById("CommandInformation").clientHeight - 30;
          // console.log(self.table_height)
          console.log(self.table_height_top);
          self.timer = false;
        }, 400);
      }
    }
  },
  methods: {
    addToTeam() {
      if (this.combatAffiliation === "red") {
        this.selectSeat.team = "red";
        this.selectSeat.value = {
          describeInfo: this.describeInfo,
          nodeInfo: {
            IP: "127.0.0.1",
            network: "在线",
            memory: Math.floor(Math.random() * (90 - 20 + 1)) + 20 + "%"
          }
        };
        this.$store.state.redSeat.push(this.selectSeat);
      } else {
        this.selectSeat.team = "blue";
        this.selectSeat.value = {
          describeInfo: this.describeInfo,
          nodeInfo: {
            IP: "127.0.0.1",
            network: "在线",
            memory: Math.floor(Math.random() * (90 - 20 + 1)) + 20 + "%"
          }
        };
        this.$store.state.blueSeat.push(this.selectSeat);
      }
      this.selectSeat.label = this.describeInfo.seatCategory;
      this.describeInfo = {
        name: "",
        function: "",
        constraints: ""
      };
    },
    getSeat(item, index, seat) {
      // if (!item.type) {
      //   this.$Message.info("未登录");
      //   return;
      // }
      this.selectSeat = item;
      let _numIndex = index;
      if (seat === "red") {
        this.blueSeat_index = -1;
        this.redSeat_index = index;
        _numIndex = index + 8;
      } else if (seat === "blue") {
        this.redSeat_index = -1;
        this.blueSeat_index = index;
      }

      // this.describeInfo = item.value.describeInfo;
      this.nodeInfo = item.value.nodeInfo;
      if (this.LoadIP) {
        let _start = this.LoadIP.substr(0, this.LoadIP.lastIndexOf(".") + 1);
        let _lastNum =
          Number(this.LoadIP.substr(this.LoadIP.lastIndexOf(".") + 1)) +
          _numIndex;
        console.log(_start, _lastNum);
        this.nodeInfo.IP = _start + _lastNum;
      }
    },
    getYourIP() {
      let _this = this;
      getUserIP(function(ip) {
        console.log(ip);
        _this.LoadIP = ip;
      });
    }
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
  }
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
}
.seatInformation .seat_border .seat_box {
  width: 22%;
  height: 34%;
  margin: 1.5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid #ccc;
}
.seatInformation .seat_border img {
  width: 100%;
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
  /* height: 100%; */
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
#CommandInformation {
  display: flex;
  flex-direction: initial;
  justify-content: space-between;

  padding-top: 20px;
}
#CommandInformation > div {
  display: flex;
  width: 49%;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
  padding: 10px;
}
#CommandInformation > div > span {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: #fff;
  padding: 0 5px;
}
.redCommandInformation {
  flex-direction: column;
}
.red {
  background-color: #f00;
  color: #fff;
}
.blue {
  background-color: #00f;
  color: #fff;
}
ul {
  list-style: none;
}
</style>
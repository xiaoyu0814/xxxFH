<template>
  <div id="operationStatusMonitoring">
    <div class="integratedManagementSeatArea">
      <span>综合管控席位区</span>
      <div
        v-for="(item,index) in comprehensiveControl"
        :key="index"
        @click="getNodeInfo(item,index,1)"
        :style="item.nodeInfo.network==='离线'?'background-color:#f00;color:#fff':''"
      >
        <img :src="item.imgUrl" />
        <span>{{item.label}}</span>
      </div>
    </div>
    <div class="bottom_box">
      <div class="red_box">
        <span style="color:red">红军导调席位区</span>
        <div
          v-for="(item,index) in redPilotTuning"
          :key="index"
          @click="getNodeInfo(item,index+7)"
          :style="item.nodeInfo.network==='离线'?'background-color:#f00;color:#fff':''"
        >
          <img :src="item.imgUrl" />
          <span>{{item.label}}</span>
        </div>
      </div>
      <div class="blue_box">
        <span style="color:blue">蓝军导调席位区</span>
        <div
          v-for="(item,index) in bluePilotTuning"
          :key="index"
          @click="getNodeInfo(item,index+14)"
          :style="item.nodeInfo.network==='离线'?'background-color:#00f;color:#fff':''"
        >
          <img :src="item.imgUrl" />
          <span>{{item.label}}</span>
        </div>
      </div>
    </div>
    <div class="bottom_box">
      <div class="class">
        <span>教室1</span>
        <div
          @click="getNodeInfo({label: '核爆探测车训练模拟器组件',
            imgUrl: 'static/img/pc.png',
            describeInfo: {
              name: '核爆探测车训练模拟器组件',
              function: '待定',
              constraints: '待定'
            },
            nodeInfo: {
              IP: '',
              network: '离线',
              memory: Math.floor(Math.random() * (90 - 20 + 1)) + 20 + '%'
            }},20,1)"
          style="background-color:#f00;color:#fff'"
        >
          <img src="static/img/pc.png" />
          <span>核爆探测车训练模拟器组件</span>
        </div>
      </div>
      <div class="class">
        <span>教室2</span>
        <div
          @click="getNodeInfo({label: '化学应急桌面训练系统组件',
            imgUrl: 'static/img/pc.png',
            describeInfo: {
              name: '化学应急桌面训练系统组件',
              function: '待定',
              constraints: '待定'
            },
            nodeInfo: {
              IP: '',
              network: '离线',
              memory: Math.floor(Math.random() * (90 - 20 + 1)) + 20 + '%'
            }},20,1)"
          style="background-color:#f00;color:#fff'"
        >
          <img src="static/img/pc.png" />
          <span>化学应急桌面训练系统组件</span>
        </div>
      </div>
      <div class="class">
        <span>教室3</span>
        <div
          @click="getNodeInfo({label: '生物侦检虚拟现实训练组件',
            imgUrl: 'static/img/pc.png',
            describeInfo: {
              name: '生物侦检虚拟现实训练组件',
              function: '待定',
              constraints: '待定'
            },
            nodeInfo: {
              IP: '',
              network: '离线',
              memory: Math.floor(Math.random() * (90 - 20 + 1)) + 20 + '%'
            }},20,1)"
          style="background-color:#f00;color:#fff'"
        >
          <img src="static/img/pc.png" />
          <span>生物侦检虚拟现实训练组件</span>
        </div>
      </div>
      <div class="class">
        <span>教室4</span>
        <div
          @click="getNodeInfo({label: '发烟分队战术训练系统组件',
            imgUrl: 'static/img/pc.png',
            describeInfo: {
              name: '发烟分队战术训练系统组件',
              function: '待定',
              constraints: '待定'
            },
            nodeInfo: {
              IP: '',
              network: '离线',
              memory: Math.floor(Math.random() * (90 - 20 + 1)) + 20 + '%'
            }},20,1)"
          style="background-color:#f00;color:#fff'"
        >
          <img src="static/img/pc.png" />
          <span>发烟分队战术训练系统组件</span>
        </div>
      </div>
    </div>
    <Modal v-model="nodeInfo_modal" title="节点信息" @on-ok="ok" @on-cancel="cancel">
      <div class="nodeInfo_box">
        <table>
          <tr>
            <td>席位名称</td>
            <td>{{describeInfo.name}}</td>
          </tr>
          <tr>
            <td>主要功能</td>
            <td>{{describeInfo.function}}</td>
          </tr>
          <tr>
            <td>操作约束</td>
            <td>{{describeInfo.constraints}}</td>
          </tr>
          <tr>
            <td>IP地址</td>
            <td>{{nodeInfo.IP}}</td>
          </tr>
          <tr>
            <td>网络状态</td>
            <td>{{nodeInfo.network}}</td>
          </tr>
          <tr>
            <td>内存状态</td>
            <td>{{nodeInfo.memory}}</td>
          </tr>
        </table>
      </div>
    </Modal>
  </div>
</template>

<script>
import operationStatusMonitoring_data from "@/config/operationStatusMonitoring_data";
import { getUserIP } from "@/utils/utils";
export default {
  data() {
    return {
      nodeInfo_modal: false,
      comprehensiveControl: operationStatusMonitoring_data.comprehensiveControl,
      redPilotTuning: operationStatusMonitoring_data.redPilotTuning,
      bluePilotTuning: operationStatusMonitoring_data.bluePilotTuning,
      describeInfo: {
        name: "",
        function: "",
        constraints: ""
      },
      nodeInfo: {
        IP: "",
        network: "",
        memory: ""
      },
      LoadIP: ""
    };
  },
  methods: {
    getNodeInfo(item, index) {
      this.nodeInfo_modal = true;
      if (this.LoadIP) {
      } else {
        this.LoadIP = "192.168.126.206";
      }
      let _start = this.LoadIP.substr(0, this.LoadIP.lastIndexOf(".") + 1);
      let _lastNum =
        Number(this.LoadIP.substr(this.LoadIP.lastIndexOf(".") + 1)) + index;
      console.log(_start, _lastNum);
      // let _temp = {
      //   IP: _start + _lastNum,
      //   network: item.network,
      //   memory: item.memory
      // };
      this.describeInfo = item.describeInfo;
      this.nodeInfo = item.nodeInfo;
      this.nodeInfo.IP = _start + _lastNum;
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
    this.getYourIP();
  }
};
</script>

<style scoped>
#operationStatusMonitoring {
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.integratedManagementSeatArea,
.red_box,
.blue_box {
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
}
.integratedManagementSeatArea > span,
.red_box > span,
.blue_box > span {
  position: absolute;
  top: -14px;
  left: 10px;
  font-size: 18px;
  font-weight: bold;
  background-color: #fff;
  padding: 0 5px;
}
.integratedManagementSeatArea {
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.integratedManagementSeatArea > div {
  width: 10%;
  /* height: 70%; */
  /* background-color: #f1f1f1; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.integratedManagementSeatArea > div > span {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
}
.bottom_box {
  height: 30%;
  display: flex;
  justify-content: space-between;
}
.red_box,
.blue_box {
  width: 49%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}
.red_box > div,
.blue_box > div {
  width: 14%;
  /* height: 35%; */
  /* background-color: #f1f1f1; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.red_box > div > span,
.blue_box > div > span {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
}
img {
  width: 100%;
  /* height: 100%; */
}
.nodeInfo_box table {
  width: 100%;
  border-collapse: collapse;
}
.nodeInfo_box table td {
  border: 1px solid #ccc;
  padding: 10px;
  width: 70%;
}
.nodeInfo_box table td:nth-child(odd) {
  text-align: right;
  font-size: 14px;
  font-weight: bold;
  background-color: #f1f1f1;
  width: 20%;
}
.class {
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.class > div {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.class > span {
  position: absolute;
  top: -10px;
  left: 10px;
  font-size: 18px;
  font-weight: bold;
  background-color: #fff;
  padding: 0 5px;
}
.class > div > span {
  font-size: 14px;
  font-weight: bold;
  color:#fff;
}
</style>
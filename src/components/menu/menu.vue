<template>
  <Menu mode="horizontal" :theme="theme1" @on-select="onMenuSelect">
    <router-link to="/operationalOrganization">
      <MenuItem
        v-if="fenzu == 3|| fenzu == 2"
        name="1"
        style="padding: 0 4px;"
        :style="selectNavName==='1'?'color:#000;font-weight:bold':'font-weight:400'"
      >
        <Icon type="ios-people" />作战编组
      </MenuItem>
    </router-link>
    <router-link to="/operationalDeployment">
      <MenuItem
        v-if="fenzu == 3|| fenzu == 2"
        name="2"
        style="padding: 0 4px;"
        :style="selectNavName==='2'?'color:#000;font-weight:bold':'font-weight:400'"
      >
        <Icon type="ios-people" />作战部署
      </MenuItem>
    </router-link>
    <Submenu
      v-if="fenzu == 1|| fenzu == 2"
      name="3"
      style="padding: 0 4px;"
      :style="selectNavName==='3'?'color:#000;font-weight:bold':'font-weight:400'"
    >
      <template slot="title">
        <Icon type="ios-stats" />席位分配
      </template>
      <router-link to="/seatAllocation">
        <MenuItem name="3-1">席位分配</MenuItem>
      </router-link>
      <router-link to="/seatStatus">
        <MenuItem name="3-2">席位状态</MenuItem>
      </router-link>
    </Submenu>
    <router-link to="/situationDisplay">
      <MenuItem
        v-if="fenzu == 3|| fenzu == 2"
        name="4"
        style="padding: 0 4px;"
        :style="selectNavName==='4'?'color:#000;font-weight:bold':'font-weight:400'"
      >
        <Icon type="ios-people" />综合态势
      </MenuItem>
    </router-link>
    <Submenu
      v-if="fenzu == 2"
      name="5"
      style="padding: 0 4px;"
      :style="selectNavName==='5'?'color:#000;font-weight:bold':'font-weight:400'"
    >
      <template slot="title">
        <Icon type="ios-stats" />导调控制
      </template>
       <router-link to="/bingliganyu">
      <MenuItem name="5-1">兵力干预</MenuItem>
       </router-link>
      <router-link to="/atmosphereIntervention">
        <MenuItem name="5-2">大气环境干预</MenuItem>
      </router-link>
      <router-link to="/electromagnetismIntervention">
        <MenuItem name="5-3">电磁环境干预</MenuItem>
      </router-link>
      <router-link to="/NBCEnvironmentalIntervention">
        <MenuItem name="5-4">NBC环境干预</MenuItem>
      </router-link>
    </Submenu>
    <Submenu
      v-if="fenzu == 1|| fenzu == 2"
      name="6"
      style="padding: 0 4px;"
      :style="selectNavName==='6'?'color:#000;font-weight:bold':'font-weight:400'"
    >
      <template slot="title">
        <Icon type="ios-stats" />训练管理
      </template>
      <router-link to="/dataManagement">
        <MenuItem name="6-1">基础数据</MenuItem>
      </router-link>
      <router-link to="/dataManagement">
        <MenuItem name="6-2">训练单位</MenuItem>
      </router-link>
      <router-link to="/dataManagement">
        <MenuItem name="6-3">人员信息</MenuItem>
      </router-link>
      <router-link to="/dataManagement">
        <MenuItem name="6-4">训练成绩</MenuItem>
      </router-link>
      <router-link to="/dataManagement">
        <MenuItem name="6-5">训练计划</MenuItem>
      </router-link>
      <router-link to="/dataManagement">
        <MenuItem name="6-6">训练科目</MenuItem>
      </router-link>
      <router-link to="/dataManagement">
        <MenuItem name="6-7">训练想定</MenuItem>
      </router-link>
      <router-link to="/dataManagement">
        <MenuItem name="6-8">历史数据</MenuItem>
      </router-link>
    </Submenu>

    <Submenu
      v-if="fenzu == 1|| fenzu == 2"
      name="7"
      style="padding: 0 4px;"
      :style="selectNavName==='7'?'color:#000;font-weight:bold':'font-weight:400'"
    >
      <template slot="title">
        <Icon type="ios-stats" />训练监控
      </template>
      <MenuItem name="7-1">训练席位监控</MenuItem>
      <router-link to="/operationStatusMonitoring">
        <MenuItem name="7-2">运行状态监控</MenuItem>
      </router-link>
    </Submenu>
    <Submenu
      v-if="fenzu == 2"
      name="8"
      style="padding: 0 4px;"
      :style="selectNavName==='8'?'color:#000;font-weight:bold':'font-weight:400'"
    >
      <template slot="title">
        <Icon type="ios-stats" />训练评估
      </template>
      <MenuItem name="8-1">评估指标管理</MenuItem>
      <MenuItem name="8-2">评估算法管理</MenuItem>
      <router-link to="/assessmentTaskManagement">
        <MenuItem name="8-3">评估任务管理</MenuItem>
      </router-link>
      <router-link to="/assessmentPresentationManagement">
        <MenuItem name="8-4">评估报告管理</MenuItem>
      </router-link>
    </Submenu>
    <router-link to="/missionPlanning">
      <MenuItem
        v-if="fenzu == 3"
        name="9"
        style="padding: 0 4px;"
        :style="selectNavName==='9'?'color:#000;font-weight:bold':'font-weight:400'"
      >
        <Icon type="ios-stats" />任务规划
      </MenuItem>
    </router-link>
    <Submenu
      v-if="fenzu == 2"
      name="10"
      style="padding: 0 4px;"
      :style="selectNavName==='10'?'color:#000;font-weight:bold':'font-weight:400'"
    >
      <template slot="title">
        <Icon type="ios-stats" />战损结果
      </template>
      <router-link to="/listOfWarDamageAndResults">
        <MenuItem name="10-1">战损战果一览</MenuItem>
      </router-link>
      <MenuItem name="10-2">投入兵力详情</MenuItem>
      <MenuItem name="10-3">发射弹药详情</MenuItem>
      <MenuItem name="10-4">损伤兵力详情</MenuItem>
    </Submenu>
    <Submenu
      v-if="fenzu == 2"
      name="11"
      style="padding: 0 4px;"
      :style="selectNavName==='11'?'color:#000;font-weight:bold':'font-weight:400'"
    >
      <template slot="title">
        <Icon type="ios-stats" />互联互通
      </template>
      <MenuItem name="11-1">DDS互联中间件</MenuItem>
      <MenuItem name="11-2">桥接服务</MenuItem>
    
      <MenuItem name="11-3">云端环境地理数据</MenuItem>
     
    </Submenu>
    <router-link to="/operationManagement">
      <MenuItem
        name="12"
        v-if="fenzu == 1"
        style="padding: 0 4px;"
        :style="selectNavName==='12'?'color:#000;font-weight:bold':'font-weight:400'"
      >运行管理</MenuItem>
    </router-link>
  </Menu>
</template>
<script>
export default {
  name: "AllMenu",
  porps: {
    addtable: String,
    required: true
  },
  data: function() {
    return {
      fenzu: this.$store.state.fenzu,
      theme1: "primary",
      selectNavName: "1"
    };
  },
  methods: {
    onMenuSelect: function(name) {
      this.selectNavName = name;
      if (name == "3-1" || name == "3-2") {
        this.selectNavName = "3";
      } else if (
        name == "5-1" ||
        name == "5-2" ||
        name == "5-3" ||
        name == "5-4"
      ) {
        this.selectNavName = "5";
      } else if (
        name == "6-1" ||
        name == "6-2" ||
        name == "6-3" ||
        name == "6-4" ||
        name == "6-5" ||
        name == "6-6" ||
        name == "6-7" ||
        name == "6-8"
      ) {
        this.selectNavName = "6";
      } else if (name == "7-1" || name == "7-2") {
        this.selectNavName = "7";
      } else if (
        name == "8-1" ||
        name == "8-2" ||
        name == "8-3" ||
        name == "8-4"
      ) {
        this.selectNavName = "8";
      } else if (
        name == "10-1" ||
        name == "10-2" ||
        name == "10-3" ||
        name == "10-4"
      ) {
        this.selectNavName = "10";
      } else if (name === "11-1" || name === "11-2"|| name === "11-3") {
        this.selectNavName = "11";
        if(name == "11-3"){
          console.log(ws);
          if(socketOpen&&ws){
            ws.send(cloudData);
          }
            this.$router.push("/cloudData");
        }
      }else if (name === "12" || name === "12-2") {
        this.selectNavName = "12";
      }
    }
  },mounted(){
    console.log(ws);
    
    if(socketOpen&&ws){
      let _this = this;
      ws.onmessage = function(e){
        　　//当客户端收到服务端发来的消息时，触发onmessage事件，参数e.data包含server传递过来的数据
        　　console.log(e.data);
          if(e.data == getCloudData){
            
            _this.$router.push("/cloudData");
          } 
        }
    }
  }
};
</script>


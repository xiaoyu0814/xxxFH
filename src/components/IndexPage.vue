<template>
  <div class="layout">
    <!-- 头部导航 -->
    <!-- <Layout> -->
    <Header class="layout_header">
      <HeaderNav :addTable="fcz" v-on:success="success($event)"></HeaderNav>
    </Header>
    <Content class="content">
      <nav class="nav" v-if="false">
        <ul>
          <li
            v-for="(item,index) in nav_data"
            :key="index"
            @click="nav_index=index"
            :class="nav_index===index?'select':''"
          >
            <router-link :to="item.router">{{item.label}}</router-link>
          </li>
        </ul>
      </nav>
      <div class="add_div">
        <router-view></router-view>
      </div>
    </Content>
    <!-- <Footer class="layout-footer-center">北京航天宏图股份有限公司&copy; TalkingData</Footer> -->
    <!-- </Layout> -->
  </div>
</template>
<script>
//  面包屑导航应该是在每个页面下
import HeaderNav from "@/components/header/HeaderNav";
import Newtable from "@/components/table/table";
import Chart from "@/components/echart/echart";

export default {
  name: "IndexPage",
  data() {
    return {
      addtable: "",
      addechart: "",
      fcz: "1234567",
      nav_index: 0,
      nav_data: [
        {
          label: "数据管理",
          value: "",
          router: "/dataManagement"
        },
        {
          label: "作战编组",
          value: "",
          router: "/operationalOrganization"
        },
        {
          label: "作战部署",
          value: "",
          router: "/operationalDeployment"
        },
        {
          label: "席位分配",
          value: "",
          router: "/seatAllocation"
        },
        {
          label: "任务规划",
          value: "",
          router: "/"
        },
        {
          label: "环境部署",
          value: "",
          router: "/"
        },
        {
          label: "状态监控",
          value: "",
          router: "/"
        },
        {
          label: "态势显示",
          value: "",
          router: "/situationDisplay"
        },
        {
          label: "导控干预",
          value: "",
          router: "/"
        },
        {
          label: "评估统计",
          value: "",
          router: "/"
        }
      ]
    };
  },

  components: {
    HeaderNav: HeaderNav,
    Newtable: Newtable,
    Chart: Chart
  },
  computed: {},
  methods: {
    success(res) {
      //console.log(res);
      if (res) {
        if (res == "Chart") {
          this.addechart = res;
        } else if (res == "Newtable") {
          this.addtable = res;
        } else if (res == "delt") {
          this.addtable = "";
        } else if (res == "dele") {
          this.addechart = "";
        }
      } else {
        this.addtable = "";
        this.addechart = "";
      }
    }
  }
};
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
}
.layout_header {
  width: 100%;
  padding: 0px;
  height: auto;
  line-height: auto;
  position: relative;
  z-index: 9999;
}
.content {
  display: flex;
  height: calc(100% - 60px);
}
.nav {
  width: 200px;
}
.nav ul {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.nav ul li {
  height: 100%;
  border: 1px solid #ccc;
  font-size: 16px;
}
.nav ul li a {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  width: 100%;
  height: 100%;
}
.nav ul .select a {
  color: #fff;
  background-color: #2d8cf0;
  border: #2530f8;
}
.add_div {
  flex-grow: 1;
  /* padding: 15px; */
}
.layout-footer-center {
  text-align: center;
}
</style>


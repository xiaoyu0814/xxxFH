<template>
  <Layout>
    <i-header class="layout-header-bar iview_header">
      <div>
        <div class="iview_header_inner">
          <img src="../../assets/logo1.png" alt style="height:80%"/>
        </div>
        <span v-if="$store.state.fenzu==1" style="letter-spacing:2px">FH模拟训练公共平台：仿真运行管理</span>
        <span v-if="$store.state.fenzu==2" style="letter-spacing:2px">导调控制</span>
        <span v-if="$store.state.fenzu==3" style="letter-spacing:2px">FH模拟训练公共平台：洗消作业</span>
      </div>
      <!-- 这个线应该是用伪类做的 -->
      <!-- <b class="iview_scoreline"></b> -->
      <AllMenu v-bind:addtable="addtable1" v-on:success="success($event)"></AllMenu>
    </i-header>
  </Layout>
</template>
<script>
import AllMenu from "@/components/Menu/menu";
export default {
  name: "HeaderNav",
  props: ["addTable"],
  data: function() {
    return {
      name: "zs",
      addtable1: "1234"
    };
  },
  created() {
    this.addtable1 = this.addTable; //初始化时候的赋值
    console.log(this.addtable1);
  },
  methods: {
    success(res) {
      //console.log(this.addtable1);
      this.$emit("success", res);
    }
  },
  components: {
    AllMenu
  }
};
</script>
<style scoped>
.iview_header {
  font-size: 18px;
  color: #fff;
  font-weight: bold;
}
.iview_header>div{
  display: flex;
  align-items: center;
  height: 100%;
}
</style>

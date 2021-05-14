<template>
  <div id="openDrillPlan">
    <Modal v-model="$store.state.openDrillPlan_dialog" title="打开演习方案" width="310" @on-ok="ok" @on-cancel="cancel">
      <div class="content">
        <span>选择演习方案</span>
        <Select v-model="drillPlans" style="width:200px">
          <Option v-for="item in drillPlan" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div slot="footer" class="footer">
        <Button type="primary" @click="load">确定</Button>
        <Button type="error" @click="cancel">退出</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drillPlans: "",
      drillPlan: [
        {
          label: "标准编成",
          value: "标准编成"
        },
        {
          label: "测试20140414",
          value: "测试20140414"
        },
        {
          label: "测试模型",
          value: "测试模型"
        },
        {
          label: "地空导弹规避实验",
          value: "地空导弹规避实验"
        },
        {
          label: "钓鱼岛-0709-2",
          value: "钓鱼岛-0709-2"
        },
        {
          label: "演习test",
          value: "演习test"
        }
      ]
    };
  },
  watch: {},
  methods: {
    ok() {
      this.$store.state.openDrillPlan_dialog = false;
    },
    cancel() {
      this.$store.state.openDrillPlan_dialog = false;
    },
    load() {}
  },
  mounted() {}
};
</script>

<style scoped>
#openDrillPlan {
}
.footer {
  display: flex;
  justify-content: space-evenly;
}
</style>
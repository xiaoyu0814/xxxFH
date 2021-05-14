<template>
  <div id="displayControl">
    <Modal
      v-model="$store.state.displayControl_dialog"
      title="加载想定"
      width="40%"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <div class="content">
        <div class="content_tree">
          <div>
            <span>兵力显示控制,勾选可见</span>
            <div class="tree_box">
              <Tree :data="leftTree_data" show-checkbox></Tree>
            </div>
          </div>
          <div>
            <span>指挥员</span>
            <div class="tree_box">
              <Tree :data="rightTree_data" show-checkbox></Tree>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="footer">
        <Button type="primary" @click="load">发送</Button>
        <Button type="error" @click="cancel">退出</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leftTree_data: [
        {
          title: "红方",
          expand: true
        },
        {
          title: "蓝方",
          expand: true
        }
      ],
      rightTree_data: [
        {
          title: "红方总指挥",
          expand: true
        },
        {
          title: "蓝方总指挥",
          expand: true
        }
      ]
    };
  },
  watch: {},
  methods: {
    ok() {
      this.$store.state.displayControl_dialog = false;
    },
    cancel() {
      this.$store.state.displayControl_dialog = false;
    },
    load() {}
  },
  mounted() {}
};
</script>

<style scoped>
#displayControl {
}
.content_tree {
  display: flex;
  justify-content: space-between;
}
.content_tree > div {
  margin: 0 10px;
  width: 100%;
}
.tree_box {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 10px;
  min-height: 400px;
  width: 100%;
}
</style>
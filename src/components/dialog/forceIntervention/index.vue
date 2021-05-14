<template>
  <div id="forceIntervention">
    <Modal
      v-model="$store.state.forceIntervention_dialog"
      title="兵力干预"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <div class="content">
        <Checkbox v-model="single">允许对方可见诱导信息</Checkbox>
        <div class="tree_box">
          <Tree :data="tree_data" show-checkbox></Tree>
        </div>
        <span>本次诱导描述信息：</span>
        <div>
          <Input
            v-model="inducementInformation"
            type="textarea"
            :autosize="{minRows: 2}"
            placeholder="请输入..."
          />
        </div>
      </div>
      <div slot="footer" class="footer">
        <Button type="primary" @click="load">投入</Button>
        <Button type="primary" @click="load">消亡</Button>
        <Button type="primary" @click="load">复活</Button>
        <Button type="error" @click="cancel">退出</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      single: false,
      tree_data: [
        {
          title: "红方",
          expand: true,
          children: [
            {
              title: "战斗兵力",
              expand: true
            },
            {
              title: "后备兵力",
              expand: true
            }
          ]
        },
        {
          title: "蓝方",
          expand: true,
          children: [
            {
              title: "战斗兵力",
              expand: true
            },
            {
              title: "后备兵力",
              expand: true
            }
          ]
        }
      ],
      inducementInformation: ""
    };
  },
  watch: {},
  methods: {
    ok() {
      this.$store.state.forceIntervention_dialog = false;
    },
    cancel() {
      this.$store.state.forceIntervention_dialog = false;
    },
    load() {}
  },
  mounted() {}
};
</script>

<style scoped>
#forceIntervention {
}
.tree_box {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 10px;
  margin: 10px 0;
  min-height: 300px;
}
.footer {
  display: flex;
  justify-content: space-evenly;
}
</style>
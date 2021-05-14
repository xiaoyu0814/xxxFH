<template>
  <div id="loadScenario">
    <Modal
      v-model="$store.state.loadScenario_dialog"
      title="加载想定"
      width="50%"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <div class="content">
        <div style="display:flex;align-items: center;">
          <span style="width:160px">请输入想定检索信息：</span>
          <Input v-model="value" placeholder="请输入..." style="flex-grow: 1;" />
          <Button type="primary" @click="load" style="width:70px;margin-left:10px">检索</Button>
        </div>
        <div style="margin-top:15px">
          <Table border max-height="400" :columns="table_header" :data="table_data"></Table>
        </div>
      </div>
      <div slot="footer" class="footer">
        <div>
          <span>描述信息：</span>
          <Input v-model="value" placeholder="请输入..." style="width: 200px" />
        </div>
        <div>
          <Button type="primary" @click="load">加载</Button>
          <Button type="error" @click="cancel">退出</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      table_header: [
        {
          title: "想定名称",
          key: "name",
          width: "100"
        },
        {
          title: "想定描述",
          key: "describe"
        },
        {
          title: "想定ID",
          key: "id"
        },
        {
          title: "地图名称",
          key: "mapName",
          width: "150"
        },
        {
          title: "创建者ID",
          key: "creatorID",
          width: "100"
        },
        {
          title: "开始时间",
          key: "startTime",
          width: "150"
        }
      ],
      table_data: [
        {
          name: "John Brown",
          describe: "New York No. 1 Lake Park",
          id: 18,
          mapName: "PIE_image",
          creatorID: 50,
          startTime: "2016-10-03"
        }
      ]
    };
  },
  watch: {},
  methods: {
    ok() {
      this.$store.state.loadScenario_dialog = false;
    },
    cancel() {
      this.$store.state.loadScenario_dialog = false;
    },
    load() {}
  },
  mounted() {}
};
</script>

<style scoped>
#loadScenario {
}
.footer {
  display: flex;
  justify-content: space-between;
}
</style>
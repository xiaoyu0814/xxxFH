<template>
  <div id="listOfWarDamageAndResults">
    <div class="dataBase">
      <Table
        size="small"
        border
        stripe
        highlight-row
        :height="table_height"
        :columns="dataBase_tableHeader"
        :data="dataBase_tabledata"
        style="height:110px"
        @on-row-click="selectData"
      >
        <template slot-scope="{ row, index }" slot="operation">
          <div style="font-size:24px;color:#2d8cf0">
            <Tooltip content="预览" placement="top">
              <Icon type="ios-eye-outline" style="cursor: pointer;" />
            </Tooltip>
            <Tooltip content="编辑" placement="top">
              <Icon type="ios-create-outline" style="cursor: pointer;" />
            </Tooltip>
            <Tooltip content="删除" placement="top">
              <Icon type="ios-close-circle-outline" style="cursor: pointer;" />
            </Tooltip>
            <Tooltip content="下载" placement="top">
              <Icon type="ios-cloud-download-outline" style="cursor: pointer;" />
            </Tooltip>
          </div>
        </template>
      </Table>
    </div>
    <div class="chart_box">
      <div id="chart1" @click="openTable('1')"></div>
      <div id="chart2" @click="openTable('2')"></div>
      <div id="chart3" @click="openTable('3')"></div>
    </div>
    <div class="table_box">
      <Collapse v-model="collapse_value">
        <Panel>
          <span style="font-size:14px;font-weight: bold;">{{title}}</span>
          <div slot="content" class="attribute">
            <Table
              border
              stripe
              highlight-row
              :height="table_height"
              :columns="tableHeader"
              :data="table_data"
              style="height:calc(100% - 70px)"
            >
              <template slot-scope="{ row, index }" slot="operation">
                <div style="font-size:24px;color:#2d8cf0">
                  <Tooltip content="预览" placement="top">
                    <Icon type="ios-eye-outline" style="cursor: pointer;" />
                  </Tooltip>
                  <Tooltip content="编辑" placement="top">
                    <Icon type="ios-create-outline" style="cursor: pointer;" />
                  </Tooltip>
                  <Tooltip content="删除" placement="top">
                    <Icon type="ios-close-circle-outline" style="cursor: pointer;" />
                  </Tooltip>
                  <Tooltip content="下载" placement="top">
                    <Icon type="ios-cloud-download-outline" style="cursor: pointer;" />
                  </Tooltip>
                </div>
              </template>
            </Table>
            <Page :total="12" :page-size="20" show-total style="padding:20px 0" />
          </div>
        </Panel>
      </Collapse>
    </div>
  </div>
</template>

<script>
import listOfWarDamageAndResults_data from "@/config/listOfWarDamageAndResults_data";
export default {
  data() {
    return {
      collapse_value: [],
      title: "",
      dataBase_tableHeader: listOfWarDamageAndResults_data.tableHeader,
      dataBase_tabledata: listOfWarDamageAndResults_data.table_data,
      tableHeader: [],
      table_data: [],
      chart1: "",
      option1: listOfWarDamageAndResults_data.chart1,
      chart2: "",
      option2: listOfWarDamageAndResults_data.chart2,
      chart3: "",
      option3: listOfWarDamageAndResults_data.chart3,
      index: "",
      name: ""
    };
  },
  methods: {
    openTable(name) {
      this.name = name;
      this.collapse_value = [];
      this.collapse_value.push(0);
      // this.option1.backgroundColor = "#2c343c";
      this.option1.backgroundColor = "#000";
      this.option2.backgroundColor = "#000";
      this.option3.backgroundColor = "#000";
      switch (name) {
        case "1":
          this.title = "具体投入兵力数据";
          this.option1.backgroundColor = "#4c4c4c";
          this.tableHeader = listOfWarDamageAndResults_data.tableHeader1;
          this.table_data =
            listOfWarDamageAndResults_data.table_data1[this.index];
          break;
        case "2":
          this.title = "具体发射弹药数据";
          this.option2.backgroundColor = "#4c4c4c";
          this.tableHeader = listOfWarDamageAndResults_data.tableHeader2;
          this.table_data =
            listOfWarDamageAndResults_data.table_data2[this.index];
          break;
        case "3":
          this.title = "具体损伤兵力数据";
          this.option3.backgroundColor = "#4c4c4c";
          this.tableHeader = listOfWarDamageAndResults_data.tableHeader3;
          this.table_data =
            listOfWarDamageAndResults_data.table_data3[this.index];
          break;
        default:
          break;
      }
      this.chart1.setOption(this.option1);
      this.chart2.setOption(this.option2);
      this.chart3.setOption(this.option3);
    },
    selectData(item, index) {
      this.index = index;
      this.option1 = listOfWarDamageAndResults_data.chart1[index];
      this.option2 = listOfWarDamageAndResults_data.chart2[index];
      this.option3 = listOfWarDamageAndResults_data.chart3[index];
      this.chart1 = this.$echarts.init(document.getElementById("chart1"));
      this.chart1.setOption(this.option1);
      this.chart2 = this.$echarts.init(document.getElementById("chart2"));
      this.chart2.setOption(this.option2);
      this.chart3 = this.$echarts.init(document.getElementById("chart3"));
      this.chart3.setOption(this.option3);
      switch (this.name) {
        case "1":
          this.title = "具体投入兵力数据";
          this.option1.backgroundColor = "#4c4c4c";
          this.tableHeader = listOfWarDamageAndResults_data.tableHeader1;
          this.table_data =
            listOfWarDamageAndResults_data.table_data1[index];
          break;
        case "2":
          this.title = "具体使用装备数据";
          this.option2.backgroundColor = "#4c4c4c";
          this.tableHeader = listOfWarDamageAndResults_data.tableHeader2;
          this.table_data =
            listOfWarDamageAndResults_data.table_data2[index];
          break;
        case "3":
          this.title = "具体损伤兵力数据";
          this.option3.backgroundColor = "#4c4c4c";
          this.tableHeader = listOfWarDamageAndResults_data.tableHeader3;
          this.table_data =
            listOfWarDamageAndResults_data.table_data3[index];
          break;
        default:
          break;
      }
    },
    init() {
      this.chart1 = this.$echarts.init(document.getElementById("chart1"));
      this.chart1.setOption(this.option1);
      this.chart2 = this.$echarts.init(document.getElementById("chart2"));
      this.chart2.setOption(this.option2);
      this.chart3 = this.$echarts.init(document.getElementById("chart3"));
      this.chart3.setOption(this.option3);
    }
  },
  mounted() {
    // this.init();
    this.selectData(this.dataBase_tabledata[0],0)
  }
};
</script>

<style scoped>
#listOfWarDamageAndResults {
  width: 100%;
  height: 100%;
  padding: 15px;
  position: relative;
}
.dataBase {
  /* height: 20%; */
}
.chart_box {
  display: flex;
  height: 50%;
}
.chart_box > div {
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
  margin: 20px;
}
.table_box {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
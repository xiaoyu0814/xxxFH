<template>
  <div id="assessmentTaskManagement">
    <!-- <div id="map2d"></div> -->
    <header>
      <div class="topLeft_box">
        <span style="color:#000">时间范围:</span>
        <DatePicker type="date" placeholder="开始时间" style="width: 200px"></DatePicker>
        <span>-</span>
        <DatePicker type="date" placeholder="结束时间" style="width: 200px"></DatePicker>
        <Button type="primary" @click="button_index=index">查询</Button>
      </div>
      <div class="topRight_box">
        <Button type="primary" @click="addTask_modal=true">添加</Button>
        <Button type="primary" @click="button_index=index">批量添加</Button>
        <Button type="primary" @click="implement">执行</Button>
        <Button type="primary" @click="button_index=index">批量执行</Button>
      </div>
    </header>
    <div class="bottom_box">
      <Table
        border
        stripe
        highlight-row
        :height="table_height"
        :columns="tableHeader"
        :data="table_data"
        style="height:calc(100% - 70px)"
        @on-row-click="table_row_click"
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
    <Modal v-model="addTask_modal" title="添加任务" @on-ok="ok">
      <div class="addTask_box">
        <table>
          <tr>
            <td>创建日期</td>
            <td>
              <DatePicker
                v-model="addTask_value.time"
                format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择..."
              ></DatePicker>
            </td>
          </tr>
          <tr>
            <td>任务名称</td>
            <td>
              <Input v-model="addTask_value.name" placeholder="请输入..." />
            </td>
          </tr>
          <tr>
            <td>任务类型</td>
            <td>
              <Input v-model="addTask_value.type" placeholder="请输入..." />
            </td>
          </tr>
          <tr>
            <td>任务来源</td>
            <td>
              <Input v-model="addTask_value.source" placeholder="请输入..." />
            </td>
          </tr>
          <tr>
            <td>评估算法</td>
            <td>
              <Select v-model="algorithm">
                <Option
                  v-for="item in algorithm_list"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </td>
          </tr>
          <tr>
            <td>权重计算方法</td>
            <td>
              <Select v-model="weightCalculation">
                <Option
                  v-for="item in weightCalculation_list"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </td>
          </tr>
          <tr>
            <td>简介</td>
            <td>
              <Input
                v-model="addTask_value.synopsis"
                type="textarea"
                :autosize="{minRows: 3}"
                placeholder="请输入..."
              />
            </td>
          </tr>
        </table>
      </div>
    </Modal>
  </div>
</template>

<script>
import assessmentTaskManagement_data from "@/config/assessmentTaskManagement_data";
import { formatDateTime } from "@/utils/utils";
export default {
  data() {
    return {
      table_height: "",
      addTask_modal: false,
      data: "",
      collapse_value: [],
      tableHeader: assessmentTaskManagement_data.tableHeader,
      table_data: assessmentTaskManagement_data.table_data,
      addTask_value: {
        time: "",
        name: "",
        type: "",
        source: "",
        synopsis: ""
      },
      // 模糊综合法、数据包络法、ADC法、因子分析法、支持向量机
      algorithm_list: [
        {
          label: "模糊综合法",
          value: "模糊综合法"
        },
        {
          label: "数据包络法",
          value: "数据包络法"
        },
        {
          label: "ADC法",
          value: "ADC法"
        },
        {
          label: "因子分析法",
          value: "因子分析法"
        },
        {
          label: "支持向量机",
          value: "支持向量机"
        }
      ],
      // 层次分析、环比系数、离差最大化、熵权法
      weightCalculation_list: [
        {
          label: "层次分析",
          value: "层次分析"
        },
        {
          label: "环比系数",
          value: "环比系数"
        },
        {
          label: "离差最大化",
          value: "离差最大化"
        },
        {
          label: "熵权法",
          value: "熵权法"
        }
      ]
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
          self.table_height =
            document.getElementById("bottom_left").clientHeight - 70;
          console.log(self.table_height);
          self.timer = false;
        }, 400);
      }
    }
  },
  methods: {
    implement() {
      // this.tableRowData.executionStatus = "执行中";

      this.table_data[this.tableIndex].executionStatus = "执行中";
      console.log(this.table_data[this.tableIndex]);
    },
    table_row_click(item, index) {
      this.tableRowData = item;
      this.tableIndex = index;
      console.log(this.tableRowData);
    },
    ok() {
      var temp = {
        name: this.addTask_value.name,
        type: this.addTask_value.type,
        createTime: formatDateTime(this.addTask_value.time),
        source: this.addTask_value.source,
        synopsis: this.addTask_value.synopsis,
        executionStatus: "待执行"
      };
      this.table_data.push(temp);
    }
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        self.screenWidth = window.screenWidth;
      })();
    };
    window.screenWidth = document.body.clientWidth;
    self.screenWidth = window.screenWidth;
  }
};
</script>

<style scoped>
#assessmentTaskManagement {
  width: 100%;
  height: 100%;
  padding: 15px;
  /* position: relative; */
  display: flex;
  flex-direction: column;
}
header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
}
/* #map2d {
  position: absolute;
  width: 100%;
  height: 100%;
} */
.topLeft_box {
  /* position: absolute;
  top: 5px;
  left: 5px; */
}
.topRight_box {
  /* position: absolute;
  top: 5px;
  right: 5px; */
}
.bottom_box {
  /* position: absolute;
  bottom: 0;
  left: 0;
  right: 0; */
  flex-grow: 1;
}
.addTask_box table {
  width: 100%;
  border-collapse: collapse;
}
.addTask_box table td {
  border: 1px solid #ccc;
  padding: 10px;
  width: 70%;
}
.addTask_box table td:nth-child(odd) {
  text-align: right;
  font-size: 14px;
  font-weight: bold;
  background-color: #f1f1f1;
  width: 20%;
}
</style>
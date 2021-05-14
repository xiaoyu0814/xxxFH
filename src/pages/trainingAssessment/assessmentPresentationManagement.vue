<template>
  <div id="assessmentPresentationManagement">
    <!-- <div id="map2d"></div> -->
    <header>
      <div class="topLeft_box">
        <span style="color:#000">制作时间:</span>
        <DatePicker type="date" placeholder="开始时间" style="width: 120px"></DatePicker>
        <span>-</span>
        <DatePicker type="date" placeholder="结束时间" style="width: 120px"></DatePicker>
        <span>期号:</span>
        <Input v-model="issueNo" placeholder="请输入..." style="width: 120px" />
        <span>制作人:</span>
        <Input v-model="producer" placeholder="请输入..." style="width: 120px" />
        <span>产品名称:</span>
        <Input v-model="productName" placeholder="请输入..." style="width: 120px" />
        <Button type="primary" @click="button_index=index">查询</Button>
      </div>
      <div class="topRight_box">
        <Button type="primary" @click="addTask_modal=true">添加</Button>
        <Button type="primary" @click="button_index=index">批量添加</Button>
        <Button type="primary" @click="button_index=index">批量下载</Button>
        <Button type="primary" @click="button_index=index">批量删除</Button>
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
      >
        <template slot-scope="{ row, index }" slot="operation">
          <div style="font-size:24px;color:#2d8cf0" @click="changeStatus(row)">
            <Tooltip content="预览" placement="top">
              <a target="_black" :href="row.openUrl">
                <Icon type="ios-eye-outline" style="cursor: pointer;" />
              </a>
            </Tooltip>
            <Tooltip content="编辑" placement="top">
              <Icon type="ios-create-outline" style="cursor: pointer;" />
            </Tooltip>
            <Tooltip content="删除" placement="top">
              <Icon type="ios-close-circle-outline" style="cursor: pointer;" />
            </Tooltip>
            <Tooltip content="下载" placement="top">
              <a target="_black" :href="row.openUrl" download="评估报告">
                <Icon type="ios-cloud-download-outline" style="cursor: pointer;" />
              </a>
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
                v-model="addTask_value.productionTime"
                format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择..."
              ></DatePicker>
            </td>
          </tr>
          <tr>
            <td>产品名称</td>
            <td>
              <Input v-model="addTask_value.name" placeholder="请输入..." />
            </td>
          </tr>
          <tr>
            <td>产品类型</td>
            <td>
              <Input v-model="addTask_value.issueNo" placeholder="请输入..." />
            </td>
          </tr>
          <tr>
            <td>产品类型</td>
            <td>
              <Input v-model="addTask_value.type" placeholder="请输入..." />
            </td>
          </tr>
          <tr>
            <td>制作人</td>
            <td>
              <Input v-model="addTask_value.producer" placeholder="请输入..." />
            </td>
          </tr>
          <tr>
            <td>审核人</td>
            <td>
              <Input v-model="addTask_value.reviewedBy" placeholder="请输入..." />
            </td>
          </tr>
          <tr>
            <td>签发人</td>
            <td>
              <Input v-model="addTask_value.Issuer" placeholder="请输入..." />
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
import assessmentPresentationManagement_data from "@/config/assessmentPresentationManagement_data";
import { formatDateTime } from "@/utils/utils";
export default {
  data() {
    return {
      table_height: "",
      addTask_modal: false,
      collapse_value: [],
      tableHeader: assessmentPresentationManagement_data.tableHeader,
      table_data: assessmentPresentationManagement_data.table_data,
      issueNo: "",
      producer: "",
      productName: "",
      addTask_value: {
        name: "",
        issueNo: "",
        type: "",
        producer: "",
        productionTime: "",
        reviewedBy: "",
        Issuer: "",
        synopsis: ""
      }
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
    changeStatus(item){
      item.readingStatus = "已读"
    },
    table_row_click(item, index) {
      this.tableRowData = item;
      this.tableIndex = index;
      console.log(this.tableRowData);
    },
    ok() {
      var temp = {
        name: this.addTask_value.name,
        issueNo: this.addTask_value.issueNo,
        type: this.addTask_value.type,
        producer: this.addTask_value.producer,
        productionTime: formatDateTime(this.addTask_value.productionTime),
        reviewedBy: this.addTask_value.reviewedBy,
        Issuer: this.addTask_value.Issuer,
        productFormat: "PDF",
        readingStatus: "未读",
        synopsis: this.addTask_value.synopsis
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
#assessmentPresentationManagement {
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
.bottom_box {
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
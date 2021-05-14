const assessmentTaskManagement_data = {
  tableHeader: [{
      type: "selection",
      width: 50,
      align: "center"
    },
    {
      title: "序号",
      type: 'index',
      width: 65,
      align: 'center'
    },
    {
      title: "创建日期",
      key: "createTime",
      align: "center"
    },
    {
      title: "任务名称",
      key: "name",
      align: "center"
    },
    {
      title: "任务类型",
      key: "type",
      align: "center"
    },
    {
      title: "任务来源",
      key: "source",
      align: "center"
    },
    {
      title: "简介",
      key: "synopsis",
      align: "center"
    },
    {
      title: "执行状态",
      key: "executionStatus",
      align: "center"
    },
    {
      title: "操作",
      slot: "operation",
      align: "center"
    }
  ],
  table_data: [{
      name: "XXX化工场发生化学物品泄露",
      type: "洗消任务",
      createTime: "2016-6-17 18:45:00",
      source: "导致该工厂区域周边范围发生化学污染",
      synopsis: "我XXX防化团1营于当日20时开始对该区域进行洗消作业，顺利完成相关任务",
      executionStatus: "任务完成"
    },
    {
      name: "XXX地区XXX国道交通事故",
      type: "洗消任务",
      createTime: "2016-6-18 17:35:00",
      source: "装载化学物品的罐装车发生交通事故，导致灌装氯氰泄露",
      synopsis: "我XXX防化中队紧急出动，并顺利完成相关任务",
      executionStatus: "任务完成"
    },
    {
      name: "XXX地区XXX化工厂火灾事件",
      type: "洗消任务",
      createTime: "2016-6-18 21:20:00",
      source: "导致厂区内化学物品存储仓库区域可能发生化学物品泄露风险XXXXX",
      synopsis: "我XXX防化中队紧急出动，并顺利完成相关任务",
      executionStatus: "任务完成"
    }
  ],
}

export default assessmentTaskManagement_data

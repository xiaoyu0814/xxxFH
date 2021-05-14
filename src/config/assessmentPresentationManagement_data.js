const assessmentPresentationManagement_data = {
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
      title: "产品名称",
      key: "name",
      align: "center"
    },
    {
      title: "产品期号",
      key: "issueNo",
      align: "center"
    },
    {
      title: "产品类型",
      key: "type",
      align: "center"
    },
    {
      title: "制作人",
      key: "producer",
      align: "center"
    },
    {
      title: "制作时间",
      key: "productionTime",
      align: "center"
    },
    {
      title: "审核人",
      key: "reviewedBy",
      align: "center"
    },
    {
      title: "签发人",
      key: "Issuer",
      align: "center"
    },
    {
      title: "产品格式",
      key: "productFormat",
      align: "center"
    },
    {
      title: "阅读状态",
      key: "readingStatus",
      align: "center"
    },
    {
      title: "简介",
      key: "synopsis",
      align: "center"
    },
    {
      title: "操作",
      slot: "operation",
      align: "center"
    }
  ],
  table_data: [{
    name: "HB损伤评估报告",
    issueNo: "001",
    type: "专题报告",
    producer: "张三",
    productionTime: "2016-10-03 00:00:00",
    reviewedBy: "李四",
    Issuer: "王五",
    productFormat:"PDF",
    readingStatus: "已读",
    synopsis: "评估报告",
    openUrl:"static/HB损伤评估报告.pdf",
  },{
    name: "化学泄露事件损伤评估报告",
    issueNo: "002",
    type: "专题报告",
    producer: "王三",
    productionTime: "2016-12-03 00:00:00",
    reviewedBy: "丁四",
    Issuer: "赵五",
    productFormat:"PDF",
    readingStatus: "已读",
    synopsis: "评估报告",
    openUrl:"static/化学泄露事件损伤评估报告.pdf",
  }],
}

export default assessmentPresentationManagement_data

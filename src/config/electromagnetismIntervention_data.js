const electromagnetismIntervention_data = {
  tableHeader: [{
      title: "区域编号",
      key: "number",
      align: "center",
      width: 100
    },
    {
      title: "区域描述",
      key: "describe",
      // align: "center"
    },
    {
      title: "NBC强度",
      key: "strength",
      align: "center",
      width: 100
    }
  ],
  table_data: [
    {"number":"1","describe":"距爆心投影点10km处光冲量为：532576.1（J/m2）造成的人员损伤为：皮肤三度烧伤、角膜烧伤，载重汽车破坏、通信设备破坏","strength":"1级","lon":"78.7","lat":"35.8","height":"2000m"},
    {"number":"2","describe":"距爆心投影点15km处光冲量为：197056.4（J/m2）造成的人员损伤为：皮肤一度烧伤、角膜烧伤，载重汽车破坏","strength":"2级","lon":"78.7","lat":"35.8","height":"2000m"},
    {"number":"3","describe":"距爆心投影点20km处光冲量为：94644.8（J/m2） 造成的人员损伤为：无人员受伤，汽车坐垫、靠背、方向盘烧损","strength":"3级","lon":"78.7","lat":"35.8","height":"2000m"},
  ],
  tableHeader2: [{
      title: "序号",
      type: "index",
      align: "center",
    },
    {
      title: "经度",
      key: "lon",
      align: "center"
    },
    {
      title: "纬度",
      key: "lat",
      align: "center"
    },
    {
      title: "高度",
      key: "height",
      align: "center",
    },
  ],
  // table_data2: [],

}

export default electromagnetismIntervention_data

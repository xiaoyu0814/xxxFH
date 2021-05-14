const dataManagement_data = {
  button_data: [{
      label: "兵力数据",
      value: "兵力数据"
    },
    {
      label: "攻击目标数据",
      value: "攻击目标数据"
    },
    {
      label: "装备性能数据",
      value: "装备性能数据"
    },
    {
      label: "兵要地志数据",
      value: "兵要地志数据"
    },
    {
      label: "气象数据",
      value: "气象数据"
    },
    {
      label: "基本态势数据",
      value: "基本态势数据"
    }
  ],
  tableHeader: [{
      type: "selection",
      width: 50,
      align: "center"
    },
    {
      title: "序号",
      type: 'index',
      width: 65,
      align: "center"
    },
    {
      title: "装备名称",
      key: "name",
      align: "center",
      width: 200,
    },
    {
      title: "装备类型",
      key: "type",
      align: "center"
    },
    {
      title: "军种",
      key: "services",
      align: "center"
    },
    {
      title: "兵种",
      key: "Arms",
      align: "center"
    },
    {
      title: "数据上传时间",
      key: "createTime",
      align: "center"
    },
    {
      title: "数据状态",
      key: "dataType",
      align: "center"
    },
    {
      title: "简介",
      slot: "operation",
      align: "center",
      width: 200,
    }
  ],
  table_data: [{
      name: "陆军方舱式通用指挥车",
      type: "车载装备",
      createTime: "2016-10-03",
      dataType: "使用中",
      synopsis: "要求能操作",
      services:"陆军",
      Arms:"防化兵",
    },
    {
      name: "陆军轻型营指挥车",
      type: "车载装备",
      createTime: "2016-10-03",
      dataType: "使用中",
      synopsis: "要求能操作",
      services:"陆军",
      Arms:"防化兵",
    },
    {
      name: "核生化综合信息车",
      type: "车载装备",
      createTime: "2016-10-03",
      dataType: "使用中",
      synopsis: "要求能操作",
      services:"陆军",
      Arms:"防化兵",
    },
    {
      name: "轻型防化侦察车",
      type: "车载装备",
      createTime: "2016-10-03",
      dataType: "使用中",
      synopsis: "要求能操作",
      services:"陆军",
      Arms:"防化兵",
    },
    {
      name: "红外毒剂遥测车",
      type: "车载装备",
      createTime: "2016-10-03",
      dataType: "使用中",
      synopsis: "要求能操作",
      services:"陆军",
      Arms:"防化兵",
    },
    {
      name: "辐射仪",
      type: "便携装备",
      createTime: "2016-10-03",
      dataType: "使用中",
      synopsis: "要求能操作",
      services:"陆军",
      Arms:"防化兵",
    },
    {
      name: "化验箱",
      type: "便携装备",
      createTime: "2016-10-03",
      dataType: "使用中",
      synopsis: "要求能操作",
      services:"陆军",
      Arms:"防化兵",
    },
    {
      name: "防护服",
      type: "便携装备",
      createTime: "2016-10-03",
      dataType: "使用中",
      synopsis: "要求能操作",
      services:"陆军",
      Arms:"防化兵",
    },
    {
      name: "喷洒车",
      type: "车载装备",
      createTime: "2016-10-03",
      dataType: "使用中",
      synopsis: "要求能操作",
      services:"陆军",
      Arms:"防化兵",
    },
    {
      name: "洗消器",
      type: "便携装备",
      createTime: "2016-10-03",
      dataType: "使用中",
      synopsis: "要求能操作",
      services:"陆军",
      Arms:"防化兵",
    },
    {
      name: "兵器消毒盒",
      type: "便携装备",
      createTime: "2016-10-03",
      dataType: "使用中",
      synopsis: "要求能操作",
      services:"陆军",
      Arms:"防化兵",
    },
    {
      name: "喷火器",
      type: "便携装备",
      createTime: "2016-10-03",
      dataType: "使用中",
      synopsis: "要求能操作",
      services:"陆军",
      Arms:"防化兵",
    }
  ],
  combatOrganization_data: [{
    title: "parent 1",
    expand: true,
    children: [{
        title: "parent 1-1",
        expand: true,
        children: [{
            title: "leaf 1-1-1"
          },
          {
            title: "leaf 1-1-2"
          }
        ]
      },
      {
        title: "parent 1-2",
        expand: true,
        children: [{
            title: "leaf 1-2-1"
          },
          {
            title: "leaf 1-2-1"
          }
        ]
      }
    ]
  }],
  combatCompilation_data: [{
    title: "parent 1",
    expand: true,
    render: (h, {
      root,
      node,
      data
    }) => {
      return h(
        "span", {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h("span", [h("span", data.title)]),
          h("span", {
            style: {
              display: "inline-block",
              float: "right",
              marginRight: "32px"
            }
          })
        ]
      );
    },
    children: [{
        title: "child 1-1",
        expand: true,
        children: [{
            title: "leaf 1-1-1",
            expand: true
          },
          {
            title: "leaf 1-1-2",
            expand: true
          }
        ]
      },
      {
        title: "child 1-2",
        expand: true,
        children: [{
            title: "leaf 1-2-1",
            expand: true
          },
          {
            title: "leaf 1-2-1",
            expand: true
          }
        ]
      }
    ]
  }],

}

export default dataManagement_data

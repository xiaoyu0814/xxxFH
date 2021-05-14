const intervene_data = {
    button_data: [{
        label: "兵力干预",
        value: "兵力干预"
      },
      {
        label: "环境干预",
        value: "环境干预"
      },
    ],
    tableHeader: [{
        type: "selection",
        width: 50,
        align: "center"
      },
      {
        title: "装备名称",
        key: "name",
        align: "center"
      },
      {
        title: "装备类型",
        key: "type",
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
        title: "要求",
        key: "synopsis",
        align: "center"
      },
      {
        title: "操作",
        key: "operation",
        align: "center"
      }
    ],
    table_data: [{
        name: "陆军方舱式通用指挥车",
        type: "车载装备",
        createTime: "2016-10-03",
        dataType: "使用中",
        synopsis: "要求能操作",
      },
      {
        name: "陆军轻型营指挥车",
        type: "车载装备",
        createTime: "2016-10-03",
        dataType: "使用中",
        synopsis: "要求能操作",
      },
      {
        name: "核生化综合信息车",
        type: "车载装备",
        createTime: "2016-10-03",
        dataType: "使用中",
        synopsis: "要求能操作",
      },
      {
        name: "轻型防化侦察车",
        type: "车载装备",
        createTime: "2016-10-03",
        dataType: "使用中",
        synopsis: "要求能操作",
      },
      {
        name: "红外毒剂遥测车",
        type: "车载装备",
        createTime: "2016-10-03",
        dataType: "使用中",
        synopsis: "要求能操作",
      },
      {
        name: "辐射仪",
        type: "便携装备",
        createTime: "2016-10-03",
        dataType: "使用中",
        synopsis: "要求能操作",
      },
      {
        name: "化验箱",
        type: "便携装备",
        createTime: "2016-10-03",
        dataType: "使用中",
        synopsis: "要求能操作",
      },
      {
        name: "防护服",
        type: "便携装备",
        createTime: "2016-10-03",
        dataType: "使用中",
        synopsis: "要求能操作",
      },
      {
        name: "喷洒车",
        type: "车载装备",
        createTime: "2016-10-03",
        dataType: "使用中",
        synopsis: "要求能操作",
      },
      {
        name: "洗消器",
        type: "便携装备",
        createTime: "2016-10-03",
        dataType: "使用中",
        synopsis: "要求能操作",
      },
      {
        name: "兵器消毒盒",
        type: "便携装备",
        createTime: "2016-10-03",
        dataType: "使用中",
        synopsis: "要求能操作",
      },
      {
        name: "喷火器",
        type: "便携装备",
        createTime: "2016-10-03",
        dataType: "使用中",
        synopsis: "要求能操作",
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
  
  export default intervene_data
  
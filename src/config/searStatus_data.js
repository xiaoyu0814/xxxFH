const searStatus_data = {
  table_data: [{
      name: "John Brown",
      age: 18,
      address: "New York No. 1 Lake Park",
      date: "2016-10-03"
    },
    {
      name: "Jim Green",
      age: 24,
      address: "London No. 1 Lake Park",
      date: "2016-10-01"
    },
    {
      name: "Joe Black",
      age: 30,
      address: "Sydney No. 1 Lake Park",
      date: "2016-10-02"
    },
    {
      name: "Jon Snow",
      age: 26,
      address: "Ottawa No. 2 Lake Park",
      date: "2016-10-04"
    },
    {
      name: "John Brown",
      age: 18,
      address: "New York No. 1 Lake Park",
      date: "2016-10-03"
    },
    {
      name: "Jim Green",
      age: 24,
      address: "London No. 1 Lake Park",
      date: "2016-10-01"
    },
    {
      name: "Joe Black",
      age: 30,
      address: "Sydney No. 1 Lake Park",
      date: "2016-10-02"
    },
    {
      name: "Jon Snow",
      age: 26,
      address: "Ottawa No. 2 Lake Park",
      date: "2016-10-04"
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
  redSeat_data: [{
      label: "管理席位",
      value: {
        describeInfo: {
          name: "管理席位",
          function: "实现对系统的基础数据、训练数据等信息管理，以及对系统运行状态的的动态监控",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: true
    },
    {
      label: "导演席位",
      value: {
        describeInfo: {
          name: "导演席位",
          function: "实现对系统兵力、地理环境、大气环境、电磁环境、NBC环境等训练环境、条件的干预",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: true
    },
    {
      label: "控制席位",
      value: {
        describeInfo: {
          name: "控制席位",
          function: "待定",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: true
    },
    {
      label: "作业席位",
      value: {
        describeInfo: {
          name: "作业席位",
          function: "待定",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: false
    },
    {
      label: "作业席位",
      value: {
        describeInfo: {
          name: "作业席位",
          function: "待定",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: false
    },
    {
      label: "作业席位",
      value: {
        describeInfo: {
          name: "作业席位",
          function: "待定",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: false
    },
    {
      label: "作业席位",
      value: {
        describeInfo: {
          name: "作业席位",
          function: "待定",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: false
    },
    {
      label: "管理席位",
      value: {
        describeInfo: {
          name: "管理席位",
          function: "实现对系统的基础数据、训练数据等信息管理，以及对系统运行状态的的动态监控",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: true
    },
    {
      label: "导演席位",
      value: {
        describeInfo: {
          name: "导演席位",
          function: "实现对系统兵力、地理环境、大气环境、电磁环境、NBC环境等训练环境、条件的干预",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: true
    },
    {
      label: "控制席位",
      value: {
        describeInfo: {
          name: "控制席位",
          function: "待定",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: true
    }
  ],
  blueSeat_data: [{
      label: "管理席位",
      value: {
        describeInfo: {
          name: "管理席位",
          function: "实现对系统的基础数据、训练数据等信息管理，以及对系统运行状态的的动态监控",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: true
    },
    {
      label: "导演席位",
      value: {
        describeInfo: {
          name: "导演席位",
          function: "实现对系统兵力、地理环境、大气环境、电磁环境、NBC环境等训练环境、条件的干预",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: true
    },
    {
      label: "控制席位",
      value: {
        describeInfo: {
          name: "控制席位",
          function: "待定",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: false
    },
    {
      label: "作业席位",
      value: {
        describeInfo: {
          name: "作业席位",
          function: "待定",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: false
    },
    {
      label: "作业席位",
      value: {
        describeInfo: {
          name: "作业席位",
          function: "待定",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: false
    },
    {
      label: "作业席位",
      value: {
        describeInfo: {
          name: "作业席位",
          function: "待定",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: false
    },
    {
      label: "作业席位",
      value: {
        describeInfo: {
          name: "作业席位",
          function: "待定",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: false
    },
    {
      label: "管理席位",
      value: {
        describeInfo: {
          name: "管理席位",
          function: "实现对系统的基础数据、训练数据等信息管理，以及对系统运行状态的的动态监控",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: false
    },
    {
      label: "导演席位",
      value: {
        describeInfo: {
          name: "导演席位",
          function: "实现对系统兵力、地理环境、大气环境、电磁环境、NBC环境等训练环境、条件的干预",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: false
    },
    {
      label: "控制席位",
      value: {
        describeInfo: {
          name: "控制席位",
          function: "待定",
          constraints: "待定",
        },
        nodeInfo: {
          IP: '127.0.0.1',
          network: "有线",
          memory: (Math.floor(Math.random() * (90 - 20 + 1)) + 20) + "%"
        },
      },
      type: false
    }
  ]
}
export default searStatus_data

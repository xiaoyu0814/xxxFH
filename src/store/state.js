export default {
  loadScenario_dialog: false,
  meteorologicalEnvironment_dialog: false,
  forceIntervention_dialog: false,
  displayControl_dialog: false,
  openDrillPlan_dialog: false,
  fenzu:fenzu,
  redSeat: [{
    label: "管理席位",
    value: {
      describeInfo: {
        name: "管理席位",
        function: "实现对系统的基础数据、训练数据等信息管理，以及对系统运行状态的的动态监控",
        constraints: "待定",
        seatCategory:"管理席位"
      },
      nodeInfo: {
        IP: '127.0.0.1',
        network: "有线",
        memory: (Math.floor(Math.random() * (90 - 20 + 1) ) + 20)+"%"
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
        seatCategory:"导演席位"
      },
      nodeInfo: {
        IP: '127.0.0.1',
        network: "有线",
        memory: (Math.floor(Math.random() * (90 - 20 + 1) ) + 20)+"%"
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
        seatCategory:"控制席位"
      },
      nodeInfo: {
        IP: '127.0.0.1',
        network: "有线",
        memory: (Math.floor(Math.random() * (90 - 20 + 1) ) + 20)+"%"
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
        seatCategory:"作业席位"
      },
      nodeInfo: {
        IP: '127.0.0.1',
        network: "有线",
        memory: (Math.floor(Math.random() * (90 - 20 + 1) ) + 20)+"%"
      },
    },
    type: false
  }],
  blueSeat: [{
    label: "管理席位",
    value: {
      describeInfo: {
        name: "管理席位",
        function: "实现对系统的基础数据、训练数据等信息管理，以及对系统运行状态的的动态监控",
        constraints: "待定",
        seatCategory:"管理席位"
      },
      nodeInfo: {
        IP: '127.0.0.1',
        network: "有线",
        memory: (Math.floor(Math.random() * (90 - 20 + 1) ) + 20)+"%"
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
        seatCategory:"作业席位"
      },
      nodeInfo: {
        IP: '127.0.0.1',
        network: "有线",
        memory: (Math.floor(Math.random() * (90 - 20 + 1) ) + 20)+"%"
      },
    },
    type: false
  }]
}

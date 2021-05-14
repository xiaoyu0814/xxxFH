const listOfWarDamageAndResults_data = {
  tableHeader: [{
      type: "selection",
      width: 50,
      align: "center"
    },
    {
      title: "序号",
      type: "index",
      align: "center",
      width: 65
    },
    {
      title: "训练任务名称",
      key: "name",
      align: "center"
    },
    {
      title: "训练时间",
      key: "time",
      align: "center"
    },
    {
      title: "参训人员",
      key: "number",
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
      name: "ZY边境冲突想定",
      time: "2016-08-29",
      number: 12000,
      synopsis: "--",
    },
    {
      name: "京沪高速公路化学物品泄露",
      time: "2016-10-03",
      number: 150,
      synopsis: "--",
    }
  ],

  tableHeader1: [{
      type: "selection",
      width: 50,
      align: "center"
    },
    {
      title: "序号",
      type: "index",
      align: "center",
      width: 65
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
      title: "数量",
      key: "number",
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
  table_data1: [
    [
      {
        services: "陆军",
        Arms: "侦查兵",
        number: 235,
        synopsis: "要求能操作",
      }, {
        services: "陆军",
        Arms: "喷火兵",
        number: 310,
        synopsis: "要求能操作",
      }, {
        services: "陆军",
        Arms: "洗消兵",
        number: 335,
        synopsis: "要求能操作",
      }, {
        services: "陆军",
        Arms: "冲锋兵",
        number: 400,
        synopsis: "要求能操作",
      },
    ],
    [{
        services: "陆军",
        Arms: "发烟兵",
        number: 474,
        synopsis: "要求能操作",
      },
      {
        services: "陆军",
        Arms: "侦查兵",
        number: 335,
        synopsis: "要求能操作",
      }, {
        services: "陆军",
        Arms: "喷火兵",
        number: 110,
        synopsis: "要求能操作",
      }, {
        services: "陆军",
        Arms: "洗消兵",
        number: 235,
        synopsis: "要求能操作",
      }, {
        services: "陆军",
        Arms: "冲锋兵",
        number: 200,
        synopsis: "要求能操作",
      },
    ]
  ],
  tableHeader2: [{
      type: "selection",
      width: 50,
      align: "center"
    },
    {
      title: "序号",
      type: "index",
      align: "center",
      width: 65
    },
    {
      title: "装备名称",
      key: "name",
      align: "center"
    },
    {
      title: "数量",
      key: "number",
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
  table_data2: [
    [{
        name: "轻武器",
        number: 300,
        synopsis: "要求能操作",
      },
      {
        name: "喷气式飞机",
        number: 6,
        synopsis: "要求能操作",
      }, {
        name: "子弹",
        number: 600,
        synopsis: "要求能操作",
      }, {
        name: "炮弹",
        number: 500,
        synopsis: "要求能操作",
      }, {
        name: "通讯设备",
        number: 210,
        synopsis: "要求能操作",
      }, {
        name: "车辆",
        number: 120,
        synopsis: "要求能操作",
      },
    ],
    [{
        name: "气象观测车",
        number: 1,
        synopsis: "要求能操作",
      },
      {
        name: "指挥车",
        number: 1,
        synopsis: "要求能操作",
      }, {
        name: "化验车",
        number: 1,
        synopsis: "要求能操作",
      }, {
        name: "洗消车",
        number: 2,
        synopsis: "要求能操作",
      }, {
        name: "喷洒车",
        number: 3,
        synopsis: "要求能操作",
      }, {
        name: "气体检测仪",
        number: 5,
        synopsis: "要求能操作",
      },
    ]
  ],
  tableHeader3: [{
      type: "selection",
      width: 50,
      align: "center"
    },
    {
      title: "序号",
      type: "index",
      align: "center",
      width: 65
    },
    {
      title: "受伤程度",
      key: "name",
      align: "center"
    },
    {
      title: "数量",
      key: "number",
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
  table_data3: [
    [{
        name: "轻度",
        number: 605,
        synopsis: "烧伤",
      },
      {
        name: "中度",
        number: 320,
        synopsis: "烧伤",
      }, {
        name: "重度",
        number: 506,
        synopsis: "烧伤",
      }, {
        name: "极重度",
        number: 40,
        synopsis: "烧伤",
      }
    ],
    [{
        name: "中毒",
        number: 258,
        synopsis: "中毒",
      },
      {
        name: "受伤",
        number: 36,
        synopsis: "中毒",
      }, {
        name: "死亡",
        number: 28,
        synopsis: "中毒",
      }, {
        name: "死亡牲畜",
        number: 300,
        synopsis: "中毒",
      }, {
        name: "受损农作物",
        number: 200,
        synopsis: "中毒",
      }
    ]
  ],

  chart1: [
    {
      backgroundColor: '#000',
      //color : [ '#d76662', '#ffe97b', '#9fff57', '#9fff57', '#57ffe8', 'indigo', 'purple' ],
      title: {
        text: '投入兵力统计',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },

      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [{
        name: '数量统计',
        type: 'pie',
        center: ['50%', '50%'],
        data: [{
            value: 335,
            name: '洗消兵'
          },
          {
            value: 310,
            name: '喷火兵'
          },
          {
            value: 274,
            name: '发烟兵'
          },
          {
            value: 235,
            name: '侦察兵'
          },
          {
            value: 400,
            name: '冲锋兵'
          }
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: 'radius',
        label: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        itemStyle: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 100;
        }
      }]
    },
    {
      backgroundColor: '#000',
      //color : [ '#d76662', '#ffe97b', '#9fff57', '#9fff57', '#57ffe8', 'indigo', 'purple' ],
      title: {
        text: '投入兵力统计',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      visualMap: {
        show: false,
        min: 0,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [{
        name: '数量统计',
        type: 'pie',
        center: ['50%', '50%'],
        data: [{
            value: 235,
            name: '洗消兵'
          },
          {
            value: 110,
            name: '喷火兵'
          },
          {
            value: 474,
            name: '发烟兵'
          },
          {
            value: 335,
            name: '侦察兵'
          },
          {
            value: 200,
            name: '冲锋兵'
          }
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: 'radius',
        label: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        itemStyle: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 100;
        }
      }]
    }
  ],
  chart2: [
    {
      backgroundColor: '#000',
      title: {
        text: '发射弹药统计',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      visualMap: {
        show: false,
        min: 1,
        max: 700,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [{
        name: '数量统计',
        type: 'pie',
        center: ['50%', '50%'],

        data: [{
            value: 600,
            name: '子弹(支)'
          },
          {
            value: 500,
            name: '炮弹(支)'
          },
          {
            value: 300,
            name: '轻武器(支)'
          },
          {
            value: 120,
            name: '车辆(台)'
          },
          {
            value: 210,
            name: '通信设备(台)'
          },
          {
            value: 6,
            name: '喷气式飞机'
          }
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: 'radius',
        label: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        itemStyle: {
          color: '#00a1ff',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },

        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 100;
        }
      }]
    },
    {
      backgroundColor: '#000',
      title: {
        text: '使用装备统计',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      visualMap: {
        show: false,
        min: 0,
        max: 10,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [{
        name: '数量统计',
        type: 'pie',
        center: ['50%', '50%'],
        data: [{
            value: 1,
            name: '气象观测车(辆)'
          },
          {
            value: 1,
            name: '指挥车(辆)'
          },
          {
            value: 1,
            name: '化验车(辆)'
          },
          {
            value: 2,
            name: '洗消车(辆)'
          },
          {
            value: 3,
            name: '喷洒车(辆)'
          },
          {
            value: 5,
            name: '气体检测仪(台)'
          }
          // ,
          // {
          //   value: 350,
          //   name: '消耗液碱(吨)'
          // }
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: 'radius',
        label: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        itemStyle: {
          color: '#00a1ff',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 100;
        }
      }]
    }
  ],
  chart3: [
    {
      backgroundColor: '#000',
      title: {
        text: '损伤兵力统计',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      visualMap: {
        show: false,
        min: 39,
        max: 700,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [{
        name: '数量统计',
        type: 'pie',
        center: ['50%', '50%'],
        data: [{
            value: 605,
            name: '轻度'
          },
          {
            value: 320,
            name: '中度'
          },
          {
            value: 506,
            name: '重度'
          },
          {
            value: 400,
            name: '极重度'
          }
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: 'radius',
        label: {
          color: 'rgba(255, 255,255, 0.3)'
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        itemStyle: {
          color: '#fdef49',
          shadowBlur: 100,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },

        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }]
    },
    {
      backgroundColor: '#000',
      title: {
        text: '损伤兵力统计',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      visualMap: {
        show: false,
        min: 20,
        max: 400,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [{
        name: '数量统计',
        type: 'pie',
        center: ['50%', '50%'],
        data: [{
            value: 28,
            name: '死亡(人)'
          },
          {
            value: 36,
            name: '受伤(人)'
          },
          {
            value: 285,
            name: '中毒(人)'
          },
          {
            value: 200,
            name: '死亡牲畜(头)'
          },
          {
            value: 300,
            name: '受损农作物(亩)'
          }
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: 'radius',
        label: {
          color: 'rgba(255, 255,255, 0.3)'
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        itemStyle: {
          color: '#fdef49',
          shadowBlur: 100,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }]
    },
  ],
}

export default listOfWarDamageAndResults_data

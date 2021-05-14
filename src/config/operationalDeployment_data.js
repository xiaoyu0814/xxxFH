const operationalDeployment_data = {
  tree_data: [{
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

combatCompilation_data: [
    {
    title: "印军",
    expand: true,
    children: [{
        title: "陆军",
        expand: true,
        children: [
          {
            title: "第1快反师",
            expand: true,
            children: [
            ]
          },
          {
            title: "第2步兵师",
            expand: true,
            children: [
            ]
          },
          {
            title: "第5步兵师",
            expand: true,
            children: [
            ]
          },
          {
            title: "第7装甲师",
            expand: true,
            children: [
            ]
          },
        ]
      },
      {
        title: "空军",
        expand: true,
        children: [
          {
            title: "第1飞行联队师",
            expand: true,
            children: [
              {
                title: "第36飞行中队",
                expand: true,
                children: [
                ]
              },
              {
                title: "第41飞行中队（伊尔-78加油机）",
                expand: true,
                children: [
                ]
              },
            ]
          },
          {
            title: "第4飞行联队师",
            expand: true,
            children: [
              {
                title: "第50飞行中队（预警机）",
                expand: true,
                children: [
                ]
              },
              {
                title: "第78飞行中队（伊尔-78加油机）",
                expand: true,
                children: [
                ]
              },
            ]
          },
        ]
      },
     
    ]
  },
  {
    title: "巴军",
    expand: true,
    children: [{
        title: "陆军",
        expand: true,
        children: [{
            title: "装甲第1师"
          },
          {
            title: "装甲第6师"
          }
        ]
      }
    ]
  }
],
combatGroup_data: [{
  title: "印军",
  expand: true,
  children: [{
      title: "空军",
      expand: true,
      children: [
        {
          title: "第4飞行联队",
          expand: true,
          children: [
            {
              title: "第50飞行中队（预警机）",
              expand: true,
              children: [
              ]
            },
            {
              title: "第78飞行中队（伊尔-78加油机）",
              expand: true,
              children: [
              ]
            },
          ]
        },
        
      ]
    },

  ]
},{
  title: "巴军",
  expand: true,
  children: [{
      title: "陆军",
      expand: true,
      children: [{
          title: "装甲第1师",
          expand: true,
          children: [
            {
              title: "炮兵旅"
            },
            {
              title: "防空旅"
            }
          ]
        }
      ]
    },
    
  ]
}],

HBcombatCompilation_data: [
  {
    title: "红方",
    expand: true,
    children: [{
        title: "机步第9师",
        expand: true,
        children: [
        ]
      },
      {
        title: "第72陆航旅",
        expand: true,
        children: [
        ]
      },
      {
        title: "装甲第8师",
        expand: true,
        children: [
        ]
      },
      {
        title: "摩步第5师",
        expand: true,
        children: [
        ]
      },
      {
        title: "防化旅",
        expand: true,
        children: [
          {
            title:"第1防化营",
            expand: true,
            children: [
              {title:"洗消分队"},
              {title:"喷火分队"},
              {title:"侦察分队"},
              {title:"发烟分队"},
              {title:"观测分队"},
            ]
         },
         {
          title:"第2防化营",
          expand: true,
          children: [
             {title:"洗消分队"},
              {title:"喷火分队"},
              // {title:"侦察连"},
              {title:"发烟分队"},
          ]
          },
         {
          title:"第3防化营",
          expand: true,
          children: [
             {title:"洗消分队"},
             {title:"喷火分队"},
             {title:"侦察分队"},
             {title:"发烟分队"},
          ]
          },]},
    ]
  },
  {
    title: "蓝方",
    expand: true,
    children: [{
      title: "机步第7师",
      expand: true,
      children: [
      ]
      },
      {
        title: "第70陆航旅",
        expand: true,
        children: [
        ]
      },
      {
        title: "装甲第2师",
        expand: true,
        children: [
        ]
      },
      {
        title: "摩步第6师",
        expand: true,
        children: [
        ]
      },
    ]
  }
],
HBcombatGroup_data: [{
  title: "红方",
  expand: true,
  children: [{
      title: "机步第9师",
      expand: true,
      children: [
      ]
    },
    {
      title: "第72陆航旅",
      expand: true,
      children: [
      ]
    },
    {
      title: "装甲第8师",
      expand: true,
      children: [
      ]
    },
    {
      title: "摩步第5师",
      expand: true,
      children: [
      ]
    },
  ]
},
{
  title: "蓝方",
  expand: true,
  children: [{
    title: "机步第7师",
    expand: true,
    children: [
    ]
    },
    {
      title: "第70陆航旅",
      expand: true,
      children: [
      ]
    },
    {
      title: "装甲第2师",
      expand: true,
      children: [
      ]
    },
    {
      title: "摩步第6师",
      expand: true,
      children: [
      ]
    },
  ]
}],
XLcombatGroup_data: [{
  title: "我方",
  expand: true,
  children: [{
      title: "气象观测车",
      expand: true,
      children: [
      ]
    },
    {
      title: "指挥车",
      expand: true,
      children: [
      ]
    },
    {
      title: "化验车",
      expand: true,
      children: [
      ]
    },
    {
      title: "洗消车",
      expand: true,
      children: [
      ]
    },
    {
      title: "喷洒车",
      expand: true,
      children: [
      ]
    },
    {
      title: "工程机械",
      expand: true,
      children: [
      ]
    },
  ]
},
],
}
export default operationalDeployment_data

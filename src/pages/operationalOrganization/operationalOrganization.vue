<template>
  <div id="operationalOrganization">
    <div class="content">
      <div style="padding:10px 0" v-if="false">
        <span>作战属方：</span>
        <Select v-model="combatAffiliation" style="width:200px">
          <Option
            v-for="item in combatAffiliations"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
      <div class="bottom">
        <div class="bottom_left">
          <span>作战编制</span>
          <div style="overflow-y:auto;overflow-x:hidden;height:100%">
            <Tree :data="combatOrganization_data"  :render="renderContent"></Tree>
          </div>
        </div>
        <div class="bottom_center">
          <span>作战编成</span>
          <!-- :render="renderContent" 添加编辑方法 -->
          <div style="overflow-y:auto;overflow-x:hidden;height:100%">
            <Tree :data="combatCompilation_data" class="demo-tree-render"  :render="renderContent"></Tree>
          </div>
        </div>
        <div class="bottom_left">
          <span>作战编组</span>
          <div style="overflow-y:auto;overflow-x:hidden;height:100%">
            <Tree :data="combatGroup_data" :render="renderContent"></Tree>
          </div>
        </div>
        <div class="bottom_right">
          <div class="bottom_right_top">
            <Collapse v-model="collapse_value">
              <Panel>
                <span style="font-size:14px;font-weight: bold;">部队基本属性</span>
                <div slot="content" class="attribute">
                  <table>
                    <tr>
                      <td>部队名称</td>
                      <td>{{detail.bdName}}</td>
                    </tr>
                    <tr>
                      <td>部队代字</td>
                      <td>{{detail.bdReplace}}</td>
                    </tr>
                    <tr>
                      <td>部队内码</td>
                      <td>{{detail.bdCode}}</td>
                    </tr>
                    <tr>
                      <td>实体类型</td>
                      <td>{{detail.bdType}}</td>
                    </tr>
                    <tr>
                      <td>实体级别</td>
                      <td>{{detail.bdLevel}}</td>
                    </tr>
                    <tr>
                      <td>人员数量</td>
                      <td>{{detail.bdNumber}}</td>
                    </tr>
                    <tr>
                      <td>训练等级</td>
                      <td>{{detail.bdTrainLevel}}</td>
                    </tr>
                    <tr>
                      <td>时期等级</td>
                      <td>{{detail.bdDateLavel}}</td>
                    </tr>
                  </table>
                </div>
              </Panel>
              <Panel>
                <span style="font-size:14px;font-weight: bold;">部队综合机动力</span>
                <div slot="content">
                  <table>
                    <tr>
                      <td>最远机动距离（千米）</td>
                      <td>{{detail.bdFarDistance}}</td>
                    </tr>
                    <tr>
                      <td>平均机动距离（千米）</td>
                      <td>{{detail.bdAvgDistance}}</td>
                    </tr>
                    <tr>
                      <td>轻弯半径（米）</td>
                      <td>{{detail.bdRadius}}</td>
                    </tr>
                    <tr>
                      <td>载重量（吨）</td>
                      <td>{{detail.bdWeight}}</td>
                    </tr>
                    <tr>
                      <td>机动速度（千米/小时）</td>
                      <td>{{detail.bdSpeed}}</td>
                    </tr>
                    <tr>
                      <td>综合机动力指数</td>
                      <td>{{detail.bdMobility}}</td>
                    </tr>
                  </table>
                </div>
              </Panel>
              <Panel>
                <span style="font-size:14px;font-weight: bold;">部队综合信息力</span>
                <div slot="content">
                  <table>
                    <tr>
                      <td>最远机动距离（千米）</td>
                      <td>{{bdName}}</td>
                    </tr>
                    <tr>
                      <td>最远侦察距离（千米）</td>
                      <td>{{bdName}}</td>
                    </tr>
                    <tr>
                      <td>最近侦察距离（千米）</td>
                      <td>{{bdName}}</td>
                    </tr>
                    <tr>
                      <td>综合侦察距离（千米）</td>
                      <td>{{bdName}}</td>
                    </tr>
                    <tr>
                      <td>无限通讯距离（千米）</td>
                      <td>{{bdName}}</td>
                    </tr>
                    <tr>
                      <td>有无有线通讯保障</td>
                      <td>{{bdName}}</td>
                    </tr>
                    <tr>
                      <td>综合信息力指数</td>
                      <td>{{bdName}}</td>
                    </tr>
                  </table>
                </div>
              </Panel>
            </Collapse>
          </div>
          <div class="bottom_right_bottom" id="bottom_box">
            <Table
              border
              :height="table_height"
              size="small"
              :columns="tableHeader"
              :data="table_data"
              style="height:100%"
            ></Table>
          </div>
        </div>
      </div>
    </div>
    <openDrillPlan></openDrillPlan>
  </div>
</template>

<script>
import openDrillPlan from "@/components/dialog/openDrillPlan/index";
import operationalOrganization_data from "@/config/operationalOrganization_data";

export default {
  components: {
    openDrillPlan
  },
  data() {
    return {
      table_height: "",
      screenWidth: "",
      combatAffiliation: "",
      combatAffiliations: [
        {
          label: "红方",
          value: "red"
        },
        {
          label: "蓝方",
          value: "blue"
        }
      ],
      collapse_value: [0, 1, 2],
      tableHeader: [
        {
          title: "装备名称",
          key: "title"
        },
        {
          title: "装备数量",
          key: "number"
        },
        {
          title: "装备编码",
          key: "detail"
        }
      ],
      table_data: operationalOrganization_data.table_data,
      combatOrganization_data: operationalOrganization_data.combatOrganization_data,
      combatCompilation_data: operationalOrganization_data.combatCompilation_data,
      combatGroup_data:operationalOrganization_data.combatGroup_data,
      buttonProps: {
          type: 'default',
          size: 'small',
      },
      dragstartNode:'',
      dragstartData:'',
      dragstartRoot:'',

      detail:{
        bdName:"",//部队名称
        bdReplace:"",//
        bdCode:"",//
        bdType:"",//
        bdLevel:"",//
        bdNumber:"",//
        bdTrainLevel:"",//
        bdDateLavel:"",//
        bdFarDistance:"",//
        bdAvgDistance:"",//
        bdRadius:"",//
        bdWeight:"",//
        bdSpeed:"",//
        bdMobility:"",
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
          self.table_height = document.getElementById(
            "bottom_box"
          ).clientHeight;
          self.timer = false;
        }, 400);
      }
    }
  },
  methods: {
    renderContent (h, { root, node, data }) {
        return h('span', {
            style: {
                display: 'inline-block',
                width: '100%'
            },
            attrs: {
              draggable:'true'
            },
            on:{
              dragstart: () => this.handleDragStart(root, node, data),
              dragover: () => this.handleDragOver(root, node, data),
              dragend: () => this.handleDragEnd(root, node, data),
              drop: ()=> this.handleDrop(root, node, data),
             
            }
        }, [
            h('span', [
                h('Icon', {
                    props: {
                        type: 'ios-paper-outline'
                    },
                    style: {
                        marginRight: '8px'
                    },
                    on:{ click: () => this.edit(data)}
                }),
                h('span',{on:{ click: () => this.show(data)}}, data.title)
            ]),
            h('span', {
                style: {
                    display: 'inline-block',
                    marginRight: '32px',
                    marginLeft: '10px'
                }
            }, [
                h('Button', {
                    props: Object.assign({}, this.buttonProps, {
                        icon: 'ios-create',
                        shape : "circle"
                    }),
                    style: {
                        marginRight: '8px'
                    },
                    on: {
                        click: () => { this.append(data) }
                    }
                }),
                h('Button', {
                    props: Object.assign({}, this.buttonProps, {
                        icon: 'ios-remove',
                        shape : "circle"
                    }),
                    on: {
                        click: () => { this.remove(root, node, data) }
                    }
                })
            ])
        ]);
    },
    append (data) {
        const children = data.children || [];
        children.push({
            title: 'appended node',
            expand: true
        });
        this.$set(data, 'children', children);
    },
    remove (root, node, data) {
        const parentKey = root.find(el => el === node).parent;
        const parent = root.find(el => el.nodeKey === parentKey).node;
        const index = parent.children.indexOf(data);
        parent.children.splice(index, 1);
    },
    handleDragStart(root, node, data){
      const event = window.event||arguments[0];
      this.dragstartNode = node
      this.dragstartData = data
      this.dragstartRoot = root
    },
    handleDragOver(root, node, data){
      const event = window.event||arguments[0];
      event.preventDefault();
    },
    handleDragEnd(root, node, data){
      const event = window.event||arguments[0];
      event.preventDefault();
    },
    handleDrop(root, node, data){
      event.preventDefault();
      if(node === this.dragstartNode) return
      const target_parentKey = root.find(el => el === node).parent || node.nodeKey;
      const target_parent = root.find(el => el.nodeKey === target_parentKey).node;
      const target_index = target_parent.children.indexOf(data);
      const target_children = data.children || [];
      target_children.push(this.dragstartData);
      this.$set(data, 'children', target_children);
      console.log( this.dragstartRoot)
      // const source_parentKey = root.find(el => el === this.dragstartNode).parent;
      // const source_parent = root.find(el => el.nodeKey === source_parentKey).node;   
      const source_parentKey =  this.dragstartRoot.find(el => el === this.dragstartNode).parent;
      const source_parent =  this.dragstartRoot.find(el => el.nodeKey === source_parentKey).node;
      const source_index = source_parent.children.indexOf(this.dragstartData);
      source_parent.children.splice(source_index, 1);
      console.log(this.data5,"data5")
    },
    show(data){
       console.log(data);
       if(data.title == "防化旅"){
          this.detail={
            bdName:"第X防化旅",//部队名称
            bdReplace:"AAA001",//
            bdCode:"FH002",//
            bdType:"FH",//
            bdLevel:"1",//
            bdNumber:"950",//
            bdTrainLevel:"1级",//
            bdDateLavel:"2级",//
            bdFarDistance:"200",//
            bdAvgDistance:"100",//
            bdRadius:"100",//
            bdWeight:"10",//
            bdSpeed:"75",//
            bdMobility:"1.5",
          };
          let _equipment = [
            {
              title:"核爆炸自动观测仪",
              number:1,
              detail:""
            },
            {
              title:"核爆炸观测仪",
              number:2,
              detail:""
            },
            {
              title:"侦毒器",
              number:2,
              detail:""
            },
            {
              title:"报警器",
              number:2,
              detail:""
            },
            {
              title:"辐射仪",
              number:2,
              detail:""
            },
            {
              title:"防化侦察车",
              number:2,
              detail:""
            },
            {
              title:"防化化验车",
              number:2,
              detail:""
            },
            {
              title:"燃气射流洗消车",
              number:2,
              detail:""
            },
            {
              title:"自动喷洒车",
              number:2,
              detail:""
            },
            {
              title:"沐浴车",
              number:2,
              detail:""
            },
            {
              title:"轻型喷火器",
              number:2,
              detail:""
            },
            {
              title:"单兵火箭",
              number:2,
              detail:""
            },
          ]
          this.table_data= _equipment

       }
    },
    edit(data) {
      console.log(data);
      var oldValue = data.title;
      this.$Modal.confirm({
        title: "Title",
        render: h => {
          return h("Input", {
            props: {
              value: data.title,
              autofocus: true,
              placeholder: "请输入..."
            },
            on: {
              input: val => {
                data.title = val;
              }
            }
          });
        }
      });
      return;
      const children = data.children || [];
      children.push({
        title: "appended node",
        expand: true
      });
      this.$set(data, "children", children);
    },
    remove(root, node, data) {
      const parentKey = root.find(el => el === node).parent;
      const parent = root.find(el => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    }
  },
  mounted() {
    const self = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        self.screenWidth = window.screenWidth;
      })();
    };
    window.screenWidth = document.body.clientWidth;
    self.screenWidth = window.screenWidth;
    this.table_height = document.getElementById("bottom_box").clientHeight;
  }
};
</script>

<style scoped>
#operationalOrganization {
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
}
#operationalOrganization .content {
  height: 100%;
}
#operationalOrganization .bottom {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  height: 100%;
}
#operationalOrganization .bottom > div {
  width: 24%;
}
#operationalOrganization .bottom .bottom_left,
#operationalOrganization .bottom .bottom_center {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
  padding-right: 30px;
}
#operationalOrganization .bottom .bottom_left > span,
#operationalOrganization .bottom .bottom_center > span {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: #fff;
  padding: 0 5px;
  font-size: 16px;
  font-weight: bold;
}
#operationalOrganization .bottom_right .bottom_right_top {
  height: 60%;
  overflow-y: auto;
}
#operationalOrganization .bottom_right .bottom_right_bottom {
  height: 40%;
  padding-top: 10px;
}
#operationalOrganization .bottom_right_top table {
  width: 100%;
  border-collapse: collapse;
}
#operationalOrganization .bottom_right_top table td {
  border: 1px solid #ccc;
  padding: 2px 5px;
  width: 50%;
}
</style>
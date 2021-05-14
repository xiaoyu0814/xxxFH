<template>
  <div id="dataManagement">
    <header>
      <Button
        :type="button_index===index?'info':'primary'"
        v-for="(item, index) in button_data"
        :key="index"
        @click="getData(item,index)"
        style="margin-right:5px"
      >{{item.label}}</Button>
    </header>
    <div class="content">
      <div style="padding:20px 0">
        <span>装备属方：</span>
        <Select v-model="combatAffiliation" style="width:200px" @on-change="change_selectValue">
          <Option
            v-for="item in combatAffiliations"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
        <span style="margin-left:20px">军种：</span>
        <Select v-model="services" style="width:200px" @on-change="change_selectValue">
          <Option v-for="item in servicess" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <span style="margin-left:20px">类型：</span>
        <Select v-model="servicesType" style="width:200px" @on-change="change_selectValue">
          <Option
            v-for="item in servicesTypes"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</Option>
        </Select>
      </div>
      <div class="bottom">
        <div class="bottom_left" id="bottom_left">
          <Table
            border
            stripe
            highlight-row
            :height="table_height"
            :columns="tableHeader"
            :data="table_data"
            style="height:calc(100% - 70px)"
            @on-row-click="table_row_click"
          >
            <template slot-scope="{ row, index }" slot="operation">
              <div style="font-size:24px;color:#2d8cf0">
                <Tooltip content="预览" placement="top">
                  <Icon type="ios-eye-outline" style="cursor: pointer;" />
                </Tooltip>
                <Tooltip content="编辑" placement="top">
                  <Icon type="ios-create-outline" style="cursor: pointer;" />
                </Tooltip>
                <Tooltip content="删除" placement="top">
                  <Icon type="ios-close-circle-outline" style="cursor: pointer;" />
                </Tooltip>
                <Tooltip content="下载" placement="top">
                  <Icon type="ios-cloud-download-outline" style="cursor: pointer;" />
                </Tooltip>
              </div>
            </template>
          </Table>
          <Page :total="12" :page-size="20" show-total style="padding:20px 0" />
        </div>
        <div class="bottom_right">
          <div class="bottom_right_top">
            <Collapse v-model="collapse_value">
              <Panel>
                <span style="font-size:14px;font-weight: bold;">装备属性</span>
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
              <Panel v-if="false">
                <span style="font-size:14px;font-weight: bold;">部队综合机动力</span>
                <div slot="content">
                  <table>
                    <tr>
                      <td>最远机动距离（米）</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>平均机动距离（米）</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>轻弯半径（米）</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>载重量（吨）</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>机动速度（米/小时）</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>综合机动力指数</td>
                      <td></td>
                    </tr>
                  </table>
                </div>
              </Panel>
              <Panel v-if="false">
                <span style="font-size:14px;font-weight: bold;">部队综合信息力</span>
                <div slot="content">
                  <table>
                    <tr>
                      <td>最远机动距离（米）</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>最远侦察距离（米）</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>最近侦察距离（米）</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>综合侦察距离（米）</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>无限通讯距离（米）</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>有无有线通讯保障</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>综合信息力指数</td>
                      <td></td>
                    </tr>
                  </table>
                </div>
              </Panel>
            </Collapse>
          </div>
          <div class="bottom_right_bottom" id="bottom_box">
            <Table
              v-if="false"
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
import dataManagement_data from "@/config/dataManagement_data";
export default {
  components: {
    openDrillPlan
  },
  data() {
    return {
      table_height: "",
      screenWidth: "",
      button_index: 2,
      button_data: dataManagement_data.button_data,
      combatAffiliation: "red",
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
      services: "陆军",
      servicess: [
        {
          label: "陆军",
          value: "陆军"
        },
        {
          label: "空军",
          value: "空军"
        },
        {
          label: "海军",
          value: "海军"
        },
        {
          label: "火箭军",
          value: "火箭军"
        }
      ],
      servicesType: "防化",
      servicesTypes: [
        {
          label: "陆航",
          value: "陆航"
        },
        {
          label: "防化",
          value: "防化"
        },
        {
          label: "装甲兵",
          value: "装甲兵"
        }
      ],
      collapse_value: [0, 1, 2],
      tableHeader: dataManagement_data.tableHeader,
      table_data: dataManagement_data.table_data,
      combatOrganization_data: dataManagement_data.combatOrganization_data,
      combatCompilation_data: dataManagement_data.combatCompilation_data,
      buttonProps: {
        type: "default",
        size: "small"
      },
      collapse_data: [],
      detail: {
        bdName: "", //部队名称
        bdReplace: "", //
        bdCode: "", //
        bdType: "", //
        bdLevel: "", //
        bdNumber: "", //
        bdTrainLevel: "", //
        bdDateLavel: "", //
        bdFarDistance: "", //
        bdAvgDistance: "", //
        bdRadius: "", //
        bdWeight: "", //
        bdSpeed: "", //
        bdMobility: ""
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
          self.table_height =
            document.getElementById("bottom_left").clientHeight - 70;
          console.log(self.table_height);
          self.timer = false;
        }, 400);
      }
    }
  },
  methods: {
    change_selectValue(value) {
      if (value === "red" || value === "陆军" || value === "防化") {
        this.table_data = dataManagement_data.table_data;
      } else {
        this.table_data = [];
        this.detail = {
          bdName: "", //部队名称
          bdReplace: "", //
          bdCode: "", //
          bdType: "", //
          bdLevel: "", //
          bdNumber: "", //
          bdTrainLevel: "", //
          bdDateLavel: "", //
          bdFarDistance: "", //
          bdAvgDistance: "", //
          bdRadius: "", //
          bdWeight: "", //
          bdSpeed: "", //
          bdMobility: ""
        };
      }
    },
    table_row_click(item, index) {
      this.detail = this.collapse_data[index];
    },
    getData(item, index) {
      this.button_index = index;
      if (item.label === "装备性能数据") {
        this.table_data = dataManagement_data.table_data;
      } else {
        this.table_data = [];
        this.detail = {
          bdName: "", //部队名称
          bdReplace: "", //
          bdCode: "", //
          bdType: "", //
          bdLevel: "", //
          bdNumber: "", //
          bdTrainLevel: "", //
          bdDateLavel: "", //
          bdFarDistance: "", //
          bdAvgDistance: "", //
          bdRadius: "", //
          bdWeight: "", //
          bdSpeed: "", //
          bdMobility: ""
        };
      }
    },
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h("span", [h("span", data.title)]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px"
              }
            },
            [
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps, {
                    type: "primary"
                  }),
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => {
                      this.edit(data);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps, {
                    type: "error"
                  }),
                  on: {
                    click: () => {
                      this.remove(root, node, data);
                    }
                  }
                },
                "删除"
              )
            ]
          )
        ]
      );
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
    this.collapse_data = [];
    for (var i = 0; i < 12; i++) {
      var DZ = Math.floor(Math.random() * 99 + 1);
      var NM = Math.floor(Math.random() * 99 + 1);
      var detail = {
        bdName: "第X防化团", //部队名称
        bdReplace: "AAA" + (DZ < 10 ? "00" + DZ : "0" + DZ), //
        bdCode: "FH" + (NM < 10 ? "00" + NM : "0" + NM), //
        bdType: "FH", //
        bdLevel: "1", //
        bdNumber: "950", //
        bdTrainLevel: "1级", //
        bdDateLavel: "2级", //
        bdFarDistance: "200", //
        bdAvgDistance: "100", //
        bdRadius: "100", //
        bdWeight: "10", //
        bdSpeed: "75", //
        bdMobility: "1.5"
      };
      this.collapse_data.push(detail);
    }
  }
};
</script>

<style scoped>
#dataManagement {
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
}
#dataManagement .content {
  height: calc(100% - 30px);
}
#dataManagement .bottom {
  display: flex;
  justify-content: space-between;
  /* padding-top: 10px; */
  height: calc(100% - 70px);
}
#dataManagement .bottom .bottom_left {
  width: 67%;
  height: 100%;
}
#dataManagement .bottom .bottom_left > span {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: #fff;
  padding: 0 5px;
  font-size: 16px;
  font-weight: bold;
}
#dataManagement .bottom .bottom_right {
  width: 32%;
}
#dataManagement .bottom_right .bottom_right_top {
  height: 60%;
  overflow-y: auto;
}
#dataManagement .bottom_right .bottom_right_bottom {
  height: 40%;
  padding-top: 10px;
}
#dataManagement .bottom_right_top table {
  width: 100%;
  border-collapse: collapse;
}
#dataManagement .bottom_right_top table td {
  border: 1px solid #ccc;
  padding: 2px 5px;
  width: 50%;
}
</style>
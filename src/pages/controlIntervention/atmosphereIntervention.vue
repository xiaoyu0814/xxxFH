<template>
  <div id="atmosphereIntervention">
    <header v-if="false">
      <Button
        :type="button_index===index?'info':'primary'"
        v-for="(item, index) in button_data"
        :key="index"
        @click="button_index=index"
        style="margin-right:5px"
      >{{item.label}}</Button>
    </header>
    <!-- <div class="content"> -->
    <!-- <div class="bottom"> -->
    <!-- <div class="bottom_center"> -->
    <!-- <span>大气环境干预</span> -->
    <!-- :render="renderContent" 添加编辑方法 -->
    <div class="meteorologicalEnvironment_content">
      <div>
        <div>
          <span>天气环境</span>
          <table>
            <tr>
              <td>天气类型：</td>
              <td>
                <Select v-model="weatherEnvironment.weather" style="width:14%" @on-change = "weathersChange">
                  <Option
                    v-for="item in weathers"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </td>
            </tr>
            <tr>
              <td>阳光强度：</td>
              <td>
                <Select v-model="weatherEnvironment.sunlightIntensity" style="width:14%">
                  <Option
                    v-for="item in sunlightIntensitys"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </td>
            </tr>
            <tr>
              <td>雷电有无：</td>
              <td>
                <Select v-model="weatherEnvironment.whetherThereIsLightning" style="width:14%">
                  <Option
                    v-for="item in whetherThereIsLightnings"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </td>
            </tr>
          </table>
        </div>
        <div>
          <span>环境风</span>
          <table>
            <tr>
              <td>风速：</td>
              <td>
                <Input
                  v-model="environmentalWind.windSpeed"
                  placeholder="请输入..."
                  style="width:10%"
                />
                <span>m/s</span>
              </td>
            </tr>
            <tr style="visibility:hidden;">
              <td>风向：</td>
              <td>
                <Input
                  v-model="environmentalWind.windDirection"
                  placeholder="请输入..."
                  style="width:10%"
                />
                <span>℃</span>
              </td>
            </tr>
            <tr>
              <td>风向：</td>
              <td>
                <Input
                  v-model="environmentalWind.windDirection"
                  placeholder="请输入..."
                  style="width:10%"
                />
                <span>℃</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <div>
          <span>云雾状态</span>
          <table>
            <tr>
              <td>云层高度：</td>
              <td>
                <Input
                  v-model="cloudState.cloudHeight_start"
                  placeholder="请输入..."
                  style="width:15%"
                />
                <span>~</span>
                <Input v-model="cloudState.cloudHeight_end" placeholder="请输入..." style="width:15%" />
              </td>
            </tr>
            <tr>
              <td>天空云量：</td>
              <td>
                <Select v-model="cloudState.cloudiness" style="width:14%">
                  <Option
                    v-for="item in cloudinesss"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </td>
            </tr>
            <tr>
              <td>雾浓度：</td>
              <td>
                <Select v-model="cloudState.fogConcentration" style="width:14%">
                  <Option
                    v-for="item in fogConcentrations"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </td>
            </tr>
          </table>
        </div>
        <div>
          <span>其他</span>
          <table>
            <tr>
              <td>温度：</td>
              <td>
                <Input v-model="other.temperature" placeholder="请输入..." style="width:10%" />
                <span>℃</span>
              </td>
            </tr>
            <tr>
              <td>相对湿度：</td>
              <td>
                <Input v-model="other.relativeHumidity" placeholder="请输入..." style="width:10%" />
                <span>%</span>
              </td>
            </tr>
            <tr>
              <td>可见度：</td>
              <td>
                <Input v-model="other.visibility" placeholder="请输入..." style="width:10%" />
                <span>m</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!-- </div> -->
    <!-- </div> -->
    <!-- </div> -->
    <openDrillPlan></openDrillPlan>
  </div>
</template>

<script>
import openDrillPlan from "@/components/dialog/openDrillPlan/index";
import intervene_data from "@/config/intervene_data";
export default {
  components: {
    openDrillPlan
  },
  data() {
    return {
      weatherEnvironment: {
        weather: "s0",
        sunlightIntensity: "",
        whetherThereIsLightning: "无"
      },
      weathers: [
        {
          label: "阴",
          value: "s1"
        },
        {
          label: "晴",
          value: "s0"
        },
        {
          label: "小雨",
          value: "r1"
        },
        {
          label: "中雨",
          value: "r2"
        },
        {
          label: "大雨",
          value: "r3"
        },
        {
          label: "暴雨",
          value: "r4"
        },
        {
          label: "雾",
          value: "r0"
        },
      ],
      sunlightIntensitys: [
        {
          label: "强",
          value: "强"
        },
        {
          label: "中",
          value: "中"
        },
        {
          label: "弱",
          value: "弱"
        }
      ],
      whetherThereIsLightnings: [
        {
          label: "有",
          value: "有"
        },
        {
          label: "无",
          value: "无"
        }
      ],
      environmentalWind: {
        windSpeed: 0,
        windDirection: 0
      },
      cloudState: {
        cloudHeight_start: 0,
        cloudHeight_end: 0,
        cloudiness: "无",
        fogConcentration: "无"
      },
      cloudinesss: [
        {
          label: "多",
          value: "多"
        },
        {
          label: "少",
          value: "少"
        },
        {
          label: "无",
          value: "无"
        }
      ],
      fogConcentrations: [
        {
          label: "大",
          value: "大"
        },
        {
          label: "小",
          value: "小"
        },
        {
          label: "无",
          value: "无"
        }
      ],
      other: {
        temperature: 0,
        relativeHumidity: 0,
        visibility: 1000
      },
      table_height: "",
      screenWidth: "",
      button_index: 2,
      button_data: intervene_data.button_data,
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
          label: "防化",
          value: "防化"
        }
      ],
      collapse_value: [0, 1, 2],
      tableHeader: intervene_data.tableHeader,
      table_data: intervene_data.table_data,
      combatOrganization_data: intervene_data.combatOrganization_data,
      combatCompilation_data: intervene_data.combatCompilation_data,
      buttonProps: {
        type: "default",
        size: "small"
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
          //   self.table_height =
          //     document.getElementById("bottom_left").clientHeight - 70;
          console.log(self.table_height);
          self.timer = false;
        }, 400);
      }
    }
  },
  methods: {
    weathersChange(val){
      console.log(val);
      if(socketOpen&&ws){
        ws.send(val);
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
  }
};
</script>

<style scoped>
#atmosphereIntervention {
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
}
#atmosphereIntervention .content {
  height: calc(100% - 30px);
}
#atmosphereIntervention .bottom {
  display: flex;
  justify-content: space-between;
  /* padding-top: 10px; */
  height: calc(100% - 70px);
}
#atmosphereIntervention .bottom .bottom_left {
  width: 67%;
  height: 100%;
}
#atmosphereIntervention .bottom .bottom_left > span {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: #fff;
  padding: 0 5px;
  font-size: 16px;
  font-weight: bold;
}
#atmosphereIntervention .bottom .bottom_right {
  width: 32%;
}
#atmosphereIntervention .bottom_right .bottom_right_top {
  height: 60%;
  overflow-y: auto;
}
#atmosphereIntervention .bottom_right .bottom_right_bottom {
  height: 40%;
  padding-top: 10px;
}
#atmosphereIntervention .bottom_right_top table {
  width: 100%;
  border-collapse: collapse;
}
#atmosphereIntervention .bottom_right_top table td {
  border: 1px solid #ccc;
  padding: 2px 5px;
  width: 50%;
}
#atmosphereIntervention .bottom .bottom_center {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
  padding-right: 30px;
}
.meteorologicalEnvironment_content {
  display: flex;
  flex-wrap: wrap;
}
.meteorologicalEnvironment_content > div {
  display: flex;
  width: 100%;
}
.meteorologicalEnvironment_content > div > div {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
  margin: 10px;
}
.meteorologicalEnvironment_content > div > div > span {
  position: absolute;
  top: -15px;
  left: 10px;
  background-color: #fff;
  font-weight: bold;
  font-size: 14px;
  padding: 5px;
}
.meteorologicalEnvironment_content > div > div > table {
  width: 100%;
}
.meteorologicalEnvironment_content > div > div > table td {
  padding: 5px 10px;
}
.meteorologicalEnvironment_content > div > div > table td:nth-child(odd) {
  text-align: right;
  width: 80px;
}
</style>
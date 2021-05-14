<template>
  <div id="meteorologicalEnvironment">
    <Modal
      v-model="$store.state.meteorologicalEnvironment_dialog"
      title="气象条件诱导"
      width="40%"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <div class="meteorologicalEnvironment_content">
        <div>
          <div>
            <span>天气环境</span>
            <table>
              <tr>
                <td>天气类型：</td>
                <td>
                  <Select v-model="weatherEnvironment.weather" style="width:94%">
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
                  <Select v-model="weatherEnvironment.sunlightIntensity" style="width:94%">
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
                  <Select v-model="weatherEnvironment.whetherThereIsLightning" style="width:94%">
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
                    style="width:90%"
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
                    style="width:90%"
                  />
                  <span>OC</span>
                </td>
              </tr>
              <tr>
                <td>风向：</td>
                <td>
                  <Input
                    v-model="environmentalWind.windDirection"
                    placeholder="请输入..."
                    style="width:90%"
                  />
                  <span>OC</span>
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
                    style="width:45%"
                  />
                  <span>~</span>
                  <Input
                    v-model="cloudState.cloudHeight_end"
                    placeholder="请输入..."
                    style="width:45%"
                  />
                </td>
              </tr>
              <tr>
                <td>天空云量：</td>
                <td>
                  <Select v-model="cloudState.cloudiness" style="width:94%">
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
                  <Select v-model="cloudState.fogConcentration" style="width:94%">
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
                  <Input v-model="other.temperature" placeholder="请输入..." style="width:90%" />
                  <span>℃</span>
                </td>
              </tr>
              <tr>
                <td>相对湿度：</td>
                <td>
                  <Input v-model="other.relativeHumidity" placeholder="请输入..." style="width:90%" />
                  <span>%</span>
                </td>
              </tr>
              <tr>
                <td>可见度：</td>
                <td>
                  <Input v-model="other.visibility" placeholder="请输入..." style="width:90%" />
                  <span>m</span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" @click="load">确定</Button>
        <Button type="error" @click="cancel">退出</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      weatherEnvironment: {
        weather: "晴",
        sunlightIntensity: "",
        whetherThereIsLightning: "无"
      },
      weathers: [
        {
          label: "阴",
          value: "阴"
        },
        {
          label: "晴",
          value: "晴"
        },
        {
          label: "雨",
          value: "雨"
        },
        {
          label: "雾",
          value: "雾"
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
      }
    };
  },
  methods: {
    ok() {
      this.$store.state.meteorologicalEnvironment_dialog = false;
    },
    cancel() {
      this.$store.state.meteorologicalEnvironment_dialog = false;
    },
    load() {}
  },
  mounted() {}
};
</script>

<style scoped>
#meteorologicalEnvironment {
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
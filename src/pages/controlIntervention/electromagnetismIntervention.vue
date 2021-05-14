<template>
  <div id="electromagnetismIntervention">
    <div class="left">
      <div id="map2d"></div>
      <div style="position: absolute;top:100px;background: #fff;">
        <Select
          ref="drawSelId"
          v-model="drawmodel"
          style="width:200px"
          v-on:on-change="selChangeHandler"
        >
          <Option v-for="item in drawList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div slot="content" v-if="isDisplayChildMenu">
          <drawtoolproperties :drawtype="drawtype"></drawtoolproperties>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="electromagneticState">
        <span>电磁状态</span>
        <Table
          border
          :height="table_height"
          size="small"
          :columns="tableHeader"
          :data="table_data"
          style="height:100%"
        ></Table>
      </div>
      <div class="regionalCoordinates">
        <span>区域坐标</span>
        <div class="table_box" style="height:70%">
          <Table
            border
            :height="table_height"
            size="small"
            :columns="tableHeader2"
            :data="table_data"
            style="height:100%"
          ></Table>
        </div>
        <div class="config_box" style="height:10%">
          <div>
            <span>电磁强度：</span>
            <Select v-model="electromagneticIntensity" style="flex-grow: .9;">
              <Option
                v-for="item in electromagneticIntensitys"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
          <div>
            <span>电磁强度：</span>
            <Input v-model="regionalDescribe" placeholder="请输入..." style="flex-grow: .9;" />
          </div>
        </div>
        <div style="text-align:center;height:10%">
          <Button type="primary" @click="button_index=index">保存</Button>
        </div>
      </div>
    </div>
    <Modal v-model="addZoneProperties_modal" title="添加区域属性" @on-ok="ok">
      <div class="addZoneProperties_box">
        <table>
          <tr>
            <td>区域编号</td>
            <td>
              <Input v-model="addZoneProperties.number" placeholder="请输入..." />
            </td>
          </tr>
          <tr>
            <td>区域描述</td>
            <td>
              <Input v-model="addZoneProperties.describe" placeholder="请输入..." />
            </td>
          </tr>
          <tr>
            <td>NBC强度</td>
            <td>
              <Input v-model="addZoneProperties.strength" placeholder="请输入..." />
            </td>
          </tr>
          <tr>
            <td>经度</td>
            <td>
              <Input v-model="addZoneProperties.lon" placeholder="请输入..." />
            </td>
          </tr>
          <tr>
            <td>纬度</td>
            <td>
              <Input v-model="addZoneProperties.lat" placeholder="请输入..." />
            </td>
          </tr>
          <tr>
            <td>高度</td>
            <td>
              <Input v-model="addZoneProperties.height" placeholder="请输入..." />
            </td>
          </tr>
        </table>
      </div>
    </Modal>
  </div>
</template>

<script>
import electromagnetismIntervention_data from "@/config/electromagnetismIntervention_data";
import drawtoolproperties from "@/components/echart/drawtoolproperties";
export default {
  components: { drawtoolproperties },
  data() {
    return {
      tableHeader: electromagnetismIntervention_data.tableHeader,
      table_data: electromagnetismIntervention_data.table_data,
      tableHeader2: electromagnetismIntervention_data.tableHeader2,
      // table_data2: electromagnetismIntervention_data.table_data2,
      electromagneticIntensity: "",
      electromagneticIntensitys: [],
      regionalDescribe: "",
      isDisplayChildMenu: false,
      drawtype: "", //绘制的图形类型
      drawList: [
        {
          value: "请选择",
          label: "请选择"
        },
        {
          value: "点",
          label: "点"
        },
        {
          value: "圆",
          label: "圆"
        },
        {
          value: "栯圆",
          label: "椭圆"
        },
        {
          value: "矩形",
          label: "矩形"
        },
        {
          value: "多边形",
          label: "多边形"
        },
        {
          value: "线",
          label: "线"
        },
        {
          value: "文本",
          label: "文本"
        },
        {
          value: "框选",
          label: "框选"
        },
        {
          value: "删除",
          label: "删除"
        }
      ],
      drawmodel: "",
      //实例化测量类
      plotting: new plottingHelper({}),
      //增加ol-ex扩展
      interaction: new ol.interaction.Transform({
        enableRotatedTransform: false,
        /* Limit interaction inside bbox * /
            condition: function(e, features) {
              return ol.extent.containsXY([-465960, 5536486, 1001630, 6514880], e.coordinate[0], e.coordinate[1]);
            },
            /* */
        addCondition: ol.events.condition.shiftKeyOnly,
        // filter: function(f,l) { return f.getGeometry().getType()==='Polygon'; },
        // layers: [vector],
        hitTolerance: 2,
        translateFeature: true,
        scale: true,
        rotate: true,
        keepAspectRatio: ol.events.condition.always, // undefined,
        translate: true,
        stretch: true
      }),
      addZoneProperties_modal: false,
      addZoneProperties: {
        number: "",
        describe: "",
        strength: "",
        lon: "",
        lat: "",
        height: ""
      }
    };
  },
  watch: {},
  methods: {
    initMap() {
      let obj = {
        _center: [78.7 ,35.8],
        zoom: 14,
        divId: "map2d",
        key: "map2d"
      };
      this.map.initMap(obj);
      this.map.switchLayerEgis("map2d", "vec");
      let _this = this;
      _this.plotting._map = this.map["map2d"];

      this.map.addCircle([78.7 ,35.8],1,"map2d")
      _this.plotting.initContextMenu(); //初始化右键菜单
      //增加ol-ex扩展
      _this.plotting._map.addInteraction(_this.interaction);
      // Style handles
      _this.setHandleStyle();
      // Events handlers
      var startangle = 0;
      var d = [0, 0];

      // Handle rotate on first point
      var firstPoint = false;
      _this.interaction.on(["select"], function(e) {
        if (firstPoint && e.features && e.features.getLength()) {
          _this.interaction.setCenter(
            e.features
              .getArray()[0]
              .getGeometry()
              .getFirstCoordinate()
          );
        }
      });

      _this.interaction.on(["rotatestart", "translatestart"], function(e) {
        // Rotation
        startangle = e.feature.get("angle") || 0;
        // Translation
        d = [0, 0];
      });
      _this.interaction.on("rotating", function(e) {
        $("#info").text(
          "rotate: " +
            ((((e.angle * 180) / Math.PI - 180) % 360) + 180).toFixed(2)
        );
        // Set angle attribute to be used on style !
        e.feature.set("angle", startangle - e.angle);
      });
      _this.interaction.on("translating", function(e) {
        d[0] += e.delta[0];
        d[1] += e.delta[1];
        $("#info").text(
          "translate: " + d[0].toFixed(2) + "," + d[1].toFixed(2)
        );
        if (firstPoint) {
          _this.interaction.setCenter(
            e.features
              .getArray()[0]
              .getGeometry()
              .getFirstCoordinate()
          );
        }
      });
      _this.interaction.on("scaling", function(e) {
        $("#info").text(
          "scale: " + e.scale[0].toFixed(2) + "," + e.scale[1].toFixed(2)
        );
        if (firstPoint) {
          _this.interaction.setCenter(
            e.features
              .getArray()[0]
              .getGeometry()
              .getFirstCoordinate()
          );
        }
      });
      _this.interaction.on(["rotateend", "translateend", "scaleend"], function(
        e
      ) {
        $("#info").text("");
      });
      //this.map.setDraw("map2d")
      // this.map.addImageLayer("map2d")
    },
    selChangeHandler: function(value) {
      //下拉框选择事件
      let com = this.$refs.drawSelId;
      this.plotting.cycleChangeHandler(com, value);
      //给绘制的图形类型赋值
      this.drawtype = value;

      if (value != "请选择") {
        this.isDisplayChildMenu = true;
        this.addZoneProperties_modal = true;
      } else {
        
        this.plotting.getDrawInitValue(); //还圆线框颜色为默认值
        this.isDisplayChildMenu = false;
      }
    },
    setHandleStyle: function() {
      let _this = this;
      if (!_this.interaction instanceof ol.interaction.Transform) return;
      if (true) {
        // Style the rotate handle
        var circle = new ol.style.RegularShape({
          fill: new ol.style.Fill({ color: [255, 255, 255, 0.01] }),
          stroke: new ol.style.Stroke({ width: 1, color: [0, 0, 0, 0.01] }),
          radius: 8,
          points: 10
        });
        _this.interaction.setStyle(
          "rotate",
          new ol.style.Style({
            text: new ol.style.Text({
              text: "\u21BB",
              font: "16px Fontawesome",
              textAlign: "left",
              fill: new ol.style.Fill({ color: "red" })
            }),
            image: circle
          })
        );
        // Center of rotation
        _this.interaction.setStyle(
          "rotate0",
          new ol.style.Style({
            text: new ol.style.Text({
              text: "\u21BB",
              font: "20px Fontawesome",
              fill: new ol.style.Fill({ color: [255, 255, 255, 0.8] }),
              stroke: new ol.style.Stroke({ width: 2, color: "red" })
            })
          })
        );
        // Style the move handle
        _this.interaction.setStyle(
          "translate",
          new ol.style.Style({
            text: new ol.style.Text({
              text: "\u2744",
              font: "20px Fontawesome",
              fill: new ol.style.Fill({ color: [255, 255, 255, 0.8] }),
              stroke: new ol.style.Stroke({ width: 2, color: "red" })
            })
          })
        );
      } else {
        _this.interaction.setDefaultStyle();
      }
      // Refresh
      _this.interaction.set("translate", _this.interaction.get("translate"));
    },

    getTitle(val) {
      console.log(val);
      // this.plotting.drawName = Math.random(10);
     // this.addZoneProperties_modal = true;
    },

    ok() {
      this.table_data.push(this.addZoneProperties);
      this.plotting.drawName = this.addZoneProperties.describe
      this.addZoneProperties = {
        number: "",
        describe: "",
        strength: "",
        lon: "",
        lat: "",
        height: ""
      };
    }
  },
  mounted() {
    this.initMap();
    this.plotting.toInit();
    this.plotting.callback = this.getTitle;
  }
};
</script>

<style scoped>
#electromagnetismIntervention {
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-between;
}
.left {
  width: 70%;
  height: 100%;
}
#map2d {
  position: relative;
  width: 100%;
  height: 100%;
}
.right {
  width: 29%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.right > div {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  padding-top: 20px;
  position: relative;
  height: 49%;
  width: 100%;
}
.right > div > span {
  position: absolute;
  top: -10px;
  left: 10px;
  background-color: #fff;
  padding: 0 5px;
  font-size: 16px;
  font-weight: bold;
}
.regionalCoordinates > div {
  margin: 10px 0;
}
.config_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.config_box > div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 49%;
}
.config_box > div > span {
  width: 100px;
}
.addZoneProperties_box table {
  width: 100%;
  border-collapse: collapse;
}
.addZoneProperties_box table td {
  border: 1px solid #ccc;
  padding: 10px;
  width: 70%;
}
.addZoneProperties_box table td:nth-child(odd) {
  text-align: right;
  font-size: 14px;
  font-weight: bold;
  background-color: #f1f1f1;
  width: 20%;
}
</style>
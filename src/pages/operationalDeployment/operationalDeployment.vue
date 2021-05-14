<template>
  <div id="operationalDeployment">
    <header>
      <span>想定</span>
      <Select v-model="scenario" style="width: 200px" @on-change="addLayer">
        <Option
          v-for="item in scenarios"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</Option
        >
      </Select>
      <!-- <span>制作</span>
      <Select v-model="make" style="width:200px">
        <Option v-for="item in makes" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <span>显示</span>
      <Select v-model="display" style="width:200px">
        <Option v-for="item in displays" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <span>地图操作</span>
      <Select v-model="mapOperation" style="width:200px">
        <Option v-for="item in mapOperations" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>-->
    </header>
    <div class="content">
      <div class="left demo-tabs-style1">
        <Tabs type="card">
          <TabPane label="编成">
            <Tree
              :data="combatCompilation_data"
              :render="renderContent"
              class="demo-tree-render"
            ></Tree>
          </TabPane>
          <TabPane label="态势">
            <Tree
              :data="combatTaishi_data"
              :render="renderContent"
              class="demo-tree-render"
            ></Tree>
          </TabPane>
          <TabPane label="编组">
            <Tree
              :data="combatGroup_data"
              :render="renderContent"
              class="demo-tree-render"
            ></Tree>
          </TabPane>
        </Tabs>
      </div>
      <div id="map2d"></div>
    </div>
  </div>
</template>

<script>
import operationalDeployment_data from "@/config/operationalDeployment_data";
export default {
  data() {
    return {
      scenario: "",
      scenarios: [
        {
          label: "印巴想定1",
          value: "印巴想定1",
        },
        {
          label: "HB想定1",
          value: "HB想定1",
        },
        {
          label: "泄露想定1",
          value: "泄露想定1",
        },
      ],
      make: "",
      makes: [
        {
          label: "制作1",
          value: "制作1",
        },
        {
          label: "制作2",
          value: "制作2",
        },
        {
          label: "制作3",
          value: "制作3",
        },
      ],
      display: "",
      displays: [
        {
          label: "显示1",
          value: "显示1",
        },
        {
          label: "显示2",
          value: "显示2",
        },
        {
          label: "显示3",
          value: "显示3",
        },
      ],
      mapOperation: "",
      mapOperations: [
        {
          label: "地图操作1",
          value: "地图操作1",
        },
        {
          label: "地图操作2",
          value: "地图操作2",
        },
        {
          label: "地图操作3",
          value: "地图操作3",
        },
      ],
      tree_data: operationalDeployment_data.tree_data,
      combatTaishi_data: "",
      combatCompilation_data: "",
      combatGroup_data: "",
      buttonProps: {
        type: "default",
        size: "small",
      },
    };
  },
  watch: {},
  methods: {
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%",
          },
        },
        [
          h("span", [h("span", data.title)]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px",
              },
            },
            [
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps, {
                    type: "primary",
                  }),
                  style: {
                    marginRight: "8px",
                  },
                  on: {
                    click: () => {
                      this.edit(data);
                    },
                  },
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps, {
                    type: "error",
                  }),
                  on: {
                    click: () => {
                      this.remove(root, node, data);
                    },
                  },
                },
                "删除"
              ),
            ]
          ),
        ]
      );
    },
    edit(data) {
      console.log(data);
      var oldValue = data.title;
      this.$Modal.confirm({
        title: "Title",
        render: (h) => {
          return h("Input", {
            props: {
              value: data.title,
              autofocus: true,
              placeholder: "请输入...",
            },
            on: {
              input: (val) => {
                data.title = val;
              },
            },
          });
        },
      });
      return;
      const children = data.children || [];
      children.push({
        title: "appended node",
        expand: true,
      });
      this.$set(data, "children", children);
    },
    remove(root, node, data) {
      const parentKey = root.find((el) => el === node).parent;
      const parent = root.find((el) => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    },
    addLayer(val) {
      if (val == "印巴想定1") {
        let url = "./static/img/IB.png";
        let extent = [63.82409, 25.891786, 88.657235, 36.055921];
        this.map.addImageLayer("map2d", url, extent);
        this.combatTaishi_data = operationalDeployment_data.combatGroup_data;
        this.combatCompilation_data =
          operationalDeployment_data.combatCompilation_data;
        this.combatGroup_data = operationalDeployment_data.combatGroup_data;
      } else if (val == "HB想定1") {
        let url = "./static/img/HB1.png";
        let extent = [72.965493, 31.89699, 82.091804, 38.035994];
        this.map.addImageLayer("map2d", url, extent);
        this.combatTaishi_data = operationalDeployment_data.HBcombatGroup_data;
        this.combatCompilation_data =
          operationalDeployment_data.HBcombatCompilation_data;
        this.combatGroup_data = operationalDeployment_data.HBcombatGroup_data;
        // this.map.addText("map2d",[82.091804,38.035994])
      } else if (val == "泄露想定1") {
        let url = "./static/img/XL1.png";
        let extent = [118.686268, 34.094136, 119.057784, 34.263259];
        this.map.addImageLayer("map2d", url, extent);
        let _center = ol.proj.transform(
          [118.865793, 34.186787],
          "EPSG:4326",
          "EPSG:3857"
        );
        this.map["map2d"].getView().setCenter(_center);
        this.map["map2d"].getView().setZoom(11);
        this.combatTaishi_data = operationalDeployment_data.XLcombatGroup_data;
        this.combatCompilation_data =
          operationalDeployment_data.XLcombatGroup_data;
        this.combatGroup_data = operationalDeployment_data.XLcombatGroup_data;
      }
      // this.map.addImageLayer("map2d");
    },
    initMap() {
      let obj = {
        _center: [77, 30],
        zoom: 6,
        divId: "map2d",
        key: "map2d",
      };
      this.map.initMap(obj);
      this.map.switchLayerEgis("map2d", "vec");
    },
  },
  mounted() {
    this.initMap();
    this.$Message.config({
      top: 100,
      duration: 3,
    });
  },
};
</script>

<style scoped>
#operationalDeployment {
  height: 100%;
  width: 100%;
  padding: 15px;
}
.content {
  display: flex;
  height: calc(100% - 32px);
  padding-top: 10px;
}
.left {
  width: 340px;
  /* border: 1px solid #ccc; */
  padding: 0 10px;
  margin-right: 10px;
}
#map2d {
  width: calc(100% - 340px);
  height: 100%;
  border: 1px solid #ccc;
}
</style>
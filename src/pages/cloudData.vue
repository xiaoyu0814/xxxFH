<template>
  <div id="cloudData">
    <div class="content">
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
          label: "想定1",
          value: "想定1"
        }
      ],
      make: "",
      makes: [
        {
          label: "制作1",
          value: "制作1"
        },
        {
          label: "制作2",
          value: "制作2"
        },
        {
          label: "制作3",
          value: "制作3"
        }
      ],
      display: "",
      displays: [
        {
          label: "显示1",
          value: "显示1"
        },
        {
          label: "显示2",
          value: "显示2"
        },
        {
          label: "显示3",
          value: "显示3"
        }
      ],
      mapOperation: "",
      mapOperations: [
        {
          label: "地图操作1",
          value: "地图操作1"
        },
        {
          label: "地图操作2",
          value: "地图操作2"
        },
        {
          label: "地图操作3",
          value: "地图操作3"
        }
      ],
      tree_data: operationalDeployment_data.tree_data,
      combatTaishi_data: "",
      combatCompilation_data: "",
      combatGroup_data: "",
      buttonProps: {
        type: "default",
        size: "small"
      }
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
    },
    addLayer() {
      this.map.addImageLayer("map2d");
      this.combatTaishi_data = operationalDeployment_data.combatGroup_data;
      this.combatCompilation_data =
        operationalDeployment_data.combatCompilation_data;
      this.combatGroup_data = operationalDeployment_data.combatGroup_data;
    },
    initMap() {
      let obj = {
        center: [77, 30],
        zoom: 6,
        containerid: "map2d",
        key: "map2d"
      };
      this.map.initMap3D(obj);
      this.map.addTileSanmen()
     // this.map.switchLayerEgis("map2d", "vec");
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>

<style scoped>
#cloudData {
  height: 100%;
  width: 100%;
  /* padding: 15px; */
}
.content {
  display: flex;
  height: 100%;
  /* padding-top: 10px; */
}
.left {
  width: 340px;
  /* border: 1px solid #ccc; */
  padding: 0 10px;
  margin-right: 10px;
}
#map2d {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
}
</style>
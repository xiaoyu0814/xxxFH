<template>
  <div id="missionPlanning">
    <div id="map2d"></div>
    <div class="taskList">
      <div class="tree_box">
        <Tree :data="combatOrganization_data" :render="renderContent"></Tree>
      </div>
      <div class="addNode">
        <Button type="primary" @click="createNode_modal=true" long>增加根节点</Button>
      </div>
    </div>
    <drawArmySign :map="map" ref="drawArmySign"></drawArmySign>
    <Modal v-model="createNode_modal" title="新增根节点" @on-ok="ok" @on-cancel="cancel">
      <div class="nodeInfo_box">
        节点名称：
        <Input v-model="nodeName" placeholder="请输入..." style="width: 80%" />
      </div>
    </Modal>
    <Modal v-model="createChildrenNode_modal" title="新增子节点" @on-ok="append" @on-cancel="cancel">
      <div class="nodeInfo_box">
        节点名称：
        <Input v-model="childrenNodeName" placeholder="请输入..." style="width: 80%" />
      </div>
    </Modal>
  </div>
</template>

<script>
import drawArmySign from "@/components/drawArmySign";
import missionPlanning_data from "@/config/missionPlanning_data";

export default {
  components: {
    drawArmySign
  },
  data() {
    return {
      combatOrganization_data: missionPlanning_data.combatOrganization_data,
      createNode_modal: false,
      createChildrenNode_modal: false,
      nodeName: "",
      childrenNodeName:""
    };
  },
  methods: {
    ok() {
      if (this.nodeName === "") {
        this.$Message.info("节点单名称不能为空");
        return;
      }
      let temp = {
        title: this.nodeName,
        expand: true
      };
      this.combatOrganization_data.push(temp);
    },
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          },
          attrs: {
            draggable: "true"
          },
          on: {
            dragstart: () => this.handleDragStart(root, node, data),
            dragover: () => this.handleDragOver(root, node, data),
            dragend: () => this.handleDragEnd(root, node, data),
            drop: () => this.handleDrop(root, node, data)
          }
        },
        [
          h("span", [
            h("span", { on: { click: () => this.show(data) } }, data.title)
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                marginRight: "32px",
                marginLeft: "10px"
              }
            },
            [
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-create",
                  shape: "circle"
                }),
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    this.createChildrenNode_modal = true
                    this.nodeData = data
                    // this.append(data);
                  }
                }
              }),
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-remove",
                  shape: "circle"
                }),
                on: {
                  click: () => {
                    this.remove(root, node, data);
                  }
                }
              })
            ]
          )
        ]
      );
    },
    append(data) {
      const children = this.nodeData.children || [];
      children.push({
        title: this.childrenNodeName,
        expand: true
      });
      this.$set(this.nodeData, "children", children);
    },
    remove(root, node, data) {
      const parentKey = root.find(el => el === node).parent;
      const parent = root.find(el => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    },
    initMap() {
      let obj = {
        _center: [118.865793,34.186787],
        zoom: 12,
        divId: "map2d",
        key: "map2d"
      };
      this.map.initMap(obj);
      this.map.switchLayerEgis("map2d", "vec");
      this.map.setDraw("map2d");

      if(this.$store.state.fenzu == 3){
        let url = "./static/img/XL2.png"
        let extent= [118.686268,34.094136,119.057784,34.263259]
        this.map.addImageLayer("map2d",url,extent);
      }
      // this.$refs.drawArmySign.addMoveInteraction()
     
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>

<style scoped>
#missionPlanning {
  width: 100%;
  height: 100%;
  position: relative;
}
#map2d {
  width: 100%;
  height: 100%;
  position: absolute;
}
.bottom_box {
  height: 250px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #fff;
  padding: 10px;
}
.taskList {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 300px;
  background-color: #fff;
  padding: 10px;
}
.tree_box {
  height: calc(100% - 30px - 20px);
  overflow: hidden auto;
}
.addNode {
  position: absolute;
  bottom: 10px;
  height: 30px;
  width: calc(100% - 20px);
  /* text-align: center; */
}
</style>
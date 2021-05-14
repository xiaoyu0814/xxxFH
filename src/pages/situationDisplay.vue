<template>
  <div id="situationDisplay">
    <div id="map2d">
      <!-- <img src="static/img/showIB.png" alt /> -->
    </div>
    <div class="table_box">
      <div class="blueTeam" id="top_box">
        <span>{{blueName}}</span>
        <Table
          border
          :height="top_table_height"
          size="small"
          :columns="tableHeader"
          :data="blueTeam_table_data"
          style="height:100%"
        ></Table>
      </div>
      <div class="brownTeam" id="bottom_box" v-show="brownTeam">
        <span>褐方兵力</span>
        <Table
          border
          :height="bottom_table_height"
          size="small"
          :columns="tableHeader"
          :data="brownTeam_table_data"
          style="height:100%"
        ></Table>
      </div>
    </div>
  </div>
</template>

<script>
import ImageManager from "@/../static/js/ImageManager";
export default {
  data() {
    return {
      blueName:"蓝方兵力",
      top_table_height: "",
      bottom_table_height: "",
      tableHeader: [
        {
          title: "序号",
          type: "index",
          width: 65,
          align: "center"
        },
        {
          title: "装备名称",
          key: "name"
        },
        {
          title: "装备数量",
          key: "number"
        }
      ],
      brownTeam:true,
      blueTeam_table_data: [
        { name: "费尔康预警机", number: 2 },
        { name: "幻影2000", number: 3 },
        { name: "苍鹭无人机", number: 1 }
      ],
      brownTeam_table_data: [
        { name: "75毫米防空炮", number: 15 },
        { name: "R-440型防控导弹", number: 5 },
        { name: "安札近程地对空导弹", number: 10 }
      ]
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
          self.top_table_height = document.getElementById(
            "top_box"
          ).clientHeight;
          self.bottom_table_height = document.getElementById(
            "bottom_box"
          ).clientHeight;
          self.timer = false;
        }, 400);
      }
    }
  },
  methods: {
    initMap() {

      if(this.$store.state.fenzu == 3){
          let obj = {
          _center: [118.865793,34.186787],
          zoom: 12,
          divId: "map2d",
          key: "map2d"
        };
        this.map.initMap(obj);
        this.map.switchLayerEgis("map2d", "vec");
        let url = "./static/img/XL2.png"
          let extent= [118.686268,34.094136,119.057784,34.263259]
          this.map.addImageLayer("map2d",url,extent);
          this.blueName = "我方";
          this.blueTeam_table_data = [
            {
              name: "气象观测车",
              number: 1,
            },
            {
              name: "指挥车",
              number: 1,
            },
            {
              name: "化验车",
              number: 1,
            },
            {
              name: "洗消车",
              number: 2,
            },
            {
              name: "喷洒车",
              number: 3,
            },
            {
              name: "工程机械",
              number: 5,
            }

          ]
          this.brownTeam = false

      }else{
        let obj = {
          _center: [77, 34],
          zoom: 7,
          divId: "map2d",
          key: "map2d"
        };
        this.map.initMap(obj);
        this.map.switchLayerEgis("map2d", "vec");
        let url ="./static/img/HB2.png"
        let extent=[72.965493,31.896990,82.091804,38.035994]
        this.map.addImageLayer("map2d",url,extent);
       
        // let obj = {
        //   center: [77, 30],
        //   zoom: 6,
        //   containerid: "map2d",
        //   key: "map2d"
        // };
        // this.map.initMap3D(obj);
        // let url = "./static/img/HB2.png"
        // let extent= [72.965493,31.896990,82.091804,38.035994]
        // this.map.addImage3D(url,extent)
        // this.map.addTiles();


        // var imgManager = new ImageManager();
        // imgManager.addImageData("static/img/showIB.png", "map2d");
      }
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
    this.initMap();
   
   
    // console.log(imgManager);
  }
};
</script>

<style scoped>
#situationDisplay {
  width: 100%;
  height: 100%;
  position: relative;
}
#map2d {
  position: absolute;
  width: 100%;
  height: 100%;
}
#map2d > img {
  width: 100%;
  height: 100%;
}
.table_box {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 400px;
  background-color: #fff;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
}
.table_box > div {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  padding-top: 20px;
  position: relative;
  height: 49%;
}
.table_box > div > span {
  position: absolute;
  top: -14px;
  left: 10px;
  font-size: 18px;
  font-weight: bold;
  background-color: #fff;
  padding: 0 5px;
}
</style>
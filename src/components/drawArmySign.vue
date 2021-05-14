<template>
  <div
    id="drawArmySign"
    ref="box"
    @mousedown="mouseDownHandleelse($event)"
    @mouseup="mouseUpHandleelse($event)"
  >
    <p>{{title}}</p>
    <div style="margin-top:10px">
      <Select v-model="father_value" style="width:230px" @on-change="change_father">
        <Option v-for="(item, index) in father_list" :value="item.name" :key="index">{{ item.name }}</Option>
      </Select>
    </div>
    <div style="margin-top:10px">
      <Select v-model="children_value" style="width:230px" @on-change="change_children">
        <Option
          v-for="(item, index) in children_list"
          :value="item.name"
          :key="index"
        >{{ item.name }}</Option>
      </Select>
    </div>
    <ul class="icon_box">
      <li
        v-for="(item, index) in img_list"
        :key="index"
        @click="setPlotCode(item,index)"
        :class="img_index===index?'select':''"
      >
        <img :src="item.url" style="margin-right:10px" />
        <span>{{item.newName}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import armySign_list from "@/utils/Config";
import { getData } from "@/utils/utils";
export default {
  props: ["map"],
  data() {
    return {
      title: "军标绘制",
      moveDataelse: {
        x: null,
        y: null
      },
      father_value: "",
      father_list: armySign_list.config,
      children_value: "",
      children_list: "",
      img_index: -1,
      img_list: "",
      code: "",
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
    };
  },
  methods: {
    setPlotCode(item,index){
      console.log(item.codeId)
      this.code = item.codeId
      this.img_index = index
      let _url = this.map.DrawPlot.numUrl + item.codeId;
      this.map.DrawPlot.points = [];
      let _this = this;
      getData(_url).then(res => {
        _this.map.DrawPlot.plotCode = _this.code;

        _this.map.DrawPlot.codeMinNum = res.min;
        _this.map.DrawPlot.codeMaxNum = res.max;
      });
    },
    change_father(val) {
      this.children_value = "";
      this.children_list = "";
      this.img_list = "";
      if (val === "temp" || val === "基本图元") {
        this.father_list.forEach(item => {
          if (item.name === val) {
            this.img_list = this.splitString(item.children);
          }
        });
      } else {
        this.father_list.forEach(item => {
          if (item.name === val) {
            this.children_list = item.children;
            this.children_value = item.children[0].name;
            this.change_children(this.children_list[0].name);
          }
        });
      }
    },
    change_children(val) {
      this.children_list.forEach(item => {
        if (item.name === val) {
          this.img_list = this.splitString(item.children);
        }
      });
    },
    splitString(arr) {
      arr.forEach(item => {
        item.newName = item.codeName.split(".")[0];
      });
      return arr;
    },
    mouseDownHandleelse(event) {
      this.moveDataelse.x = event.pageX - this.$refs.box.offsetLeft;
      this.moveDataelse.y = event.pageY - this.$refs.box.offsetTop;
      event.currentTarget.style.cursor = "move";
      window.onmousemove = this.mouseMoveHandleelse;
    },
    mouseMoveHandleelse(event) {
      let moveLeft = event.pageX - this.moveDataelse.x + "px";
      let moveTop = event.pageY - this.moveDataelse.y + "px";
      this.$refs.box.style.left = moveLeft;
      this.$refs.box.style.top = moveTop;
      event.currentTarget.style.cursor = "move";
    },
    mouseUpHandleelse(event) {
      window.onmousemove = null;
      event.currentTarget.style.cursor = "default";
    }, 
    addMoveInteraction(){
      var app = {};
      let _this = this;
      app.Drag = function() {
 
        ol.interaction.Pointer.call(this, {
          handleDownEvent: app.Drag.prototype.handleDownEvent,
          handleDragEvent: app.Drag.prototype.handleDragEvent,
          handleMoveEvent: app.Drag.prototype.handleMoveEvent,
          handleUpEvent: app.Drag.prototype.handleUpEvent
        });
 
        this.coordinate_ = null;
 
        this.cursor_ = 'pointer';
 
        this.feature_ = null;
 
        this.previousCursor_ = undefined;
 
      };
      ol.inherits(app.Drag, ol.interaction.Pointer);
 
      app.Drag.prototype.handleDownEvent = function(evt) {
        var map = evt.map;
 
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function(feature) {
              return feature;
            });
 
        if (feature) {
          _this.map.DrawPlot.endDraw = true;
        	 var geom = (feature.getGeometry());
             if (geom instanceof ol.geom.MultiPolygon) {
               return;
             } else if (geom instanceof ol.geom.LineString) {
               return;
             }else{
             	this.coordinate_ = evt.coordinate;
              // alert(evt.coordinate[0]);
              this.feature_ = feature;
             }
        }
        return !!feature;
      };
 
      app.Drag.prototype.handleDragEvent = function(evt) {
        console.log("handleDragEvent")
        var deltaX = evt.coordinate[0] - this.coordinate_[0];
        var deltaY = evt.coordinate[1] - this.coordinate_[1];
 
        var geometry = this.feature_.getGeometry();
        geometry.translate(deltaX, deltaY);
 
        this.coordinate_[0] = evt.coordinate[0];
        this.coordinate_[1] = evt.coordinate[1];
      };
 
      app.Drag.prototype.handleMoveEvent = function(evt) {
      	console.log("handleMoveEvent")
        if (this.cursor_) {
          var map = evt.map;
          var feature = map.forEachFeatureAtPixel(evt.pixel,
              function(feature) {
              	//alert("handleMoveEvent");
                return feature;
              });
          var element = evt.map.getTargetElement();
          if (feature) {
            if (element.style.cursor != this.cursor_) {
              this.previousCursor_ = element.style.cursor;
              element.style.cursor = this.cursor_;
            }
          } else if (this.previousCursor_ !== undefined) {
            element.style.cursor = this.previousCursor_;
            this.previousCursor_ = undefined;
          }
        }
      };
 
      app.Drag.prototype.handleUpEvent = function(evt) {
        //拖动以后触发操作
         _this.map.DrawPlot.endDraw = false;
    	var stationnum = this.feature_.U.StationNum;
        this.coordinate_ = null;
        this.feature_ = null;
        //alert("handleUpEvent"+evt.coordinate[1]);
        var laAndLo = excuteExtent(evt);
        
    	stationnumArr.push(stationnum);
    	LoAndLaArr.push(laAndLo);
        //updateLoAnaLa(laAndLo,stationnum);
        
        return false;
      };
      var appD = new app.Drag();
      //将交互添加到map中
  	  this.map["map2d"].addInteraction(appD);
      }
  },
  mounted() {
    console.log(this.map);
    // this.addMoveInteraction();
  }
};
</script>

<style scoped>
#drawArmySign {
  position: fixed;
  top: 100px;
  left: 80%;
  padding: 20px;
  background-color: #f1f1f1;
  color: #000;
  user-select: none;
}
#drawArmySign p {
  /* color: #000; */
  font-size: 16px;
  font-weight: bold;
}
.icon_box {
  margin-top: 10px;
  max-height: 200px;
  overflow: auto;
  border: 1px solid #ccc;
}
.icon_box li {
  display: flex;
  align-items: center;
}
.icon_box .select {
  background-color: rgb(74, 92, 255);
  color: #fff;
  font-weight: bold;
}
</style>
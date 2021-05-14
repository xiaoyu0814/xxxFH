<template>
  <div v-if="drawtype === '点'">
    <InputNumber :max="100" :min="1" :step="1" v-model="point_drawdynamic" size="small" v-on:on-change="handle('点', $event)"></InputNumber>
    <ColorPicker v-model="pointColorId" recommend v-on:on-change="handleFillColor('点', $event)"/>
  </div>
  <div v-else-if="drawtype === '圆'">
    <InputNumber :max="100" :min="1" :step="1" v-model="circle_borderWidthId" size="small" v-on:on-change="handle('圆', $event)"></InputNumber>
    <ColorPicker v-model="circle_borderColorId" recommend v-on:on-change="handleBorderColor('圆', $event)"/>
    <ColorPicker v-model="circle_fillColorId" recommend v-on:on-change="handleFillColor('圆', $event)"/>
    <Checkbox v-model="circle_isFillId" v-on:on-change="handleIsFill('圆', $event)">填充</Checkbox>
  </div>
  <div v-else-if="drawtype === '栯圆'">
    <InputNumber :max="100" :min="1" :step="1" v-model="ellipse_borderWidthId" size="small" v-on:on-change="handle('栯圆', $event)"></InputNumber>
    <ColorPicker v-model="ellipse_borderColorId" recommend v-on:on-change="handleBorderColor('栯圆', $event)"/>
    <ColorPicker v-model="ellipse_fillColorId" recommend v-on:on-change="handleFillColor('栯圆', $event)"/>
    <Checkbox v-model="ellipse_isFillId" v-on:on-change="handleIsFill('栯圆', $event)">填充</Checkbox>
  </div>
  <div v-else-if="drawtype === '矩形'">
    <InputNumber :max="100" :min="1" :step="1" v-model="rectangle_borderWidthId" size="small" v-on:on-change="handle('矩形', $event)"></InputNumber>
    <ColorPicker v-model="rectangle_borderColorId" recommend v-on:on-change="handleBorderColor('矩形', $event)"/>
    <ColorPicker v-model="rectangle_fillColorId" recommend v-on:on-change="handleFillColor('矩形', $event)"/>
    <Checkbox v-model="rectangle_isFillId" v-on:on-change="handleIsFill('矩形', $event)">填充</Checkbox>
  </div>
  <div v-else-if="drawtype === '多边形'">
    <InputNumber :max="100" :min="1" :step="1" v-model="polygon_borderWidthId" size="small" v-on:on-change="handle('多边形', $event)"></InputNumber>
    <ColorPicker v-model="polygon_borderColorId" recommend v-on:on-change="handleBorderColor('多边形', $event)"/>
    <ColorPicker v-model="polygon_fillColorId" recommend v-on:on-change="handleFillColor('多边形', $event)"/>
    <Checkbox v-model="polygon_isFillId" v-on:on-change="handleIsFill('多边形', $event)">填充</Checkbox>
  </div>
  <div v-else-if="drawtype === '线'">
    <InputNumber :max="100" :min="1" :step="1" v-model="line_drawdynamic" size="small" v-on:on-change="handle('线', $event)"></InputNumber>
    <ColorPicker v-model="lineColorId" recommend v-on:on-change="handleFillColor('线', $event)"/>
  </div>
  <div v-else-if="drawtype==='文本'">
    <InputNumber :max="100" :min="1" :step="1" v-model="txt_drawdynamic" size="small" v-on:on-change="handle('文本', $event)"></InputNumber>
    <ColorPicker v-model="txtColorId" recommend v-on:on-change="handleFillColor('文本', $event)"/>
    <Checkbox v-model="chk_txt_fill" v-on:on-change="handleIsFill('文本', $event)">加粗</Checkbox>
  </div>
  <div v-else>

  </div>
</template>

<script>
    export default {
      name: "drawtoolproperties",
      props:["drawtype"],
      data () {
        return {
          point_drawdynamic: 10,//点的大小
          pointColorId: '#ff0000',//点的颜色
          circle_borderWidthId:2,//圆的边框粗细
          circle_borderColorId:'#2EC1FD',//圆的边框颜色
          circle_fillColorId:'#2EC1FD',//圆的填充颜色
          circle_isFillId:false,//是否进行填充
          ellipse_borderWidthId:2,//椭圆的边框粗细
          ellipse_borderColorId:'#2EC1FD',//椭圆的边框颜色
          ellipse_fillColorId:'#2EC1FD',//椭圆的填充颜色
          ellipse_isFillId:false,//是否进行填充
          rectangle_borderWidthId:2,//矩形的边框粗细
          rectangle_borderColorId:'#2EC1FD',//矩形的边框颜色
          rectangle_fillColorId:'#2EC1FD',//矩形的填充颜色
          rectangle_isFillId:false,//是否进行填充
          polygon_borderWidthId:2,//椭圆的边框粗细
          polygon_borderColorId:'#2EC1FD',//椭圆的边框颜色
          polygon_fillColorId:'#2EC1FD',//椭圆的填充颜色
          polygon_isFillId:false,//是否进行填充
          line_drawdynamic:3,//线的粗细
          lineColorId:'#2EC1FD',//线的颜色
          txt_drawdynamic:24,//文本的大小
          txtColorId:'#000',//文本的颜色
          chk_txt_fill:false,//文本是否加粗
        }
      },
      methods:{
        handle:function (text,value) {//处理图形大小或边框线大小
         let plotting= this.$parent.plotting;
          if (text == "点") {
            plotting.propertyObj.pointWidth =value;
          }
          else if (text == "圆") {
            plotting.propertyObj.circle_borderWidth =value;
          }
          else if (text == "栯圆") {
            plotting.propertyObj.ellipse_borderWidth =value;
          }
          else if (text == "矩形") {
            plotting.propertyObj.rectangle_borderWidth = value;
          }
          else if (text == "多边形") {
            plotting.propertyObj.polygon_borderWidth =value;
          }
          else if (text == "线") {
            plotting.propertyObj.lineWidth = value;
          }
          else if (text == "文本") {
            plotting.markTextStyle.font=plotting.markTextStyle.font.replace(plotting.markTextStyle.font.split(" ")[1],value+"px");
          } else {

          }
        },
        handleBorderColor:function (text,value) {//处理填充色
          let plotting= this.$parent.plotting;
          if (text == "圆") {
            plotting.propertyObj.circle_borderColor =value;
          }
          else if (text == "栯圆") {
            plotting.propertyObj.ellipse_borderColor =value;
          }
          else if (text == "矩形") {
            plotting.propertyObj.rectangle_borderColor = value;
          }
          else if (text == "多边形") {
            plotting.propertyObj.polygon_borderColor =value;
          }
          else {

          }
        },
        handleFillColor:function (text,value) {//处理填充色
        let plotting= this.$parent.plotting;
        if (text == "点") {
          plotting.propertyObj.pointColor =value;
        }
        else if (text == "圆") {
          plotting.propertyObj.circle_fillColor =value;
        }
        else if (text == "栯圆") {
          plotting.propertyObj.ellipse_fillColor =value;
        }
        else if (text == "矩形") {
          plotting.propertyObj.rectangle_fillColor = value;
        }
        else if (text == "多边形") {
          plotting.propertyObj.polygon_fillColor =value;
        }
        else if (text == "线") {
          plotting.propertyObj.lineColor = value;
        }
        else if (text == "文本") {
          plotting.markTextStyle.color=value;
        } else {

        }
      },
        handleIsFill:function (text,value) {//处理是否填充
          let plotting= this.$parent.plotting;
           if (text == "圆") {
            plotting.propertyObj.circle_isFill =value;
          }
          else if (text == "栯圆") {
            plotting.propertyObj.ellipse_isFill =value;
          }
          else if (text == "矩形") {
            plotting.propertyObj.rectangle_isFill = value;
          }
          else if (text == "多边形") {
            plotting.propertyObj.polygon_isFill =value;
          }
          else if (text == "文本") {//文本是否加粗
             if(value){
               plotting.markTextStyle.font=plotting.markTextStyle.font.replace(plotting.markTextStyle.font.split(" ")[0],"bold");
             }else {
               plotting.markTextStyle.font=plotting.markTextStyle.font.replace(plotting.markTextStyle.font.split(" ")[0],"normal");
             }

          } else {

          }
        }
          }
      }
</script>

<style scoped>

</style>

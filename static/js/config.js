// var PlotIP = "http://172.16.10.119:8080";
var PlotIP = "http://10.1.30.91:8080";
// var MapURL = "http://piecloud.piesat.cn/dataservices/service/v1/tile?map=GFImage&x={x}&y={y}&z={z}&access_token=GxnPHraP73Z0THbB0VnW0dJQebQiEqW0"
// var MapURL = "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
// var MapURL = "http://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&g={g}"
var MapURL = "http://piecloud.piesat.cn/dataservices/service/v1/tile?map=mapbox_earth&access_token=&x={x}&y={y}&z={z}"

var cloudData ="SanMenXian";
var getCloudData = "SanMenXian";
var fenzu =2;
var socketOpen = false;
var ws = new WebSocket("ws://172.16.10.132:500"); 
//申请一个WebSocket对象，参数是服务端地址，同http协议使用http://开头一样，WebSocket协议的url使用ws://开头，另外安全的WebSocket协议使用wss://开头
ws.onopen = function(){
　　//当WebSocket创建成功时，触发onopen事件
   console.log("open");
   socketOpen = true;
　//　ws.send("hello"); //将消息发送到服务端
}

ws.onclose = function(e){
　　//当客户端收到服务端发送的关闭连接请求时，触发onclose事件
    socketOpen = false;
　　console.log("close");
}
ws.onerror = function(e){
　　//如果出现连接、处理、接收、发送数据失败的时候触发onerror事件
    socketOpen = false;
　　console.log(e);
}

function getPolygon(){

}
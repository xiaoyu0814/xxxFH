import {getData} from "./utils"
var DrawPlot = function(map){
	this.code = 12;//12,21509,13,30213,40203,40202,4010601
	this.pointNum = 1;
    this.color = "#ff0000"
    this.map = map;
    this.plotCode = 40203
    let _this = this;
    this.codeMinNum = 2;
    this.codeMaxNum = 255;
    this.points = [];
    this.callback = "";
    this.endDraw = false;
    this.numUrl = PlotIP + "/PathNative/service/analysisMaxMin.do?code="
    this.map.on("click",function(e){
        console.log(e);
        e.preventDefault();
        _this.onClick(e,_this.plotCode)
    })
    $(this.map.getViewport()).on("contextmenu", function(e){
        e.preventDefault();
        console.log(e);
        let coordinate=_this.map.getEventCoordinate(e);
        let temp = {
            map : _this.map,
            coordinate:coordinate
        }
        _this.drawEnd(temp,_this.plotCode)
        console.log("结束绘制",coordinate)
     })
};
const Ridus = 6378137
const EARTH_CIRCUM = 2*Math.PI*Ridus;


var plotColor = "#ff0000"
DrawPlot.prototype.drawEnd = function (e,plotCode){
    let points = e.coordinate;
    if(this.endDraw) return
    if(this.codeMinNum== 1){
        
    }else {
        this.points.push(points);
        let _this = this;
        if(this.points.length>=this.codeMinNum ){
            let urls = PlotIP + "/PathNative/service/analysis.do?code=" + plotCode + "&points=" +this.points.toString()+ "&unitlength=" +getR(e.map)
            getData(urls).then(res=>{
                console.log(res);
                setLine(res,e.map)
                _this.points = [];
                if(_this.callback){
                    _this.callback(plotCode,this.points)
                }
            });
        }
        
    }
   
}
DrawPlot.prototype.onClick = function (e,plotCode){
    console.log(e);
    if(this.endDraw) return
    let points = e.coordinate;
    if(this.codeMinNum== 1){
        let _this = this;
        let urls = PlotIP +"/PathNative/service/analysis.do?code=" + plotCode + "&points=" +points+ "&unitlength=" +getR(e.map)
        getData(urls).then(res=>{
            console.log(res);
            setLine(res,e.map)
            _this.points = [];
            if(_this.callback){
                _this.callback(plotCode,points)
            }
        })
    }else {
        this.points.push(points);
        let _this = this;
        if(this.points.length == this.codeMaxNum){
            let urls = PlotIP + "/PathNative/service/analysis.do?code=" + plotCode + "&points=" +this.points.toString()+ "&unitlength=" +getR(e.map)
            getData(urls).then(res=>{
                console.log(res);
                setLine(res,e.map)
                _this.points = [];
                if(_this.callback){
                    _this.callback(plotCode)
                }
            });
        }
        
    }
   
}
function getR(map){
    
    return EARTH_CIRCUM/((1 << Math.floor(map.getView().getZoom())) * 256)
}
function setLine(datas,map){

    let _lineFeatures = {
        type:"FeatureCollection",
        features:[],
    }
   for(let i=0;i<datas.paths.length;i++){
       let plotElements = datas.paths[i].plotElements;
       let _lineFeature = {
           'type': 'Feature',
           'properties': {
               'color': plotColor,
           },
           'geometry': {
               'type': 'LineString',
               'coordinates': []
           }
       }
       for(let j=0;j<plotElements.length;j++){
           let lng = plotElements[j].posX;
           let lat = plotElements[j].posY;

           if(plotElements[j].Type == 2){
               let _point0 = [plotElements[j-1].posX,plotElements[j-1].posY]
               let _point1 = [plotElements[j].posX,plotElements[j].posY]
               let _point2 = [plotElements[j+1].posX,plotElements[j+1].posY]
               let _point3 = [plotElements[j+2].posX,plotElements[j+2].posY]
               let _line = [_point0,_point1,_point2,_point3]
               let curved = getCurved(_line);
               //let coords = turf.getCoords(curved)
               _lineFeature.geometry.coordinates = _lineFeature.geometry.coordinates.concat(curved)
               j = j+2;
           }else if(plotElements[j].Type == 0){
               if(_lineFeature.geometry.coordinates.length>-1){
                _lineFeatures.features.push(_lineFeature);
                _lineFeature = {
                    'type': 'Feature',
                    'properties': {
                        'color': plotColor,
                    },
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': []
                    }
                }
                let _coordinate = [lng,lat];
                 _lineFeature.geometry.coordinates.push(_coordinate)
               }
           }else{
               let _coordinate = [lng,lat];
               _lineFeature.geometry.coordinates.push(_coordinate)
           }
       
       }
       _lineFeatures.features.push(_lineFeature);
   }
   drawLine(_lineFeatures,map)
}
function getCurved(points){
    let t=0;
    let curved =[];
    for(let i=0;i<100;i++){
        t+=0.01
        let p = threeBezier(t, points[0], points[1],points[2],points[3]);
        curved.push(p);
    }
    
    return curved
}
function threeBezier(t, p1, cp1, cp2, p2) {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const [cx1, cy1] = cp1;
    const [cx2, cy2] = cp2;
    let x =
        x1 * (1 - t) * (1 - t) * (1 - t) +
        3 * cx1 * t * (1 - t) * (1 - t) +
        3 * cx2 * t * t * (1 - t) +
        x2 * t * t * t;
    let y =
        y1 * (1 - t) * (1 - t) * (1 - t) +
        3 * cy1 * t * (1 - t) * (1 - t) +
        3 * cy2 * t * t * (1 - t) +
        y2 * t * t * t;
    return [x, y];
}
function drawLine(lines,map){
    console.log(lines);
    let _this = this;
    var sourceTemp = new ol.source.Vector({
        features: (new ol.format.GeoJSON()).readFeatures(lines)
    });
    var vectorLayer = new ol.layer.Vector({
        source: sourceTemp,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: plotColor,
                width: 2
            })
        }),
    });
    map.addLayer(vectorLayer)

    return;

}
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });

}
export default DrawPlot
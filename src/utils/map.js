import lodash from 'lodash';
import DrawPlot from './draw';
import app from './drag';
// import conf from "./conf";
// import this from "./disaster"

export default function (Vue, options) {
  Vue.prototype.map = {
    //全局函数1
    map: '',
    map3d: "",
    //viewer视图
    viewer: "",
    callback: "",
    //scene
    sence: '',
    worldTerrain: '',
    //鼠标事件
    MouseEvent: '',
    //相机管理
    CameraManager: '',
    //图层管理
    layerManager: "",
    drawHelper: "",

    // 地图上已经加载的source
    sources: [],
    // 地图上已经加载的layer
    layers: [],
    primitives: [],
    // 地图上的marker
    markers: [],
    popup: '',
    eventKey: '',
    mapInfoPopup: null,
    beforeMap: '',
    compare: '',
    //一下为3维地图变量 start
    viewer: null,
    handler: null,
    view: null,
    rainSpeed: 1,
    rainType: 1, //0:小雨，1:中雨,2:大雨，3:暴雨，4:大暴雨，5:特大暴雨
    Clouds: [],
    CloudRun: true,
    rainTimeVal: false,
    rainTime: 1,
    rainNum: null,
    rainSC: 3,
    weatherHelper: null,
    MapServerLayers: [],
    Entities: [],
    IconData: null,
    Iconhandler: null,
    map2D_map3D_show: false,
    thematicMapLayer: "",
    iconLayer: [],
    key: null,
    //3维地图变量 end
    Maptype: function (type) {
      if (type === "3d") {
        this.map2D_map3D_show = true
      } else if (type === "2d") {
        this.map2D_map3D_show = false
      }
      this.itemCheckChange(this.thematicMapLayer)
    },
    //三维地图的方法 start
    initMap3D: function (options) {
      console.log(options)
      var map = new PIE.Map({
        type: 3
      });
      var view = new PIE.MapView({
        map: map,
        container: options.containerid,
        // sprite:options.sprite,
        // sprite: './resources/sprite/Weather',
        zoom: options.zoom,
        center: options.center
      });
      this.map3d = map;
      let grid = new PIE.GridTileLayer({
        projection: "EPSG:4326",
        url: 'http://piecloud.piesat.cn/dataservices/service/v1/tile?map=mapbox_earth&access_token=&x={x}&y={y}&z={z}',
      });
      this.map3d.add(grid);
      let mgrid = new PIE.GridTileLayer({
        projection: "EPSG:3857",
        url: 'http://piecloud.piesat.cn/dataservices/service/v1/tile?map=mapbox_earth&access_token=&x={x}&y={y}&z={z}',
      });
      this.map3d.add(mgrid);
      this.viewer = this.map3d.map._cesiumViewer
      // /this.initView()
      // this.addTileSanmen()
    },
    addImage3D: function (url, region) {
      var imageLayer = new Cesium.SingleTileImageryProvider({
        url: url,
        rectangle: Cesium.Rectangle.fromDegrees(region[0], region[1], region[2], region[3])
      })
      this.viewer.imageryLayers.addImageryProvider(imageLayer);
      // return imageLayer;
    },
    addTiles: function () {
      var terrainProvider = new Cesium.CesiumTerrainProvider({
        url: "http://piecloud.piesat.cn/tilesets/test/",
        requestWaterMask: true,
        requestVertexNormals: true,
        maximumLevel: 0
      });
      this.viewer.terrainProvider = terrainProvider

      this.viewer.scene.globe.depthTestAgainstTerrain = true;
    },
    addTEST: function (url, color, height) {
      let _this = this;
      Cesium.GeoJsonDataSource.load(url).then(function (dataSource) {
        _this.viewer.dataSources.add(dataSource);

        var entities = dataSource.entities.values;
        console.log(entities.length)
        for (var i = 0; i < entities.length; i++) {
          var entity = entities[i];
          if (entity.polyline) {
            entity.polyline.width = 2;
            entity.polyline.material = Cesium.Color.fromCssColorString(color);
          }
          if (entity.polygon) {
            entity.polygon.fill = true;
            entity.polygon.material = Cesium.Color.fromCssColorString(color);
            entity.polygon.outline = true;
            entity.polygon.outlineWidth = 1;
            entity.polygon.outline = true;
            entity.polygon.outlineColor = Cesium.Color.fromCssColorString(color);
            entity.polygon.extrudedHeight = height;
          }
          if (entity.billboard) {
            entity.label = new Cesium.LabelGraphics();
          }
        }
      });
    },
    addTileSanmen: function () {
      this.viewer = this.map3d.map._cesiumViewer
      var destination = Cesium.Cartesian3.fromDegrees(121.37, 29.13, 5000.0);
      var heading = Cesium.Math.toRadians(0.0);
      var pitch = Cesium.Math.toRadians(-90);
      var roll = Cesium.Math.toRadians(0);
      var duration = 5;

      this.flyTo(destination, heading, pitch, roll, duration);

      var terrainProvider = new Cesium.CesiumTerrainProvider({
        url: "./static/dem/sanmenxianTiles"
      });
      this.viewer.terrainProvider = terrainProvider

      this.viewer.scene.globe.depthTestAgainstTerrain = true;

      this.addTEST('./static/data/sanmenxian/geojson/buildings.geojson', '#ffffff', 50)
      this.addTEST('./static/data/sanmenxian/geojson/rivers.geojson', '#2487C0', 5)
    },
    initView: function () { //初始视图
      this.viewer = this.map3d._cesiumViewer;
      let destination = Cesium.Rectangle.fromDegrees(73, -10, 137, 54);
      let heading = Cesium.Math.toRadians(0);
      let pitch = Cesium.Math.toRadians(-90);
      let roll = Cesium.Math.toRadians(0);
      let duration = 5;
      let fn = this.addCloudImage;
      this.flyTo(destination, heading, pitch, roll, duration);
    },
    addMapServer: function (url, id) {
      var esri = new Cesium.ArcGisMapServerImageryProvider({
        url: url
      });

      var layer = this.map3d.pieCesium.map._cesiumViewer.imageryLayers.addImageryProvider(esri);
      layer.id = id;
      layer.alpha = 0.8;
      this.MapServerLayers.push(layer)
      //layerArray.push(layer);
    },
    removeMapServer: function (id) {
      var layerselect = this.MapServerLayers.find((item) => {
        return item.id == id
      });
      var layerselectIndex = this.MapServerLayers.findIndex((item) => {
        return item.id == id
      });
      if (layerselect && layerselectIndex > -1) {
        this.map3d.pieCesium.map._cesiumViewer.imageryLayers.remove(layerselect)
        this.MapServerLayers.splice(layerselectIndex, 1)
      }
      this.thematicMapLayer = ""
    },
    flyTo: function (destination, head, pitch, roll, duration, call) {
      if (this.map3d.pieCesium.map) {
        this.map3d.pieCesium.map._cesiumViewer.camera.flyTo({
          destination: destination, //Cartesian3 | Rectangle
          orientation: {
            heading: head,
            pitch: pitch,
            roll: roll,
          },
          duration: duration,
          complete: function () //飞行完毕后执行的动作
          {
            if (call) //如果有回调函数
            {
              call();
            }
          }
        });
      } else {
        this.map3d.pieCesium.map._cesiumViewer.camera.flyTo({
          destination: destination, //Cartesian3 | Rectangle
          orientation: {
            heading: head,
            pitch: pitch,
            roll: roll,
          },
          duration: duration,
          complete: function () //飞行完毕后执行的动作
          {
            if (call) //如果有回调函数
            {
              call();
            }
          }
        });
      }
    },
    addIcon: function (id) {
      let data = this[this.key + "iconData"];
      console.log(data)
      var temp_entities = {
        id: id,
        entities: []
      };
      let dotImg = conf.imgUrls["earthquakes"][0];
      for (var i = 0; i < data.length; i++) {
        let tempdata = data[i];
        let lon = Number(tempdata.longitude);
        let lat = Number(tempdata.latitude);
        let dotImg;
        if (data[i].event_name === '地震') {
          dotImg = conf.imgUrls["earthquakes"][2]
        }
        if (data[i].event_name === '火山活动') {
          dotImg = conf.imgUrls["volcanos"][1]
        }
        if (data[i].event_name === '风暴') {
          dotImg = conf.imgUrls["cyclones"][2]
        }
        if (data[i].event_name === '洪水') {
          dotImg = conf.imgUrls["floods"][0]
        }
        if (data[i].event_name === '干旱') {
          dotImg = conf.imgUrls["droughts"][0]
        }
        let entity = new Cesium.Entity({
          name: "Icon" + i,
          position: Cesium.Cartesian3.fromDegrees(lon, lat),
          billboard: {
            image: dotImg,
            scale: 0.25,
          }
        });
        temp_entities.entities.push(entity);
        this.map3d.pieCesium.map._cesiumViewer.entities.add(entity);
      }
      this.Entities.push(temp_entities);
      var scene = this.map3d.pieCesium.map._cesiumViewer.scene;
      var camera = scene.camera;
      this.Iconhandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

      this.Iconhandler.setInputAction(function (movement) {
        // Star burst on left mouse click.
        var pick = this.map3d.pieCesium.map._cesiumViewer.scene.pick(movement.position);
        if (Cesium.defined(pick)) {
          Ext.getCmp('abovepartId').getController().seeMoreDetaileInfoWindow(this.IconData[Number(pick.id.name.substr(4))]);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    removeIcon: function (id) {
      var layerselect = this.Entities.find((item) => {
        return item.id == id
      });
      var layerselectIndex = this.Entities.findIndex((item) => {
        return item.id == id
      });
      if (layerselect && layerselectIndex > -1) {
        for (var i = 0; i < layerselect.entities.length; i++) {
          this.map3d.pieCesium.map._cesiumViewer.entities.remove(layerselect.entities[i]);
        }
        this.Entities.splice(layerselectIndex, 1);
        if (this.Iconhandler) {
          this.Iconhandler.destroy();
        }
      }
    },
    addDataSourceLayer: function (data, id) {
      var _this = this;
      var viewer = this.map3d.pieCesium.map._cesiumViewer;
      Cesium.GeoJsonDataSource.load(data).then(function (dataSource) {
        viewer.dataSources.add(dataSource);
        dataSource.id = id;
        var entities = dataSource.entities.values;
        for (var i = 0; i < entities.length; i++) {
          var entity = entities[i];
          if (entity.polyline) {
            entity.polyline.width = 2;
            entity.polyline.material = Cesium.Color.fromCssColorString("#ff0");
          } else if (entity.polygon) {
            entity.polygon.outline = true;
            entity.polygon.outlineColor = Cesium.Color.fromCssColorString("#f00");
            entity.polygon.outlineWidth = 2;
            entity.polygon.fill = true;
            entity.polygon.material = Cesium.Color.fromAlpha(new Cesium.Color(1, 1, 0), 0.3);

          } else if (entity.billboard) {
            entity.billboard = undefined;
            entity.point = new Cesium.PointGraphics();
            entity.point.color = Cesium.Color.fromCssColorString("#f00");
            entity.point.outlineWidth = 1;
            entity.point.outlineColor = Cesium.Color.fromCssColorString("#f00");
            entity.point.pixelSize = 5;
          }
        }
      }, {
        show: true,
        stroke: Cesium.Color.BLACK,
        fill: Cesium.Color.BLACK,
        markerColor: Cesium.Color.BLACK,
        strokeWidth: 0,
        markerSize: 0,
        clampToGround: true
      });
    },

    removeDataSourceLayer: function (id) {
      var dataSources = this.map3d.pieCesium.map._cesiumViewer.dataSources;
      for (var i = 0; i < dataSources.length; i++) {
        if (dataSources.get(i).id == id) {
          dataSources.remove(dataSources.get(i));
          break;
        }
      }
    },
    //三维地图的方法 end
    //二维地图的方法 start
    // 初始化地图
    initMap: function (mapObj, callback) {
      const {
        _center = [116.40769, 39.89945], divId = 'map', zoom = 4, key = false
      } = mapObj;
      $('#' + divId).empty();
      let center = ol.proj.transform(_center, "EPSG:4326", "EPSG:3857");
      var extent = ol.extent.boundingExtent([
        [-180, 85],
        [180, -85]
      ]);
      let map = new ol.Map({
        target: divId,
        logo: false,
        interactions: ol.interaction.defaults().extend([new app.Drag()]),
        controls: ol.control.defaults({
          attribution: false,
          zoom: false,
          rotate: false
        }).extend([
          /*new ol.control.ScaleLine(),*/
          /*new ol.control.Rotate({
              autoHide: true,
              tipLabel: '地图正北',
              label: 'N'
          }),
          new ol.control.FullScreen({
              tipLabel: '地图全屏切换'
          })*/
        ]),


        loadTilesWhileAnimating: true,
        pixelRatio: 1,

        //地图设置
        view: new ol.View({
          center: center,
          // minZoom：设置地图允许的最小级别，maxZoom：设置地图允许的最大级别
          minZoom: 1,
          maxZoom: 20,
          zoom: zoom,
          extent: ol.proj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857')
        })
      });
      //draws.Popup();
      if (key) {
        this[key] = map;
        if (key == "map2d" || key == "map2d_china" || key == "map2d_sext") {
          this.map = map;
        }
        console.log(this)
      } else {
        this.map = map;
      }
      // debugger
      if (callback && typeof callback == 'function') this.callback = callback
    },
    setDraw: function (map) {
      if (map) {
        this.DrawPlot = new DrawPlot(this[map])
      } else {
        this.DrawPlot = new DrawPlot(this.map)
      }
    },
    //初始化地图弹窗对象
    initMapInfoPopup: function (map) {

      let _this = this;
      if (_this.mapInfoPopup !== null) {
        _this.mapInfoPopup = null;
        $("div").remove(".popover");
      }
      let earthInfoDiv = document.createElement("div");
      earthInfoDiv.id = "thediv";
      earthInfoDiv.style.marginLeft = "10px";
      _this.mapInfoPopup = new ol.Overlay({
        element: earthInfoDiv,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        },
        stopEvent: true,
        offset: [0, 0] //偏移量'
      });
      map.addOverlay(_this.mapInfoPopup);
    },
    /**
     * 弹框显示灾害类型详细信息
     */
    showEarthquakeNodeInfo: function (map) {
      let _this = this;
      this.eventKey = map.on('singleclick', function (evt) {
        //准备弹框
        _this.initMapInfoPopup(map);
        map.forEachFeatureAtPixel(evt.pixel, function (feature, l) {
          let coordinates = feature.getGeometry().getCoordinates();
          _this.setEarthPopupHtml(coordinates, l.wrapMap1);
          return true;
        });
      }.bind(this));
    },
    //填充灾害点位置信息弹框内容
    setEarthPopupHtml: function (coordinates, data) {
      let _this = this,
        name = data.name,
        tempdata = data.name;
      let eventStartTime = data.fromdate;
      // me.selectEarthData1 = data;
      let element = _this.mapInfoPopup.getElement();
      if (coordinates) {
        _this.mapInfoPopup.setPosition(coordinates);
        let disasterDetailsInfo = data;
        console.log(data);
        element.title = '<div style="width: 270px;height: 32px;background-color: #465885;color: #ffffff;line-height:32px;border-radius: 4px 4px 0 0;">&emsp;详细信息<a href="javascript:void(0)" id="popup-closer"  style="color:#ffffff;text-decoration: none;position: absolute;right: 8px;top: 0;">✖</a></div>';
        let eq_popupContent = "";
        eq_popupContent += '<div style="background-color:#ffffff;text-align: left;">';
        eq_popupContent += '<p style="padding-left: 5px;font-weight: 500;">' + '类型：' + data.event_name + '</p> ';
        // eq_popupContent += '<p style="padding-left: 5px;font-weight: 500;">' + '名称：' + name + '</p> ';
        eq_popupContent += '<p style="padding-left: 5px;font-weight: 500;">' + '经度：' + data.longitude + '</p> ';
        eq_popupContent += '<p style="padding-left: 5px;font-weight: 500;">' + "纬度：" + data.latitude + '</p> ';
        eq_popupContent += '<p style="padding-left: 5px;font-weight: 500;">' + '发生时间：' + eventStartTime + '</p></div>';
        eq_popupContent += '<div style="text-align: center"><button id="earthquakeDealid" style="width: 90px;height: 28px;background:rgba(255,255,255,1);border:1px solid rgba(86,139,252,1);color: rgba(36,122,220,1);font-size: 12px;font-weight: normal;border-radius: 3px;">查看详情</button>';
        eq_popupContent += '</div>';
        $(element).popover({
          placement: 'top',
          animation: false,
          html: true,
          content: eq_popupContent,
        });
        $(element).attr('style', 'margin-top:-25px;margin-left:80px;');
        $(element).popover('show');

        let assessment = document.getElementById('earthquakeDealid');
        assessment.onclick = function () {
          $(element).popover('destroy');
          _this.callback(disasterDetailsInfo);
        };
        let closer = document.getElementById('popup-closer');
        closer.onclick = function () {
          $(element).popover('destroy');
        };
      } else {
        $(element).popover('destroy');
      }
    },
    removeIconDisasMessage(map) {
      this.iconLayer.forEach(item => {
        map.removeLayer(item);
      })
      this.iconLayer = [];
    },
    //添加点信息数据图层
    addIconDisasMessage(data, key) {
      //debugger
      if (key) {
        this.key = key;
        this[key + "iconData"] = data;
        this.removeIconDisasMessage(this[key])
      } else {
        this.iconData = data;
        this.removeIconDisasMessage(this.map);
      }
      let dotImg = conf.imgUrls["earthquakes"][0];
      for (let i = 0; i < data.length; i++) {
        let dotImg;
        if (data[i].event_name === '地震') {
          dotImg = conf.imgUrls["earthquakes"][2]
        }
        if (data[i].event_name === '火山活动') {
          dotImg = conf.imgUrls["volcanos"][1]
        }
        if (data[i].event_name === '风暴') {
          dotImg = conf.imgUrls["cyclones"][2]
        }
        if (data[i].event_name === '洪水') {
          dotImg = conf.imgUrls["floods"][0]
        }
        if (data[i].event_name === '干旱') {
          dotImg = conf.imgUrls["droughts"][0]
        }

        if (!dotImg) {
          return false;
        }
        let point = ol.proj.transform([parseFloat(data[i].longitude), parseFloat(data[i].latitude)], "EPSG:4326", "EPSG:3857");
        let iconFeature = new ol.Feature({
          geometry: new ol.geom.Point(point),
          code: 4000,
          point: point,
        });
        let iconStyle = new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: dotImg,
            scale: 0.4,
            alt: '灾害类型图标'
          })
        });
        iconFeature.setStyle(iconStyle);
        let sourceLayer = new ol.source.Vector({
          features: [iconFeature]
        });
        let vectorLayer = new ol.layer.Vector({
          source: sourceLayer
        });
        //追加图层
        vectorLayer['wrapMap1'] = data[i];
        this.iconLayer.push(vectorLayer);
        if (key) {
          this[key].addLayer(vectorLayer);
        } else {
          this.map.addLayer(vectorLayer);
        }
      }
    },


    /**
     * 使用egis地图
     * @param map 地图实例
     * @param layerType 图层类型：vec、img、ter
     */
    switchLayerEgis: function (map, layerType) {
      // let restHttp = new egis.core.RestHttp({
      //     client_id: conf.egis.client_id, //用户id
      //     client_secret: conf.egis.client_secret //用户密码
      // });
      let me = this;
      // let murl = conf.egis.baseUrl + 'service/api/egis/base/v1/wmts?layer=cva&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&style=default&Format=tiles&tileMatrixSet=c&tileRow={y}&tileCol={x}&tileMatrix={z}';
      let projection = ol.proj.get('EPSG:3857');
      let projectionExtent = projection.getExtent();
      let size = ol.extent.getWidth(projectionExtent) / 256;
      let resolutions = [];
      let matrixIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
      for (let z = 2; z < 19; ++z) {
        // generate resolutions and matrixIds arrays for this WMTS
        resolutions[z] = size / Math.pow(2, z);
      }
      let baseLyr, baseLyrLabel;
      switch (layerType) {
        case 'vec': {
          baseLyr = new ol.layer.Tile({
            zIndex: 0,
            source: new ol.source.XYZ({
              projection: 'EPSG:3857',
              url: MapURL,
              // tileLoadFunction: function (tile, src) {
              //     //创建服务请求对象
              //     let request = new XMLHttpRequest();
              //     request.responseType = 'blob';
              //     request.open('get', src, true);
              //     request.setRequestHeader('Authorization', restHttp['_token']);
              //     request.onreadystatechange = e => {
              //         if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
              //             tile.getImage().src = URL.createObjectURL(request.response);
              //             tile.getImage().onload = () => {
              //                 URL.revokeObjectURL(tile.getImage().src);
              //             }
              //         }
              //     };
              //     request.send(null);
              // }
            }),
            isGroup: true,
            name: 'vec-layer'
          });
          // baseLyrLabel = new ol.layer.Tile({
          //     zIndex: 1,
          //     source: new ol.source.XYZ({
          //         projection: 'EPSG:4326',

          //         url: conf.egis.baseUrl + 'service/api/egis/base/v1/wmts?layer=cva&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&style=default&Format=png&tileMatrixSet=c&tileRow={y}&tileCol={x}&tileMatrix={z}',
          //         tileLoadFunction: function (tile, src) {
          //             //创建服务请求对象
          //             let request = new XMLHttpRequest();
          //             request.responseType = 'blob';
          //             request.open('get', src, true);
          //             request.setRequestHeader('Authorization', restHttp['_token']);
          //             request.onreadystatechange = e => {
          //                 if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
          //                     tile.getImage().src = URL.createObjectURL(request.response);
          //                     tile.getImage().onload = () => {
          //                         URL.revokeObjectURL(tile.getImage().src);
          //                     }
          //                 }
          //             };
          //             request.send(null);
          //         }
          //     }),
          //     isGroup: true,
          //     name: 'vec-label-layer'
          // });
          break;
        }
        case 'img': {
          baseLyr = new ol.layer.Tile({
            zIndex: 0,
            source: new ol.source.XYZ({
              projection: 'EPSG:4326',

              url: conf.egis.baseUrl + 'service/api/egis/base/v1/wmts?layer=img&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&style=default&Format=tiles&tileMatrixSet=c&tileRow={y}&tileCol={x}&tileMatrix={z}',
              tileLoadFunction: function (tile, src) {
                //创建服务请求对象
                let request = new XMLHttpRequest();
                request.responseType = 'blob';
                request.open('get', src, true);
                request.setRequestHeader('Authorization', restHttp['_token']);
                request.onreadystatechange = e => {
                  if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    tile.getImage().src = URL.createObjectURL(request.response);
                    tile.getImage().onload = () => {
                      URL.revokeObjectURL(tile.getImage().src);
                    }
                  }
                };
                request.send(null);
              }
            }),
            isGroup: true,
            name: 'vec-label-layer',
          });
          baseLyrLabel = new ol.layer.Tile({
            zIndex: 1,
            source: new ol.source.XYZ({
              projection: 'EPSG:4326',

              url: conf.egis.baseUrl + 'service/api/egis/base/v1/wmts?layer=cia&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&style=default&Format=png&tileMatrixSet=c&tileRow={y}&tileCol={x}&tileMatrix={z}',
              tileLoadFunction: function (tile, src) {
                //创建服务请求对象
                let request = new XMLHttpRequest();
                request.responseType = 'blob';
                request.open('get', src, true);
                request.setRequestHeader('Authorization', restHttp['_token']);
                request.onreadystatechange = e => {
                  if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    tile.getImage().src = URL.createObjectURL(request.response);
                    tile.getImage().onload = () => {
                      URL.revokeObjectURL(tile.getImage().src);
                    }
                  }
                };
                request.send(null);
              }
            }),
            isGroup: true,
            name: 'img-label-layer'
          });
          break;
        }
        case 'ter': {
          baseLyr = new ol.layer.Tile({
            zIndex: 0,
            source: new ol.source.XYZ({
              projection: 'EPSG:3857',
              url: conf.egis.baseUrl + 'service/api/egis/base/v1/wmts?layer=ter&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&style=default&Format=tiles&tileMatrixSet=c&tileRow={y}&tileCol={x}&tileMatrix={z}',
              tileLoadFunction: function (tile, src) {
                //创建服务请求对象
                let request = new XMLHttpRequest();
                request.responseType = 'blob';
                request.open('get', src, true);
                request.setRequestHeader('Authorization', restHttp['_token']);
                request.onreadystatechange = e => {
                  if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    tile.getImage().src = URL.createObjectURL(request.response);
                    tile.getImage().onload = () => {
                      URL.revokeObjectURL(tile.getImage().src);
                    }
                  }
                };
                request.send(null);
              }
            }),
            isGroup: true,
            name: 'ter-layer'
          });
          baseLyrLabel = new ol.layer.Tile({
            zIndex: 1,
            source: new ol.source.XYZ({
              projection: 'EPSG:4326',
              url: conf.egis.baseUrl + 'service/api/egis/base/v1/wmts?layer=cta&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&style=default&Format=png&tileMatrixSet=c&tileRow={y}&tileCol={x}&tileMatrix={z}',
              tileLoadFunction: function (tile, src) {
                //创建服务请求对象
                let request = new XMLHttpRequest();
                request.responseType = 'blob';
                request.open('get', src, true);
                request.setRequestHeader('Authorization', restHttp['_token']);
                request.onreadystatechange = e => {
                  if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    tile.getImage().src = URL.createObjectURL(request.response);
                    tile.getImage().onload = () => {
                      URL.revokeObjectURL(tile.getImage().src);
                    }
                  }
                };
                request.send(null);
              }
            }),
            isGroup: true,
            name: 'ter-label-layer'
          });
          break;
        }
      }
      // baseLyr.getSource().setTileLoadFunction(me.customLoader(baseLyr,murl));
      let mls = [];
      if (map) {
        mls = this[map].getLayers()
      } else {
        mls = this.map.getLayers();
      }

      if (mls) {
        mls.setAt(0, baseLyr);
        // mls.setAt(1, baseLyrLabel);
      }
      //console.log(map.getLayers().getLength());
    },

    itemCheckRemove: function () {

      let layers = this.map.getLayers();
      let layersCol = layers.getArray();
      let arr = [];
      for (let i = 0; i < layersCol.length; i++) {
        if (layersCol[i].get('id') && layersCol[i].get('id') === 'tempLayer') {
          arr.push(i);
        }
      }
      if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          layers.removeAt(arr[i]);
        }
      }
      this.thematicMapLayer = ""
    },
    /**
     * menu条目选择改变的监听
     */
    itemCheckChange: function (comb) {
      // console.log(comb);
      console.log(this.map)
      let layers = this.map.getLayers();
      let layersCol = layers.getArray();
      // console.log(layers)
      // console.log(layersCol)
      let arr = [];
      for (let i = 0; i < layersCol.length; i++) {
        if (layersCol[i].get('id') && layersCol[i].get('id') === 'tempLayer') {
          arr.push(i);
        }
      }
      console.log(arr)
      if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          layers.removeAt(arr[i]);
        }
      }
      this.removeMapServer("thematicMap")
      this.thematicMapLayer = comb
      // console.log(this.thematicMapLayer)
      let temp = comb.name,
        mUrl;
      if (temp === '人口') {
        mUrl = conf.sys.arcGisServerUrl + 'POPULATION/MapServer';
      }
      if (temp === 'GDP') {
        mUrl = conf.sys.arcGisServerUrl + 'GDP_2010/ImageServer';
      }
      if (temp === '年平均气温') {
        mUrl = conf.sys.arcGisServerUrl + 'AnnualTemperature_30s_01/ImageServer';
      }
      if (temp === '降雨量') {
        mUrl = conf.sys.arcGisServerUrl + 'AnnualPrecipitation_30s_12/ImageServer';
      }
      if (temp === '气候带') {
        mUrl = conf.sys.arcGisServerUrl + 'clim/ImageServer';
      }
      if (temp === '地形') {
        mUrl = conf.sys.arcGisServerUrl + 'SRTM_GTOPO_u30_mosaic/ImageServer';
      }
      if (temp === '人口密度') {
        mUrl = conf.sys.arcGisServerUrl + 'Population_ppp_2015_1km_Aggregated/ImageServer';
      }
      if (mUrl) {
        if (this.map2D_map3D_show) {
          var index = mUrl.lastIndexOf("\/");
          let lastWord = mUrl.substring(index + 1, mUrl.length);
          if (lastWord === "ImageServer") {
            mUrl += "/exportImage"
          }
          this.addMapServer(mUrl, "thematicMap")
        } else {
          let tempLayer = new ol.layer.Image({
            source: new ol.source.ImageArcGISRest({
              ratio: 1,
              params: {},
              url: mUrl,
            }),
            id: 'tempLayer',
            opacity: 0.6
          });
          this.map.addLayer(tempLayer);
        }
      }
    },

    addOLGeojson: function (map, data, code, id) {
      this.code = code;
      let _this = this;
      var sourceTemp = new ol.source.Vector({
        features: (new ol.format.GeoJSON()).readFeatures(data, {
          featureProjection: "EPSG:3857"
        })
      });
      var vectorLayer = new ol.layer.Vector({
        source: sourceTemp,
        style: function (feature) {
          // console.log(feature.getId());
          let fillcolor = 'rgba(0,0,0,0)'
          if (_this.code == feature.getId()) {
            fillcolor = '#0071A4'
          }
          let style = new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: "#000",
              width: 1
            }),
            fill: new ol.style.Fill({
              color: fillcolor
            })
          });


          return style
        },
      });
      this.selectLayer = vectorLayer;
      map.addLayer(vectorLayer)
    },

    setCountry: function (code) {
      this.code = code;
      console.log(code, this.selectLayer)
      this.selectLayer.getSource().changed()
    },

    // 方法：复位/全屏--徐刚12/16   纬度，经度
    reset() {
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(39.54, 116.23, 400000),
        duration: 1.0
      });
    },
    fullScreen() {
      this.viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(39.54, 116.23, 41154074),
        duration: 1.0
      });
    },
    ZoomOut() {
      let view = null
      if (key) {
        view = this[key].getView();
      } else {
        view = this.map.getView();
      }
      view.setZoom(view.getZoom() + 1);
    },
    //缩小
    ZoomIn() {
      let view = null
      if (key) {
        view = this[key].getView();
      } else {
        view = this.map.getView();
      }
      view.setZoom(view.getZoom() - 1);
    },

    // 清空底图上的图层和操作
    clean() {
      if (this.map) {
        // 删除layers
        this.removeAllLayers()
        // 删除source
        this.removeAllSources()
        // 删除markers
        if (this.markers.length) {
          this.markers.forEach((item) => {
            item.remove()
          })
        }
        this.markers = []
        if (this.popup) this.popup.remove()
      }
    },
    // 重新加载底图
    reload(callback) {
      // if (this.map) this.map.remove() // 去除现有底图
      // const userEntity = vm.$store.state.userEntity
      // this.initMap(
      // 	{
      // 		mapUrl: vm.$store.state.basicMapUrl,
      // 		lon: Number(userEntity.longitude || 0),
      // 		lat: Number(userEntity.latitude || 0)
      // 	},
      // 	callback
      // )
    },
    removeLayers: function (item) {
      // 删除layers
      if (this.map.getLayer(item)) {
        this.map.removeLayer(item)
        lodash.remove(this.layers, item)
      }
    },
    removeSources: function (item) {
      if (this.map.getSource(item)) {
        this.map.removeSource(item)
        lodash.remove(this.sources, item)
      }
    },
    removeAllLayers: function () {
      const _this = this
      this.layers.forEach((item) => {
        _this.removeLayers(item)
        if (_this.map.hasImage(item)) _this.map.removeImage(item)
      })
    },
    removeAllSources: function () {
      const _this = this
      this.sources.forEach((item) => {
        _this.removeSources(item)
      })
    },


    addImageLayer: function (map, url, extent) {
      var leftbottom = ol.proj.fromLonLat([extent[0], extent[1]], "EPSG:3857");
      var righttop = ol.proj.fromLonLat([extent[2], extent[3]], "EPSG:3857");
      var _layer = new ol.layer.Image({
        source: new ol.source.ImageStatic({
          url: url,
          projection: "EPSG:3857",
          imageExtent: [leftbottom[0], leftbottom[1], righttop[0], righttop[1]]
        })
      });
      _layer.id = "image";
      if (map) {
        let _layers = this[map].getLayers().getArray();
        console.log(_layers)
        for (let i = 0; i < _layers.length; i++) {
          if (_layers[i].id == "image") {
            this[map].removeLayer(_layers[i])
          }
        }
        this[map].addLayer(_layer);
      } else {
        this.map.addLayer(_layer);
      }

    },
    addText: function (map, center) {
      let _map = this[map];
      var source = new ol.source.Vector({
        wrapX: false
      });
      var geom = new ol.geom.Point(ol.proj.transform(center,
        'EPSG:4326', 'EPSG:3857'));
      var feature = new ol.Feature(geom);
      source.addFeature(feature);
      var vector = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style({
          text: new ol.style.Text({
            text: "核生化态势图",
            fill: new ol.style.Fill({
              color: "#ff0000"
            }),

            font: "40px sans-serif"
          })
        })
      });
      _map.addLayer(vector);

    },
    addanimatCircle: function (_center, key) {
      let _map = this[key];
      let _this = this;
      var source = new ol.source.Vector({
        wrapX: false
      });
      var vector = new ol.layer.Vector({
        source: source,
        // style:new ol.
      });
      var duration = 5000;
      _map.addLayer(vector);
      var geom = new ol.geom.Point(ol.proj.transform(_center,
        'EPSG:4326', 'EPSG:3857'));
      var feature = new ol.Feature(geom);
      source.addFeature(feature);

      function flash(feature) {
        var start = new Date().getTime();
        var listenerKey;

        function animate(event) {
          var vectorContext = event.vectorContext;
          var frameState = event.frameState;
          var flashGeom = feature.getGeometry().clone();
          var elapsed = frameState.time - start;
          var elapsedRatio = elapsed / duration;
          // radius will be 5 at start and 30 at end.
          var radius = ol.easing.easeOut(elapsedRatio) * 400 + 5;
          var opacity = ol.easing.easeOut(1 - elapsedRatio);

          var style = new ol.style.Style({
            image: new ol.style.Circle({
              radius: radius,
              snapToPixel: false,
              stroke: new ol.style.Stroke({
                color: 'rgba(255, 0, 0, ' + opacity + ')',
                width: 0.25 + opacity
              })
            })
          });

          vectorContext.setStyle(style);
          vectorContext.drawGeometry(flashGeom);
          console.log(Math.floor(elapsed))
          if (Math.floor(elapsed) >= 1000 && Math.floor(elapsed) <= 1015) {
            _this.addCircle([78.7, 35.8], Math.floor(elapsed), "map2d", 0)
          }
          if (Math.floor(elapsed) >= 2000 && Math.floor(elapsed) <= 2015) {
            _this.addCircle([78.7, 35.8], Math.floor(elapsed), "map2d", 1)
          }

          if (elapsed > duration) {
            ol.Observable.unByKey(listenerKey);
            _this.addCircle([78.7, 35.8], duration, "map2d", 2)
            return;
          }
          // tell OpenLayers to continue postcompose animation
          _map.render();
        }
        listenerKey = _map.on('postcompose', animate);
      }
      flash(feature)
    },
    addCircle: function (_center, radius, key, index) {
      let center = ol.proj.transform(_center, "EPSG:4326", "EPSG:3857");
      console.log(center);
      var features = new ol.Collection();
      var colors = ["rgba(255, 0, 0, 0.4)", "rgba(255,255, 0, 0.4)", "rgba(255, 0, 255, 0.4)"]
      var cricle = new ol.geom.Circle(center, radius);

      var feature = new ol.Feature({
        geometry: cricle,
        labelPoint: new ol.geom.Point([center[0], center[1]]),
        name: '',
        color: colors[index]
      });

      features.push(feature);
      var clayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: features
        }),
        style: function (feature) {
          var s = new ol.style.Style({
            fill: new ol.style.Fill({
              color: feature.get("color")
            }),
            stroke: new ol.style.Stroke({
              color: feature.get("color"),
              width: 2
            }),

          });
          return s;
        }
      });
      let mls = this[key].getLayers()
      console.log(mls.getArray());
      mls.insertAt(1, clayer);

    }
    //二维地图的方法 end
  }
}

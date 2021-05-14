let PageInfo = {
    viewer: null,
    handler: null,
    view: null,
    rainSpeed: 1,
    rainType: 1,//0:小雨，1:中雨,2:大雨，3:暴雨，4:大暴雨，5:特大暴雨
    Clouds: [],
    CloudRun: true,
    rainTimeVal: false,
    rainTime: 1,
    rainNum: null,
    rainSC: 3,
    weatherHelper: null,
    MapServerLayers: [],
    Entities: [],
    IconData:null,
    Iconhandler:null,
    init: function () {
        //切换3D地图
        setTimeout(function () {
            Ext.getCmp('mapContainer').getLayout().setActiveItem(1);
        }, 1000);
        if (conf.map.instance3d) {
            return;
        }
        let options = {containerid: 'tdtMap3d', zoom: 7, center: [-122.514426, 37.562984]};
        let swMap1 = commonHelper.initMap2(options);
        let swMap = swMap1.map;
        PageInfo.view = swMap1.view;
        swMap.on("load", function () {
            PageInfo.viewer = swMap.map._cesiumViewer;
            PageInfo.handler = new Cesium.ScreenSpaceEventHandler(PageInfo.viewer.canvas);
            let viewer = PageInfo.viewer;
            let scene = viewer.scene;
            Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5N2YwN2Q4ZS1iODA0LTRkZDQtYmMxNC0yNDBkNWNkMDc4MDAiLCJpZCI6NjI2NCwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU0NTc5MTY5Nn0.ki6CLrIJtYbR2RpOoV9PDhxHcHXsQhoU69mFi8bY9Mg';
            PageInfo.worldTerrain = Cesium.createWorldTerrain({
                requestWaterMask: true,
                requestVertexNormals: true
            });

            // set lighting to true
            //viewer.scene.globe.enableLighting = true;
            // viewer.scene.globe.depthTestAgainstTerrain = true;
            PageInfo.viewer.terrainProvider = PageInfo.worldTerrain;
            let grid = new PIE.GridTileLayer({
                projection: "EPSG:4326",
                url: 'http://www.google.cn/maps/vt?lyrs=s,h@800&x={x}&y={y}&z={z}',

            });
            swMap.add(grid);

            let mgrid = new PIE.GridTileLayer({
                projection: "EPSG:3857",

                url: 'http://piecloud.piesat.cn/dataservices/service/v1/tile?map=googleimageVect&x={x}&y={y}&z={z}',
            });
            swMap.add(mgrid);
            conf.map.instance3d = swMap;
        });
    },
    initView: function () {//初始视图
        PageInfo.viewer = conf.map.instance3d.map._cesiumViewer;
        let destination = Cesium.Rectangle.fromDegrees(73, -10, 137, 54);
        let heading = Cesium.Math.toRadians(0);
        let pitch = Cesium.Math.toRadians(-90);
        let roll = Cesium.Math.toRadians(0);
        let duration = 5;
        let fn = PageInfo.addCloudImage;
        PageInfo.flyTo(destination, heading, pitch, roll, duration);
    },
    addMapServer: function (url, id) {
        var esri = new Cesium.ArcGisMapServerImageryProvider({
            url: url
        });

        var layer = conf.map.instance3d.map._cesiumViewer.imageryLayers.addImageryProvider(esri);
        layer.id = id;
        layer.alpha = 0.8;
        PageInfo.MapServerLayers.push(layer)
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
            conf.map.instance3d.map._cesiumViewer.imageryLayers.remove(layerselect)
            PageInfo.MapServerLayers.splice(layerselectIndex, 1)
        }
    },
    flyTo: function (destination, head, pitch, roll, duration, call) {
        if (conf.map.instance3d.map) {
            conf.map.instance3d.map._cesiumViewer.camera.flyTo({
                destination: destination,    //Cartesian3 | Rectangle
                orientation: {
                    heading: head,
                    pitch: pitch,
                    roll: roll,
                },
                duration: duration,
                complete: function ()//飞行完毕后执行的动作
                {
                    if (call)//如果有回调函数
                    {
                        call();
                    }
                }
            });
        } else {
            conf.map.instance3d.map._cesiumViewer.camera.flyTo({
                destination: destination,    //Cartesian3 | Rectangle
                orientation: {
                    heading: head,
                    pitch: pitch,
                    roll: roll,
                },
                duration: duration,
                complete: function ()//飞行完毕后执行的动作
                {
                    if (call)//如果有回调函数
                    {
                        call();
                    }
                }
            });
        }
    },
    addIcon: function (data, id) {
        PageInfo.IconData = data;
        var temp_entities = {
            id: id,
            entities: []
        };
        for (var i = 0; i < data.length; i++) {
            let tempdata = data[i];
            let lon = Number(tempdata.longitude);
            let lat = Number(tempdata.latitude);
            let iconitemlink = tempdata.iconitemlink;
            let imageLevel, type;
            if (tempdata['eventtype'] === 'DR') {
                type = 'droughtlevel';
            } else if (tempdata['eventtype'] === 'TC') {
                type = 'stormlevel';
            } else if (tempdata['eventtype'] === 'EQ') {
                type = 'earthquakelevel';
            } else if (tempdata['eventtype'] === 'VO') {
                type = 'volcanolevel';
            } else if (tempdata['eventtype'] === 'FL') {
                type = 'floodlevel';
            }
            if (tempdata['alertlevel'] === 'Green') {
                imageLevel = './resources/image/disastertype/' + type + '1.png';
            }
            if (tempdata['alertlevel'] === 'Orange') {
                imageLevel = './resources/image/disastertype/' + type + '2.png';
            }
            if (tempdata['alertlevel'] === 'Red') {
                imageLevel = './resources/image/disastertype/' + type + '3.png';
            }
            let entity = new Cesium.Entity({
                name:"Icon"+i,
                position: Cesium.Cartesian3.fromDegrees(lon, lat),
                billboard: {
                    image: imageLevel,
                    scale: 0.25,
                }
            });
            temp_entities.entities.push(entity);
            conf.map.instance3d.map._cesiumViewer.entities.add(entity);

        }
        PageInfo.Entities.push(temp_entities);
        var scene = conf.map.instance3d.map._cesiumViewer.scene;
        var camera = scene.camera;
        PageInfo.Iconhandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

        PageInfo.Iconhandler.setInputAction(function (movement) {
            // Star burst on left mouse click.
            var pick = conf.map.instance3d.map._cesiumViewer.scene.pick(movement.position);
            if (Cesium.defined(pick)) {
                Ext.getCmp('abovepartId').getController().seeMoreDetaileInfoWindow(PageInfo.IconData[Number(pick.id.name.substr(4))]);
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    removeIcon: function (id) {
        var layerselect = PageInfo.Entities.find((item) => {
            return item.id == id
        });
        var layerselectIndex = PageInfo.Entities.findIndex((item) => {
            return item.id == id
        });
        if (layerselect && layerselectIndex > -1) {
            for (var i = 0; i < layerselect.entities.length; i++) {
                conf.map.instance3d.map._cesiumViewer.entities.remove(layerselect.entities[i]);
            }
            PageInfo.Entities.splice(layerselectIndex, 1);
            if (PageInfo.Iconhandler) {
                PageInfo.Iconhandler.destroy();
            }
        }
    },
    addDataSourceLayer : function(data,id) {
        var _this = this;
        var viewer = conf.map.instance3d.map._cesiumViewer;
        Cesium.GeoJsonDataSource.load(data).then(function (dataSource) {
            viewer.dataSources.add(dataSource);
            dataSource.id =id;
            var entities = dataSource.entities.values;
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                if (entity.polyline) {
                    entity.polyline.width = 2;
                    entity.polyline.material = Cesium.Color.fromCssColorString("#ff0");
                }
                else if (entity.polygon) {
                    entity.polygon.outline=true;
                    entity.polygon.outlineColor=Cesium.Color.fromCssColorString("#f00");
                    entity.polygon.outlineWidth=2;
                    entity.polygon.fill=true;
                    entity.polygon.material=Cesium.Color.fromAlpha(new Cesium.Color(1, 1, 0),0.3);

                }else if (entity.billboard) {
                    entity.billboard = undefined;
                    entity.point = new Cesium.PointGraphics();
                    entity.point.color=Cesium.Color.fromCssColorString("#f00");
                    entity.point.outlineWidth=1;
                    entity.point.outlineColor=Cesium.Color.fromCssColorString("#f00");
                    entity.point.pixelSize=5;
                }
            }
        },{
            show:true,
            stroke:Cesium.Color.BLACK,
            fill: Cesium.Color.BLACK,
            markerColor:Cesium.Color.BLACK,
            strokeWidth: 0,
            markerSize:0,
            clampToGround:true
        });
    },

    removeDataSourceLayer:function(id){
        var dataSources = conf.map.instance3d.map._cesiumViewer.dataSources;
        for (var i= 0; i < dataSources.length; i++) {
            if (dataSources.get(i).id==id) {
                dataSources.remove(dataSources.get(i));
                break;
            }
        }
    }
};
var commonHelper = {
    initMap: function (options) {
        var map = new PIE.Map({ type: 3 });
        var view = new PIE.MapView({
            map: map,
            container: options.containerid,
            // sprite:options.sprite,
            // sprite:'./resources/sprite/Weather',
            zoom: options.zoom,
            center: options.center
        });
        return map;
    },
    initMap2: function (options) {
        var map = new PIE.Map({ type: 3 });
        var view = new PIE.MapView({
            map: map,
            container: options.containerid,
            // sprite:options.sprite,
            // sprite:'./resources/sprite/Weather',
            zoom: options.zoom,
            center: options.center
        });
        return {map:map,view:view};
    }
};
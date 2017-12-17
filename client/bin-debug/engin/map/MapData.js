var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var engin;
(function (engin) {
    var map;
    (function (map) {
        var MapData = (function () {
            function MapData(data) {
                var setting = data.settings;
                this.mapwidth = data.mapwidth;
                this.mapheight = data.mapheight;
                this.bgrw = setting.bgrw;
                this.bgrh = setting.bgrh;
                this.bgwidth = setting.bgwidth;
                this.bgheight = setting.bgheight;
                this.guid = data.guid;
                // this.alphaArray = new Map2DSetting(egret.Base64Util.decode(setting.alphaArray.data), setting.alphaArray.w, setting.alphaArray.h);
                // this.pathArray = new Map2DSetting(egret.Base64Util.decode(setting.pathArray.data), setting.pathArray.w, setting.pathArray.h);
                this.pathArray = new map.Map2DSettingString(setting.pathArray.data, setting.pathArray.w, setting.pathArray.h);
                this.alphaArray = new map.Map2DSettingString(setting.alphaArray.data, setting.pathArray.w, setting.pathArray.h);
                if (setting.enginevo) {
                    this.gridwidth_pixal = setting.enginevo.gridwidth_pixal;
                    this.gridheight_pixal = setting.enginevo.gridheight_pixal;
                }
            }
            return MapData;
        }());
        map.MapData = MapData;
        __reflect(MapData.prototype, "engin.map.MapData");
    })(map = engin.map || (engin.map = {}));
})(engin || (engin = {}));
//# sourceMappingURL=MapData.js.map
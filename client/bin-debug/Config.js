var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Config = (function () {
    function Config() {
        this._cdnPath = "http://192.168.2.61:5566/cdn/";
    }
    Config.prototype.getMapDataUrl = function (mapId) {
        return this._cdnPath + "m/data/" + mapId + ".json";
    };
    Config.prototype.getMapCellUrl = function (mapId, row, col) {
        return this._cdnPath + "m/" + mapId + "/" + this.getStrLen(row, 3) + this.getStrLen(col, 3) + ".jpg";
    };
    Config.prototype.getStrLen = function (num, len) {
        var str = num.toString();
        for (var i = str.length; i < len; i++)
            str = "0" + str;
        return str;
    };
    return Config;
}());
__reflect(Config.prototype, "Config");
//# sourceMappingURL=Config.js.map
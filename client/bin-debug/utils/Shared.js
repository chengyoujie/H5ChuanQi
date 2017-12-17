var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    var Shared = (function () {
        function Shared() {
        }
        return Shared;
    }());
    Shared.tempPoint = new egret.Point();
    Shared.tempRect = new egret.Rectangle();
    Shared.tempMatrix = new egret.Matrix();
    utils.Shared = Shared;
    __reflect(Shared.prototype, "utils.Shared");
})(utils || (utils = {}));
//# sourceMappingURL=Shared.js.map
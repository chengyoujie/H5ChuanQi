var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engin;
(function (engin) {
    var avater;
    (function (avater) {
        var AvaterLayer = (function (_super) {
            __extends(AvaterLayer, _super);
            function AvaterLayer() {
                var _this = _super.call(this) || this;
                _this._units = new Array();
                Facade.instance.stage.addEventListener(egret.Event.ENTER_FRAME, _this.render, _this);
                return _this;
            }
            AvaterLayer.prototype.addUnit = function (unit) {
                if (this._units.indexOf(unit) != -1) {
                    egret.log(unit + "已经添加到AvaterLayer中");
                    return;
                }
                this._units.push(unit);
                this.addChild(unit);
            };
            AvaterLayer.prototype.removeUnit = function (unit) {
                var index = this._units.indexOf(unit);
                if (index == -1) {
                    egret.log(unit + "不再AvaterLayer删除失败");
                    return;
                }
                this._units.splice(index);
            };
            AvaterLayer.prototype.renderPosChange = function () {
                var len = this._units.length;
                for (var i = 0; i < len; i++) {
                    this._units[i].renderPos();
                }
            };
            AvaterLayer.prototype.render = function () {
                var len = this._units.length;
                for (var i = 0; i < len; i++) {
                    this._units[i].render();
                }
            };
            return AvaterLayer;
        }(egret.Sprite));
        avater.AvaterLayer = AvaterLayer;
        __reflect(AvaterLayer.prototype, "engin.avater.AvaterLayer");
    })(avater = engin.avater || (engin.avater = {}));
})(engin || (engin = {}));
//# sourceMappingURL=AvaterLayer.js.map
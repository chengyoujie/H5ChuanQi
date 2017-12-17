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
        var Unit = (function (_super) {
            __extends(Unit, _super);
            function Unit() {
                var _this = _super.call(this) || this;
                _this._mapx = 0;
                _this._mapy = 0;
                _this.init();
                return _this;
            }
            Unit.prototype.init = function () {
                this.graphics.clear();
                this.graphics.beginFill(0xcc0000, 0.5);
                this.graphics.drawCircle(-10, -10, 20);
                this.graphics.endFill();
            };
            Object.defineProperty(Unit.prototype, "mapx", {
                get: function () {
                    return this._mapx;
                },
                set: function (value) {
                    this.$setMapX(value);
                    _super.prototype.$setX.call(this, Facade.instance.convertMapToStageX(value));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "mapy", {
                get: function () {
                    return this._mapy;
                },
                set: function (value) {
                    this.$setMapY(value);
                    _super.prototype.$setY.call(this, Facade.instance.convertMapToStageY(value));
                },
                enumerable: true,
                configurable: true
            });
            Unit.prototype.$setX = function (value) {
                this.$setMapX(Facade.instance.convertStageToMapX(value));
                return _super.prototype.$setX.call(this, value);
            };
            Unit.prototype.$setY = function (value) {
                this.$setMapY(Facade.instance.convertStageToMapY(value));
                return _super.prototype.$setY.call(this, value);
            };
            Unit.prototype.$setMapX = function (mapX) {
                this._mapx = mapX;
            };
            Unit.prototype.$setMapY = function (mapY) {
                this._mapy = mapY;
            };
            Unit.prototype.renderPos = function () {
                _super.prototype.$setX.call(this, Facade.instance.convertMapToStageX(this._mapx));
                _super.prototype.$setY.call(this, Facade.instance.convertMapToStageY(this._mapy));
            };
            Object.defineProperty(Unit.prototype, "gridx", {
                get: function () {
                    return Facade.instance.convertMapToGridX(this._mapx);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Unit.prototype, "gridy", {
                get: function () {
                    return Facade.instance.convertMapToGridY(this._mapy);
                },
                enumerable: true,
                configurable: true
            });
            return Unit;
        }(egret.Sprite));
        avater.Unit = Unit;
        __reflect(Unit.prototype, "engin.avater.Unit");
    })(avater = engin.avater || (engin.avater = {}));
})(engin || (engin = {}));
//# sourceMappingURL=Unit.js.map
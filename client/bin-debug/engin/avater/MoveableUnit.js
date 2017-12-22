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
        var MoveableUnit = (function (_super) {
            __extends(MoveableUnit, _super);
            function MoveableUnit() {
                var _this = _super.call(this) || this;
                _this._speed = 1;
                _this._moveTime = 250;
                _this._steppixe = 1;
                _this._stepx = 0;
                _this._stepy = 0;
                _this._stepstartx = 0;
                _this._stepstarty = 0;
                _this._stepstartime = 0;
                _this._stependx = 0;
                _this._stependy = 0;
                _this._ismove = false;
                return _this;
            }
            MoveableUnit.prototype.moveTo = function (gridx, gridy) {
                if (this._ismove)
                    return;
                if (Facade.instance.mapLayer.getWalk(gridx, gridy) == false)
                    return;
                var tomapx = Facade.instance.convertGridCenterToMapX(gridx);
                var tomapy = Facade.instance.convertGridCenterToMapY(gridy);
                if (tomapx == this.mapx && tomapy == this.mapy)
                    return;
                this._stependx = tomapx;
                this._stependy = tomapy;
                tomapx = this._stependx - this.mapx;
                tomapy = this._stependy - this.mapy;
                this._stepstartx = this.mapx;
                this._stepstarty = this.mapy;
                this._stepstartime = egret.getTimer();
                this._stepx = tomapx / this._moveTime;
                this._stepy = tomapy / this._moveTime;
                this._ismove = true;
                this.action = utils.ActionState.STATE_RUN;
                Facade.instance.stage.addEventListener(egret.Event.ENTER_FRAME, this.handleMove, this);
            };
            MoveableUnit.prototype.handleMove = function (e) {
                var last = egret.getTimer() - this._stepstartime;
                if (last < this._moveTime) {
                    this.mapx = this._stepstartx + last * this._stepx;
                    this.mapy = this._stepstarty + last * this._stepy;
                }
                else {
                    this.mapx = this._stependx;
                    this.mapy = this._stependy;
                    this._ismove = false;
                    Facade.instance.stage.removeEventListener(egret.Event.ENTER_FRAME, this.handleMove, this);
                    this.moveComplete();
                }
            };
            Object.defineProperty(MoveableUnit.prototype, "isMove", {
                get: function () {
                    return this._ismove;
                },
                enumerable: true,
                configurable: true
            });
            MoveableUnit.prototype.moveComplete = function () {
                this.action = utils.ActionState.STATE_IDLE;
            };
            return MoveableUnit;
        }(avater.Unit));
        avater.MoveableUnit = MoveableUnit;
        __reflect(MoveableUnit.prototype, "engin.avater.MoveableUnit");
    })(avater = engin.avater || (engin.avater = {}));
})(engin || (engin = {}));
//# sourceMappingURL=MoveableUnit.js.map
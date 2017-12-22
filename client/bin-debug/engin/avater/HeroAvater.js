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
        var HeroAvater = (function (_super) {
            __extends(HeroAvater, _super);
            function HeroAvater() {
                return _super.call(this) || this;
            }
            HeroAvater.prototype.init = function () {
                _super.prototype.init.call(this);
                this.graphics.clear();
                this.graphics.beginFill(0xccCC00, 0.8);
                this.graphics.drawCircle(-2, -2, 4);
                this.graphics.endFill();
            };
            HeroAvater.prototype.$setMapX = function (mapX) {
                _super.prototype.$setMapX.call(this, mapX);
                Facade.instance.heroViewRectChange(this.mapx, this.mapy);
            };
            HeroAvater.prototype.$setMapY = function (mapY) {
                _super.prototype.$setMapY.call(this, mapY);
                Facade.instance.heroViewRectChange(this.mapx, this.mapy);
            };
            HeroAvater.prototype.renderPos = function () {
            };
            // private moveStepEndEvent:engin.event.UnitEvent = new engin.event.UnitEvent(event.UnitEvent.EVENT_MOVE_STEP_END, true);
            HeroAvater.prototype.moveComplete = function () {
                if (Facade.instance.isTouch) {
                    var dir = utils.Direction.getMouseDirection8(this.x, this.y, Facade.instance.touchPos.x, Facade.instance.touchPos.y);
                    var dirarr = utils.Direction.FACE_POS[dir];
                    this.direction = dir;
                    this.moveTo(this.gridx + dirarr[0], this.gridy + dirarr[1]);
                }
                else {
                    _super.prototype.moveComplete.call(this);
                }
            };
            // private _willto:egret.Point = new egret.Point();
            // private _isWillGo:boolean = false;
            HeroAvater.prototype.startMove = function () {
                // this._willto.x = willtox;
                // this._willto.y = willtoy;
                // this._isWillGo= true;
                this.moveComplete();
            };
            return HeroAvater;
        }(avater.Role));
        avater.HeroAvater = HeroAvater;
        __reflect(HeroAvater.prototype, "engin.avater.HeroAvater");
    })(avater = engin.avater || (engin.avater = {}));
})(engin || (engin = {}));
//# sourceMappingURL=HeroAvater.js.map
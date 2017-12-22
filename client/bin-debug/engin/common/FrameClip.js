var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var engin;
(function (engin) {
    var common;
    (function (common) {
        var FrameClip = (function () {
            function FrameClip(res) {
                if (res === void 0) { res = null; }
                this._frame = 0;
                this._rect = new egret.Rectangle();
                this._frame = 0;
                this._res = res;
            }
            FrameClip.prototype.setFrameRes = function (res) {
                this._res = res;
            };
            FrameClip.prototype.gotoNextFrame = function () {
                if (this._res == null || this._res.length <= 0)
                    return;
                this._frame += 1;
                this._frame = this._frame % this._res.length;
                egret.log(this._frame + "   len:" + this._res.length);
            };
            FrameClip.prototype.render = function (texture) {
                if (this._res == null)
                    return;
                if (this._res.isReady == false)
                    return;
                var obj = this._res.getFrameData(this._frame);
                if (!obj)
                    return;
                this._rect.x = obj.ix - obj.ox;
                this._rect.y = obj.iy - obj.oy;
                this._rect.width = obj.width;
                this._rect.height = obj.height;
                texture.drawToTexture(this._res.bd, this._rect);
            };
            return FrameClip;
        }());
        common.FrameClip = FrameClip;
        __reflect(FrameClip.prototype, "engin.common.FrameClip");
    })(common = engin.common || (engin.common = {}));
})(engin || (engin = {}));
//# sourceMappingURL=FrameClip.js.map
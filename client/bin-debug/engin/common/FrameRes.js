var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var engin;
(function (engin) {
    var common;
    (function (common) {
        var FrameRes = (function () {
            function FrameRes(url, name) {
                this._state = 0;
                this._url = url;
                this._name = name;
                this._state = FrameRes.STATE_PRE;
                Facade.instance.loader.loadTexture(this._url + "/" + this._name + ".png", this, this.handleImgLoaded);
                Facade.instance.loader.loadJson(this._url + "/" + this._name + ".json", this, this.handleJsonLoaded);
            }
            FrameRes.prototype.handleImgLoaded = function (res) {
                this._state++;
                this._texture = res.data;
                //this._bd = new egret.Bitmap(this._texture);
            };
            FrameRes.prototype.handleJsonLoaded = function (res) {
                this._state++;
                this._data = res.data;
            };
            Object.defineProperty(FrameRes.prototype, "isReady", {
                get: function () {
                    return this._state == FrameRes.STATE_READY;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FrameRes.prototype, "length", {
                get: function () {
                    if (this._data)
                        return this._data.length;
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FrameRes.prototype, "bd", {
                get: function () {
                    if (this._bd == null)
                        this._bd = new egret.Bitmap(this._texture);
                    return this._bd;
                },
                enumerable: true,
                configurable: true
            });
            FrameRes.prototype.getFrameData = function (frame) {
                if (this._data == null)
                    return null;
                if (frame < 0 || frame > this._data.length)
                    return null;
                return this._data[frame];
            };
            FrameRes.prototype.dispose = function () {
                if (this._bd) {
                    this._bd = null;
                }
                if (this._texture) {
                    this._texture.dispose();
                    this._texture = null;
                }
                if (this._data) {
                    this._data = null;
                }
                this._state = FrameRes.STATE_DISPOSE;
            };
            return FrameRes;
        }());
        FrameRes.STATE_PRE = 0;
        FrameRes.STATE_READY = 2;
        FrameRes.STATE_DISPOSE = 2;
        common.FrameRes = FrameRes;
        __reflect(FrameRes.prototype, "engin.common.FrameRes");
    })(common = engin.common || (engin.common = {}));
})(engin || (engin = {}));
//# sourceMappingURL=FrameRes.js.map
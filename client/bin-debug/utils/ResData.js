var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    var ResData = (function () {
        function ResData() {
        }
        ResData.prototype.init = function (url, type, _this, complete, params, error, progress) {
            if (complete === void 0) { complete = null; }
            if (params === void 0) { params = null; }
            if (error === void 0) { error = null; }
            if (progress === void 0) { progress = null; }
            this.url = url;
            this.type = type;
            this.complete = complete;
            this.error = error;
            this.progress = progress;
            this.params = params;
            this._this = _this;
        };
        ResData.prototype.reset = function () {
            this.url = null;
            this.type = null;
            this.complete = null;
            this.error = null;
            this.progress = null;
            this.params = null;
            this._this = null;
        };
        ResData.prototype.execComplete = function () {
            this.exec(this.complete);
        };
        ResData.prototype.execError = function () {
            this.exec(this.error);
        };
        ResData.prototype.execProgress = function () {
            this.exec(this.progress);
        };
        ResData.prototype.exec = function (fun) {
            if (fun)
                fun.call(this._this, this);
        };
        return ResData;
    }());
    /**文本类型 */
    ResData.TYPE_TXT = 0;
    /**字节数组类型 */
    ResData.TYPE_BYT = 1;
    /**图片类型 */
    ResData.TYPE_TEXTURE = 2;
    /**JSON类型 */
    ResData.TYPE_JSON = 3;
    /**自定义-CYJ类型 */
    ResData.TYPE_CYJ = 4;
    utils.ResData = ResData;
    __reflect(ResData.prototype, "utils.ResData");
})(utils || (utils = {}));
//# sourceMappingURL=ResData.js.map
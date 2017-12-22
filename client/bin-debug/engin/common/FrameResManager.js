var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var engin;
(function (engin) {
    var common;
    (function (common) {
        var FrameResManager = (function () {
            function FrameResManager() {
                this._cache = {};
            }
            FrameResManager.prototype.getRes = function (dirname, resname, direction, action) {
                var url = Facade.instance.config.getPakResPath(dirname);
                var name = Facade.instance.config.getPakResName(resname, direction, action);
                if (this._cache[url + name] == null) {
                    this._cache[url + name] = new common.FrameRes(url, name);
                }
                return this._cache[url + name];
            };
            return FrameResManager;
        }());
        common.FrameResManager = FrameResManager;
        __reflect(FrameResManager.prototype, "engin.common.FrameResManager");
    })(common = engin.common || (engin.common = {}));
})(engin || (engin = {}));
//# sourceMappingURL=FrameResManager.js.map
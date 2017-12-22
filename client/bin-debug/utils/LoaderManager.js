var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    var LoaderManager = (function () {
        function LoaderManager() {
            this.maxCacheNum = 40;
            // private minCacheNum:number = 5;
            this._cache = new Array();
            // private _wait:Array<ResData> = new Array<ResData>();
            this._pool = new Array();
        }
        LoaderManager.prototype.load = function (url, type, _this, complete, params, error, progress) {
            if (_this === void 0) { _this = null; }
            if (complete === void 0) { complete = null; }
            if (params === void 0) { params = null; }
            if (error === void 0) { error = null; }
            if (progress === void 0) { progress = null; }
            var res = this.getResData();
            res.init(url, type, _this, complete, params, error, progress);
            var loader = this.getResLoader();
            loader.load(res);
        };
        LoaderManager.prototype.loadByte = function (url, _this, complete, params, error, progress) {
            if (_this === void 0) { _this = null; }
            if (complete === void 0) { complete = null; }
            if (params === void 0) { params = null; }
            if (error === void 0) { error = null; }
            if (progress === void 0) { progress = null; }
            this.load(url, utils.ResData.TYPE_BYT, _this, complete, params, error, progress);
        };
        LoaderManager.prototype.loadText = function (url, _this, complete, params, error, progress) {
            if (_this === void 0) { _this = null; }
            if (complete === void 0) { complete = null; }
            if (params === void 0) { params = null; }
            if (error === void 0) { error = null; }
            if (progress === void 0) { progress = null; }
            this.load(url, utils.ResData.TYPE_TXT, _this, complete, params, error, progress);
        };
        LoaderManager.prototype.loadJson = function (url, _this, complete, params, error, progress) {
            if (_this === void 0) { _this = null; }
            if (complete === void 0) { complete = null; }
            if (params === void 0) { params = null; }
            if (error === void 0) { error = null; }
            if (progress === void 0) { progress = null; }
            this.load(url, utils.ResData.TYPE_JSON, _this, complete, params, error, progress);
        };
        LoaderManager.prototype.loadTexture = function (url, _this, complete, params, error, progress) {
            if (_this === void 0) { _this = null; }
            if (complete === void 0) { complete = null; }
            if (params === void 0) { params = null; }
            if (error === void 0) { error = null; }
            if (progress === void 0) { progress = null; }
            this.load(url, utils.ResData.TYPE_TEXTURE, _this, complete, params, error, progress);
        };
        LoaderManager.prototype.loadCyj = function (url, _this, complete, params, error, progress) {
            if (_this === void 0) { _this = null; }
            if (complete === void 0) { complete = null; }
            if (params === void 0) { params = null; }
            if (error === void 0) { error = null; }
            if (progress === void 0) { progress = null; }
            this.load(url, utils.ResData.TYPE_CYJ, _this, complete, params, error, progress);
        };
        LoaderManager.prototype.pushPool = function (loader, res) {
            if (this._pool.length > this.maxCacheNum) {
                res = null;
            }
            else {
                res.reset();
                this._pool.push(res);
            }
            if (this._cache.length > this.maxCacheNum) {
                loader = null;
            }
            else {
                this._cache.push(loader);
            }
        };
        LoaderManager.prototype.getResData = function () {
            var res;
            if (this._pool.length > 0)
                res = this._pool.shift();
            else
                res = new utils.ResData();
            // res.reset();
            return res;
        };
        LoaderManager.prototype.getResLoader = function () {
            var loader;
            if (this._cache.length > 0)
                loader = this._cache.shift();
            else {
                loader = new utils.Loader();
                loader.bindManager(this);
            }
            return loader;
        };
        return LoaderManager;
    }());
    utils.LoaderManager = LoaderManager;
    __reflect(LoaderManager.prototype, "utils.LoaderManager");
})(utils || (utils = {}));
//# sourceMappingURL=LoaderManager.js.map
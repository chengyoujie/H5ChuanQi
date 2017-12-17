var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    var Loader = (function () {
        function Loader() {
            this.initLoader();
        }
        Loader.prototype.bindManager = function (manager) {
            this._manager = manager;
        };
        Loader.prototype.load = function (res) {
            this.clearn();
            this._res = res;
            this.startLoader();
        };
        Loader.prototype.initLoader = function () {
            this._loader = new egret.URLLoader();
            // this._imgLoader = new egret.ImageLoader();
        };
        Loader.prototype.startLoader = function () {
            // if(this._res.type == ResData.TYPE_IMG)
            // {
            // 	this._imgLoader.load(this._res.url);
            // 	if(this._res.complete)
            // 		this._imgLoader.addEventListener(egret.Event.COMPLETE, this.handleComplete, this);
            // 	if(this._res.error)
            // 		this._imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.handleError, this);
            // 	if(this._res.progress)
            // 		this._imgLoader.addEventListener(egret.ProgressEvent.PROGRESS, this.handleProgress, this);
            // }else{
            if (this._res.type == utils.ResData.TYPE_BYT)
                this._loader.dataFormat = egret.URLLoaderDataFormat.BINARY;
            else if (this._res.type == utils.ResData.TYPE_TEXTURE)
                this._loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
            else if (this._res.type == utils.ResData.TYPE_JSON)
                this._loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            else if (this._res.type == utils.ResData.TYPE_CYJ)
                this._loader.dataFormat = egret.URLLoaderDataFormat.BINARY;
            else
                this._loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            if (this._res.complete)
                this._loader.addEventListener(egret.Event.COMPLETE, this.handleComplete, this);
            if (this._res.error)
                this._loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.handleError, this);
            if (this._res.progress)
                this._loader.addEventListener(egret.ProgressEvent.PROGRESS, this.handleProgress, this);
            this._loader.load(new egret.URLRequest(this._res.url));
            // }
        };
        Loader.prototype.handleComplete = function (e) {
            if (this._res) {
                if (this._res.type == utils.ResData.TYPE_TEXTURE)
                    this._res.data = this._loader.data;
                else if (this._res.type == utils.ResData.TYPE_BYT)
                    this._res.data = new egret.ByteArray(this._loader.data);
                else if (this._res.type == utils.ResData.TYPE_JSON)
                    this._res.data = JSON.parse(this._loader.data);
                else if (this._res.type == utils.ResData.TYPE_CYJ)
                    this._res.data = utils.DataParser.parserCyj(this._loader.data);
                else
                    this._res.data = this._loader.data;
                this._res.execComplete();
                this.clearn();
            }
        };
        Loader.prototype.handleError = function (e) {
            if (this._res) {
                this._res.data = null;
                this._res.message = "Error:" + e.type;
                this._res.execError();
                this.clearn();
            }
        };
        Loader.prototype.handleProgress = function (e) {
            if (this._res) {
                this._res.message = e.bytesLoaded / e.bytesTotal;
                this._res.execProgress();
            }
        };
        Loader.prototype.clearn = function () {
            if (this._res == null)
                return;
            // if(this._res.type == ResData.TYPE_IMG)
            // {
            // 	if(this._res.complete)
            // 		this._imgLoader.removeEventListener(egret.Event.COMPLETE, this.handleComplete, this);
            // 	if(this._res.error)
            // 		this._imgLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.handleError, this);
            // 	if(this._res.progress)
            // 		this._imgLoader.removeEventListener(egret.ProgressEvent.PROGRESS, this.handleProgress, this);
            // }else
            // {
            if (this._res.complete)
                this._loader.removeEventListener(egret.Event.COMPLETE, this.handleComplete, this);
            if (this._res.error)
                this._loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.handleError, this);
            if (this._res.progress)
                this._loader.removeEventListener(egret.ProgressEvent.PROGRESS, this.handleProgress, this);
            // }
            if (this._manager)
                this._manager.pushPool(this, this._res);
            else
                this._res.reset();
            this._res = null;
            this._loader.data = null;
        };
        return Loader;
    }());
    utils.Loader = Loader;
    __reflect(Loader.prototype, "utils.Loader");
})(utils || (utils = {}));
//# sourceMappingURL=Loader.js.map
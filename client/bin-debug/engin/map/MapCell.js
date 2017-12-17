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
    var map;
    (function (map) {
        var MapCell = (function (_super) {
            __extends(MapCell, _super);
            // private _posX:number=0;
            // private _posY:number = 0;
            // private _txt:egret.TextField;
            function MapCell(contain, mapid, col, row) {
                var _this = _super.call(this) || this;
                _this._row = -1;
                _this._col = -1;
                _this.init();
                _this.changeCell(mapid, row, col);
                contain.addChild(_this);
                return _this;
            }
            MapCell.prototype.init = function () {
                this.graphics.clear();
                // this.graphics.lineStyle(1, 0xcc0000, 0.6);
                this.graphics.beginFill(0x000000, 0.5);
                this.graphics.drawRect(0, 0, MapCell.WIDTH, MapCell.HEIGHT);
                this.graphics.endFill();
                this._bmp = new egret.Bitmap();
                this.addChild(this._bmp);
                // this._loader = new egret.ImageLoader();
                // this._loader.addEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);
                // this._loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.loadError, this);
                // this._txt = new egret.TextField();
                // this.addChild(this._txt);
            };
            MapCell.prototype.loadError = function (e) {
                this._bmp.bitmapData = null;
            };
            // private loadCompleteHandler(e:egret.Event)
            // {
            // 	if(this._loader==null)return;
            // 	this._bmp.bitmapData = this._loader.data;
            // 	this._loader.data = null;
            // }
            MapCell.prototype.loadCompleteHandler = function (res) {
                this._bmp.bitmapData = res.data.bitmapData;
            };
            MapCell.prototype.changeCell = function (mapid, row, col) {
                if (this._mapId == mapid && this._row == row && this._col == col)
                    return;
                this._row = row;
                this._col = col;
                this._mapId = mapid;
                // this._loader.load(GameConfig.RES_PATH+"m/"+this._mapId+"/"+this.getStrLen(this._row, 3)+this.getStrLen(this._col, 3)+".jpg")
                Facade.instance.loader.loadTexture(Facade.instance.config.getMapCellUrl(this._mapId, this._row, this._col), this, this.loadCompleteHandler);
                // this._posX = this._col*MapCell.WIDTH;
                // this._posY = this._row*MapCell.HEIGHT;
                // this._txt.text = "Row:"+this._row+" Col:"+this._col;
            };
            MapCell.prototype.getStrLen = function (num, len) {
                var str = num.toString();
                for (var i = str.length; i < len; i++)
                    str = "0" + str;
                return str;
            };
            // public get posY():number
            // {
            // 	return this._posY;
            // }
            // public get posX():number
            // {
            // 	return this._posX;
            // }
            MapCell.prototype.dispose = function () {
                this.graphics.clear();
                if (this.parent)
                    this.parent.removeChild(this);
                // if(this._bmp.bitmapData)
                // 	this._bmp.bitmapData.$dispose();
                // this._loader.removeEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);
                // this._loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadError, this);
                // this._loader.data = null;
                // this._loader = null;
            };
            return MapCell;
        }(egret.Sprite));
        MapCell.WIDTH = 256;
        MapCell.HEIGHT = 256;
        MapCell.GRID_W = 60;
        MapCell.GRID_H = 30;
        map.MapCell = MapCell;
        __reflect(MapCell.prototype, "engin.map.MapCell");
    })(map = engin.map || (engin.map = {}));
})(engin || (engin = {}));
//# sourceMappingURL=MapCell.js.map
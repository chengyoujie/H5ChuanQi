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
        var MapLayer = (function (_super) {
            __extends(MapLayer, _super);
            function MapLayer() {
                var _this = _super.call(this) || this;
                _this.init();
                return _this;
            }
            MapLayer.prototype.init = function () {
                this._rect = new egret.Rectangle(0, 0, 1, 1);
                this._mapCells = new Array();
                // this.setViewSize(400, 600);
            };
            /** 设置可视区的大小**/
            MapLayer.prototype.setViewSize = function (w, h) {
                this._rect.width = w;
                this._rect.height = h;
                // this.graphics.clear();
                // this.graphics.beginFill(0xcc0000, 0.1);
                // this.graphics.drawRect(0, 0, this._rect.width, this._rect.height);
                // this.graphics.endFill();
                if (this._curMapVo == null)
                    return;
                var col = Math.ceil(this._rect.width / map.MapCell.WIDTH) + 1; //列数
                var row = Math.ceil(this._rect.height / map.MapCell.HEIGHT) + 1; //行数
                var len = this._mapCells.length;
                var rlen = len > 0 ? this._mapCells[0].length : 0;
                var i = 0;
                var j = 0;
                var temp;
                var cell;
                var mapid = this._curMapVo.guid;
                if (len > col) {
                    for (i = len - 1; i >= col; i--) {
                        temp = this._mapCells[i];
                        for (j = temp.length - 1; j >= 0; j--) {
                            cell = temp[j];
                            cell.dispose();
                            cell = null;
                        }
                        this._mapCells.splice(i, 1);
                    }
                }
                else if (len < col) {
                    for (i = len; i < col; i++) {
                        temp = new Array();
                        for (j = 0; j < row; j++) {
                            cell = new map.MapCell(this, mapid, i, j);
                            temp.push(cell);
                        }
                        this._mapCells.push(temp);
                    }
                }
                //列数
                if (rlen > row) {
                    for (i = 0; i < col; i++) {
                        temp = this._mapCells[i];
                        for (j = temp.length - 1; j >= row; j--) {
                            cell = temp[j];
                            cell.dispose();
                            temp.splice(j, 1);
                            cell = null;
                        }
                    }
                }
                else if (rlen < row) {
                    for (i = 0; i < col; i++) {
                        temp = this._mapCells[i];
                        for (j = temp.length; j < row; j++) {
                            cell = new map.MapCell(this, mapid, i, j);
                            temp.push(cell);
                        }
                    }
                }
                this.refushViewRect();
                //测试
                // this.printCellInfo();
            };
            /**测试 */
            MapLayer.prototype.printCellInfo = function () {
                var cell;
                var result = "";
                for (var i = 0; i < this._mapCells.length; i++) {
                    for (var j = 0; j < this._mapCells[i].length; j++) {
                        cell = this._mapCells[i][j];
                        result += "[" + i + "," + j + "]  ";
                    }
                    result + "\n";
                }
                egret.log(result);
            };
            /* 镜头移动 */
            MapLayer.prototype.setViewPos = function (x, y) {
                if (x < 0)
                    x = 0;
                if (y < 0)
                    y = 0;
                this._rect.x = x;
                this._rect.y = y;
                // egret.log("设置可视区位置："+x+","+y);
                this.refushViewRect();
            };
            Object.defineProperty(MapLayer.prototype, "posX", {
                get: function () {
                    return this._rect.x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MapLayer.prototype, "posY", {
                get: function () {
                    return this._rect.y;
                },
                enumerable: true,
                configurable: true
            });
            MapLayer.prototype.refushViewRect = function () {
                if (this._curMapVo == null)
                    return;
                this.rectcol = Math.floor(this._rect.x / map.MapCell.WIDTH); //列数
                this.rectrow = Math.floor(this._rect.y / map.MapCell.HEIGHT); //行数
                this.offsetx = this._rect.x % map.MapCell.WIDTH;
                this.offsety = this._rect.y % map.MapCell.HEIGHT;
                var len = this._mapCells.length;
                var temp;
                var cell;
                var mapid = this._curMapVo.guid;
                for (var i = 0; i < len; i++) {
                    temp = this._mapCells[i];
                    for (var j = 0; j < temp.length; j++) {
                        cell = temp[j];
                        cell.changeCell(mapid, this.rectrow + j, this.rectcol + i);
                        cell.x = i * map.MapCell.WIDTH - this.offsetx;
                        cell.y = j * map.MapCell.HEIGHT - this.offsety;
                    }
                }
                //gird
                this.testGrid();
            };
            MapLayer.prototype.testGrid = function () {
                if (this._curMapVo == null)
                    return;
                if (this._testGrid == null) {
                    this._testGrid = new egret.Sprite();
                    // this._testGrid.scaleX = this._testGrid.scaleY= 0.05;
                    this.addChild(this._testGrid);
                }
                this.swapChildren(this._testGrid, this.getChildAt(this.numChildren - 1));
                var gcol = Math.ceil(this._rect.height / map.MapCell.GRID_H) + 1;
                var grow = Math.ceil(this._rect.width / map.MapCell.GRID_W) + 1;
                var startcol = Math.floor(this._rect.y / map.MapCell.GRID_H);
                var startrow = Math.floor(this._rect.x / map.MapCell.GRID_W);
                var offx = this._rect.x % map.MapCell.GRID_W;
                var offy = this._rect.y % map.MapCell.GRID_H;
                this._testGrid.graphics.clear();
                this._testGrid.graphics.lineStyle(1, 0);
                var gx;
                var gy;
                var color = 0xcc0000;
                var alpha = 0.2;
                egret.log("row" + startrow + " col:" + startcol + " value:" + this._curMapVo.pathArray.getWalk(startrow, startcol));
                for (var i = 0; i < gcol; i++) {
                    for (var j = 0; j < grow; j++) {
                        gx = (j) * map.MapCell.GRID_W - offx;
                        gy = (i) * map.MapCell.GRID_H - offy;
                        if (this._curMapVo.pathArray.getWalk(startrow + j, startcol + i) == 0) {
                            color = 0xcc0000;
                        }
                        else {
                            color = 0x00cc00;
                        }
                        // alpha = this._curMapVo.alphaArray.getAlpha(startrow+j, startcol+i)/10;
                        // egret.log(this._curMapVo.alphaArray.getAlpha(startrow+j, startcol+i));
                        // if(this._curMapVo.alphaArray.getAlpha(startrow+j, startcol+i)/10!=1)
                        // {
                        // 	color =0xcc0000;
                        // }else{
                        // 	color = 0x00cc00;
                        // }
                        this._testGrid.graphics.beginFill(color, 0.1);
                        this._testGrid.graphics.drawRect(gx, gy, map.MapCell.GRID_W, map.MapCell.GRID_H);
                    }
                }
                this._testGrid.graphics.endFill();
            };
            MapLayer.prototype.getWalk = function (gridx, gridy) {
                if (this._curMapVo == null)
                    return false;
                //egret.log("row"+Math.ceil(mapx/MapCell.GRID_W)+" col:"+Math.ceil(mapy/MapCell.GRID_H)+" value:"+this._curMapVo.pathArray.getWalk(Math.ceil(mapx/MapCell.GRID_W), Math.ceil(mapy/MapCell.GRID_H)))
                return this._curMapVo.pathArray.getWalk(gridx, gridy) != 0;
            };
            MapLayer.prototype.changeMap = function (mapId) {
                this._loader = new egret.URLLoader();
                this._loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
                this._loader.addEventListener(egret.Event.COMPLETE, this.handleDataLoaded, this);
                this._loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.handleIoError, this);
                this._loader.load(new egret.URLRequest(Facade.instance.config.getMapDataUrl(mapId)));
            };
            MapLayer.prototype.handleDataLoaded = function (e) {
                var mapinfo = JSON.parse(this._loader.data);
                this._curMapVo = new map.MapData(mapinfo);
                this.enterMapSuccess();
            };
            MapLayer.prototype.handleIoError = function (e) {
                this.enterMapFailed();
            };
            MapLayer.prototype.enterMapSuccess = function () {
                this.setViewSize(Facade.instance.stage.stageWidth, Facade.instance.stage.stageHeight);
                // this.testGrid();
            };
            MapLayer.prototype.enterMapFailed = function () {
            };
            return MapLayer;
        }(egret.Sprite));
        map.MapLayer = MapLayer;
        __reflect(MapLayer.prototype, "engin.map.MapLayer");
    })(map = engin.map || (engin.map = {}));
})(engin || (engin = {}));
//# sourceMappingURL=MapLayer.js.map
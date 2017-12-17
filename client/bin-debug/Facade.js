var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Facade = (function () {
    function Facade() {
        this._touchPos = new egret.Point();
        this._isTouch = false;
        if (Facade._singleClassMark == false) {
            throw new Error("Facade 不能实例化");
        }
        this._view = new view.View();
        this._config = new Config();
        this._loader = new utils.LoaderManager();
    }
    Object.defineProperty(Facade, "instance", {
        get: function () {
            if (this._instance == null) {
                this._singleClassMark = true;
                this._instance = new Facade();
                this._singleClassMark = false;
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Facade.prototype.start = function (stage) {
        this._stage = stage;
        this._mapLayer = new engin.map.MapLayer();
        this._avaterLayer = new engin.avater.AvaterLayer();
        stage.addChild(this._mapLayer);
        stage.addChild(this._avaterLayer);
        // layer.setViewPos(stage.stageWidth, stage.stageHeight)
        //this._mapLayer.setViewPos(0, 0);
        this._mapLayer.changeMap(1001);
        this._heroAvater = new engin.avater.HeroAvater();
        this._heroAvater.mapx = 1460;
        this._heroAvater.mapy = 2480;
        this._avaterLayer.addUnit(this._heroAvater);
        var role2 = new engin.avater.Role();
        role2.mapx = 1410;
        role2.mapy = 2580;
        this._avaterLayer.addUnit(role2);
        stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.handleTouchStart, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_END, this.handleTouchChange, this);
    };
    Object.defineProperty(Facade.prototype, "stage", {
        get: function () {
            return this._stage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Facade.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Facade.prototype, "loader", {
        get: function () {
            return this._loader;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Facade.prototype, "mapLayer", {
        get: function () {
            return this._mapLayer;
        },
        enumerable: true,
        configurable: true
    });
    Facade.prototype.convertStageToMapPos = function (stagex, stagey) {
        utils.Shared.tempPoint.x = this._mapLayer.posX + stagex;
        utils.Shared.tempPoint.y = this._mapLayer.posX + stagey;
        return utils.Shared.tempPoint;
    };
    Facade.prototype.convertStageToMapX = function (stagex) {
        return this._mapLayer.posX + stagex;
    };
    Facade.prototype.convertStageToMapY = function (stagey) {
        return this._mapLayer.posY + stagey;
    };
    Facade.prototype.convertMapToStagePos = function (mapx, mapy) {
        utils.Shared.tempPoint.x = mapx - this._mapLayer.posX;
        utils.Shared.tempPoint.y = mapy - this._mapLayer.posY;
        return utils.Shared.tempPoint;
    };
    Facade.prototype.convertMapToStageX = function (mapx) {
        return mapx - this._mapLayer.posX;
    };
    Facade.prototype.convertMapToStageY = function (mapy) {
        return mapy - this._mapLayer.posY;
    };
    // public convertMapToGrid(mapx:number, mapy:number):egret.Point
    // {
    // 	utils.Shared.tempPoint.x = Math.ceil(mapx/engin.map.MapCell.GRID_W);
    // 	utils.Shared.tempPoint.y = Math.ceil(mapy/engin.map.MapCell.GRID_H);
    // 	return utils.Shared.tempPoint;
    // }
    Facade.prototype.convertMapToGridX = function (mapx) {
        return Math.floor(mapx / engin.map.MapCell.GRID_W);
    };
    Facade.prototype.convertMapToGridY = function (mapy) {
        return Math.floor(mapy / engin.map.MapCell.GRID_H);
    };
    Facade.prototype.convertGridCenterToMapX = function (gridx) {
        return gridx * engin.map.MapCell.GRID_W + engin.map.MapCell.GRID_W / 2;
    };
    Facade.prototype.convertGridCenterToMapY = function (gridy) {
        return gridy * engin.map.MapCell.GRID_H + engin.map.MapCell.GRID_H / 2;
    };
    Facade.prototype.handleTouchStart = function (e) {
        this._touchPos.x = e.stageX;
        this._touchPos.y = e.stageY;
        this._isTouch = true;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.handleTouchMove, this);
        this._heroAvater.startMove();
        // this._heroAvater.willTo(this.convertStageToMapX(e.localX), this.convertStageToMapY(e.localY));
    };
    Facade.prototype.handleTouchChange = function (e) {
        //this._mapLayer.setViewPos(this._mapLayer.posX-e.stageX+this.touchPos.x, this._mapLayer.posY-e.stageY+this.touchPos.y)
        //this._avaterLayer.renderPosChange();
        this._isTouch = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.handleTouchMove, this);
        // this._heroAvater.stopWillGo();
    };
    Object.defineProperty(Facade.prototype, "isTouch", {
        get: function () {
            return this._isTouch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Facade.prototype, "touchPos", {
        get: function () {
            return this._touchPos;
        },
        enumerable: true,
        configurable: true
    });
    Facade.prototype.handleTouchMove = function (e) {
        this._touchPos.x = e.stageX;
        this._touchPos.y = e.stageY;
        if (this._heroAvater.isMove == false)
            this._heroAvater.startMove();
        // if(this._isTouch)
        // 	this._heroAvater.changeWillto(this.convertStageToMapX(e.localX), this.convertStageToMapY(e.localY));
        // var dir:number = utils.Direction.getMouseDirection8(this._heroAvater.x, this._heroAvater.y, e.localX, e.localY);
        // var dirarr:Array<number> = utils.Direction.FACE_POS[dir];
        // if(this._mapLayer.getWalk(this._heroAvater.gridx+dirarr[0], this._heroAvater.gridy+dirarr[1]))
        // {
        // 	this._heroAvater.moveTo(this._heroAvater.gridx+dirarr[0], this._heroAvater.gridy+dirarr[1]);
        // }
    };
    Facade.prototype.heroViewRectChange = function (herox, heroy) {
        var xpos = Math.max(0, herox - this._stage.stageWidth / 2);
        var ypos = Math.max(0, heroy - this._stage.stageHeight / 2);
        this._mapLayer.setViewPos(xpos, ypos);
        this._avaterLayer.renderPosChange();
    };
    return Facade;
}());
Facade._singleClassMark = false;
__reflect(Facade.prototype, "Facade");
//# sourceMappingURL=Facade.js.map
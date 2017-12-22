class Facade {

	private  _view:view.View;
	private  _config:Config;
	private  _loader:utils.LoaderManager;
	private  _stage:egret.Stage;
	private _frameResManager:engin.common.FrameResManager;

	public constructor() {
		if(Facade._singleClassMark == false)
		{
			throw new Error("Facade 不能实例化");
		}
		this._view = new view.View();
		this._config = new Config();
		this._loader = new utils.LoaderManager();
		this._frameResManager = new engin.common.FrameResManager();

	}
	private static _instance:Facade;
	private static _singleClassMark:boolean = false;
	public static get instance():Facade
	{
		if(this._instance == null)
		{
			this._singleClassMark = true;
			this._instance = new Facade();
			this._singleClassMark = false;
		}
		return this._instance;
	}

private _mapLayer:engin.map.MapLayer;
private _avaterLayer:engin.avater.AvaterLayer;
private _heroAvater:engin.avater.HeroAvater;

	public start(stage:egret.Stage){
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
		var role2:engin.avater.Role = new engin.avater.Role();
		role2.mapx = 1410;
		role2.mapy = 2580;
		this._avaterLayer.addUnit(role2);

		stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.handleTouchStart, this);
		stage.addEventListener(egret.TouchEvent.TOUCH_END, this.handleTouchChange, this);
	}

	public get stage():egret.Stage
	{
		return this._stage;
	}

	public get config():Config
	{
		return this._config;
	}

	public get loader():utils.LoaderManager
	{
		return this._loader;
	}

	public get mapLayer():engin.map.MapLayer
	{
		return this._mapLayer;
	}

	public get frameResManager():engin.common.FrameResManager
	{
		return this._frameResManager;
	}

	public convertStageToMapPos(stagex:number, stagey:number):egret.Point
	{
		utils.Shared.tempPoint.x = this._mapLayer.posX+stagex;
		utils.Shared.tempPoint.y = this._mapLayer.posX+stagey;
		return utils.Shared.tempPoint;
	}

	public convertStageToMapX(stagex:number):number
	{
		return this._mapLayer.posX+stagex;
	}
	public convertStageToMapY(stagey:number):number
	{
		return this._mapLayer.posY+stagey;
	}

	public convertMapToStagePos(mapx:number, mapy:number):egret.Point
	{
		utils.Shared.tempPoint.x = mapx-this._mapLayer.posX;
		utils.Shared.tempPoint.y = mapy-this._mapLayer.posY;
		return utils.Shared.tempPoint;
	}
	public convertMapToStageX(mapx:number):number
	{
		return  mapx-this._mapLayer.posX;
	}
	public convertMapToStageY(mapy:number):number
	{
		return  mapy-this._mapLayer.posY;
	}

	// public convertMapToGrid(mapx:number, mapy:number):egret.Point
	// {
	// 	utils.Shared.tempPoint.x = Math.ceil(mapx/engin.map.MapCell.GRID_W);
	// 	utils.Shared.tempPoint.y = Math.ceil(mapy/engin.map.MapCell.GRID_H);
	// 	return utils.Shared.tempPoint;
	// }

	public convertMapToGridX(mapx:number):number
	{
		return  Math.floor(mapx/engin.map.MapCell.GRID_W);
	}

	public convertMapToGridY(mapy:number):number
	{
		return Math.floor(mapy/engin.map.MapCell.GRID_H);
	}

	public convertGridCenterToMapX(gridx:number):number
	{
		return gridx*engin.map.MapCell.GRID_W+engin.map.MapCell.GRID_W/2;
	}
	public convertGridCenterToMapY(gridy:number):number
	{
		return gridy*engin.map.MapCell.GRID_H+engin.map.MapCell.GRID_H/2;
	}



	private _touchPos:egret.Point = new egret.Point();
	private _isTouch:boolean =false;
	private handleTouchStart(e:egret.TouchEvent)
	{
		this._touchPos.x = e.stageX;
		this._touchPos.y = e.stageY;
		this._isTouch = true;
		this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.handleTouchMove, this)
		this._heroAvater.startMove();
		// this._heroAvater.willTo(this.convertStageToMapX(e.localX), this.convertStageToMapY(e.localY));
	}

	private handleTouchChange(e:egret.TouchEvent)
	{
		//this._mapLayer.setViewPos(this._mapLayer.posX-e.stageX+this.touchPos.x, this._mapLayer.posY-e.stageY+this.touchPos.y)
		//this._avaterLayer.renderPosChange();
		this._isTouch = false;
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.handleTouchMove, this);
		// this._heroAvater.stopWillGo();
	}

	public get isTouch():boolean
	{
		return this._isTouch;
	}

	public get touchPos():egret.Point
	{
		return this._touchPos;
	}

	private handleTouchMove(e:egret.TouchEvent):void
	{
		this._touchPos.x = e.stageX;
		this._touchPos.y = e.stageY;
		if(this._heroAvater.isMove==false)
			this._heroAvater.startMove();
		// if(this._isTouch)
		// 	this._heroAvater.changeWillto(this.convertStageToMapX(e.localX), this.convertStageToMapY(e.localY));
		// var dir:number = utils.Direction.getMouseDirection8(this._heroAvater.x, this._heroAvater.y, e.localX, e.localY);
		// var dirarr:Array<number> = utils.Direction.FACE_POS[dir];
		// if(this._mapLayer.getWalk(this._heroAvater.gridx+dirarr[0], this._heroAvater.gridy+dirarr[1]))
		// {
		// 	this._heroAvater.moveTo(this._heroAvater.gridx+dirarr[0], this._heroAvater.gridy+dirarr[1]);
		// }
	}


	public heroViewRectChange(herox:number, heroy:number):void
	{
		var xpos:number = Math.max(0, herox-this._stage.stageWidth/2);
		var ypos:number = Math.max(0, heroy-this._stage.stageHeight/2)
		this._mapLayer.setViewPos(xpos, ypos);
		this._avaterLayer.renderPosChange();
	}
}
module engin.avater {
	export class MoveableUnit extends Unit{
		public constructor() {
			super();
		}

		protected _speed:number = 1;
		protected _moveTime:number = 250;

		private _steppixe:number = 1;
		private _stepx:number = 0;
		private _stepy:number = 0;
		private _stepstartx:number = 0;
		private _stepstarty:number = 0;
		private _stepstartime:number = 0;
		private _stependx:number = 0;
		private _stependy:number = 0;
		private _ismove:boolean = false;

		public moveTo(gridx:number, gridy:number):void
		{
			if(this._ismove)return;
			if(Facade.instance.mapLayer.getWalk(gridx, gridy)==false)return;
			var tomapx:number = Facade.instance.convertGridCenterToMapX(gridx);
			var tomapy:number =  Facade.instance.convertGridCenterToMapY(gridy);
			if(tomapx==this.mapx&&tomapy==this.mapy)
				return;
			this._stependx = tomapx;
			this._stependy = tomapy;
			tomapx = this._stependx - this.mapx;
			tomapy = this._stependy - this.mapy;
			this._stepstartx = this.mapx;
			this._stepstarty = this.mapy;
			this._stepstartime = egret.getTimer();
			this._stepx = tomapx/this._moveTime;
			this._stepy = tomapy/this._moveTime;
			this._ismove = true;
			this.action = utils.ActionState.STATE_RUN;
			Facade.instance.stage.addEventListener(egret.Event.ENTER_FRAME, this.handleMove, this)
		}


		public handleMove(e:egret.Event):void
		{
			var last:number = egret.getTimer() - this._stepstartime;
			if(last<this._moveTime)
			{
				this.mapx = this._stepstartx + last*this._stepx;
				this.mapy = this._stepstarty + last*this._stepy;
			}else{
				this.mapx=this._stependx;
				this.mapy = this._stependy;
				this._ismove = false;
				Facade.instance.stage.removeEventListener(egret.Event.ENTER_FRAME, this.handleMove, this);
				this.moveComplete();
			}
		}

		public get isMove():boolean
		{
			return this._ismove;
		}


		protected moveComplete():void
		{
			this.action = utils.ActionState.STATE_IDLE;
		}
	}
}
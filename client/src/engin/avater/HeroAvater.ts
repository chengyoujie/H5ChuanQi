module engin.avater {
	export class HeroAvater extends Role{
		public constructor() {
			super();

		}

		protected init():void
		{
			this.graphics.clear();
			this.graphics.beginFill(0xccCC00, 0.8);
			this.graphics.drawCircle(-2, -2, 4)
			this.graphics.endFill();
		}

		public $setMapX(mapX:number):void
		{
			super.$setMapX(mapX);
			Facade.instance.heroViewRectChange(this.mapx, this.mapy);
		}

		public $setMapY(mapY:number):void
		{
			super.$setMapY(mapY);
			Facade.instance.heroViewRectChange(this.mapx, this.mapy);
		}
		

		public renderPos():void
		{
		}

		// private moveStepEndEvent:engin.event.UnitEvent = new engin.event.UnitEvent(event.UnitEvent.EVENT_MOVE_STEP_END, true);
		protected moveComplete():void
		{
			if(Facade.instance.isTouch)
			{
				var dir:number = utils.Direction.getMouseDirection8(this.x, this.y, Facade.instance.touchPos.x, Facade.instance.touchPos.y);
				var dirarr:Array<number> = utils.Direction.FACE_POS[dir];
				this.moveTo(this.gridx+dirarr[0], this.gridy+dirarr[1])
			}
		}

		// private _willto:egret.Point = new egret.Point();
		// private _isWillGo:boolean = false;
		public startMove():void
		{
			// this._willto.x = willtox;
			// this._willto.y = willtoy;
			// this._isWillGo= true;
			this.moveComplete();
		}
		// public changeWillto(willtox:number, willtoy:number):void
		// {
		// 	this._willto.x = willtox;
		// 	this._willto.y = willtoy;
		// }
		// public stopWillGo():void
		// {
		// 	this._isWillGo = false;
		// }
	}
}
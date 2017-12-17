module engin.avater {
	export class Unit extends egret.Sprite{
		public constructor() {
			super();
			this.init();
		}

		protected init():void
		{
			this.graphics.clear();
			this.graphics.beginFill(0xcc0000, 0.5);
			this.graphics.drawCircle(-10, -10, 20);
			this.graphics.endFill();
		}

		private _mapx:number = 0;
		private _mapy:number = 0;

		public  set mapx(value:number)
		{
			this.$setMapX(value);
			super.$setX(Facade.instance.convertMapToStageX(value));
		}

		public get mapx():number
		{
			return this._mapx;
		}

		public  set mapy(value:number)
		{
			this.$setMapY(value);
			super.$setY(Facade.instance.convertMapToStageY(value));
		}

		public get mapy():number
		{
			return this._mapy;
		}

		public $setX(value:number):boolean
		{
			this.$setMapX(Facade.instance.convertStageToMapX(value));
			return super.$setX(value)
		}
		public $setY(value:number):boolean
		{
			this.$setMapY(Facade.instance.convertStageToMapY(value));
			return super.$setY(value)
		}

		public $setMapX(mapX:number):void
		{
			this._mapx = mapX;
		}

		public $setMapY(mapY:number):void
		{
			this._mapy = mapY;
		}

		public renderPos():void
		{
			super.$setX(Facade.instance.convertMapToStageX(this._mapx));
			super.$setY(Facade.instance.convertMapToStageY(this._mapy));
		}

		public get gridx():number
		{
			return Facade.instance.convertMapToGridX(this._mapx);
		}
		public get gridy():number
		{
			return Facade.instance.convertMapToGridY(this._mapy);
		}


	}
}
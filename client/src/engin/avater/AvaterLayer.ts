module engin.avater {
	export class AvaterLayer  extends egret.Sprite{
		public constructor() {
			super();
			Facade.instance.stage.addEventListener(egret.Event.ENTER_FRAME, this.render, this)
		}
		
		private _units:Array<Unit> = new Array<Unit>();
		public addUnit(unit:Unit):void
		{
			if(this._units.indexOf(unit)!=-1)
			{
				egret.log(unit+"已经添加到AvaterLayer中")
				return;
			}
			this._units.push(unit);
			this.addChild(unit);
		}

		public removeUnit(unit:Unit):void
		{
			var index:number = this._units.indexOf(unit);
			if(index==-1)
			{
				egret.log(unit+"不再AvaterLayer删除失败");
				return;
			}
			this._units.splice(index);
		}

		public renderPosChange():void
		{
			var len:number = this._units.length;
			for(var i:number=0; i<len; i++)
			{
				this._units[i].renderPos();
			}
		}

		public render():void
		{
			var len:number = this._units.length;
			for(var i:number=0; i<len; i++)
			{
				this._units[i].render();
			}
		}


	}
}
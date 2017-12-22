module engin.common {
	export class FrameClip { 
		private _res:FrameRes;
		private _rect:egret.Rectangle;
		private _frame:number=0;

		public constructor(res:FrameRes=null) {
			
			this._rect = new egret.Rectangle();
			this._frame = 0;
			this._res = res;
		}

		public setFrameRes(res:FrameRes):void
		{
			this._res = res;
		}

	
		public gotoNextFrame():void
		{
			if(this._res == null || this._res.length<=0)return;
			this._frame += 1;
			this._frame = this._frame%this._res.length;
			egret.log(this._frame+"   len:"+this._res.length)
		}

		public render(texture: egret.RenderTexture):void
		{
			if(this._res == null)return;
			if(this._res.isReady == false)return;
			var obj:any = this._res.getFrameData(this._frame);
			if(!obj)return;
			this._rect.x = obj.ix-obj.ox;
			this._rect.y = obj.iy-obj.oy;
			this._rect.width = obj.width;
			this._rect.height = obj.height;
			texture.drawToTexture(this._res.bd, this._rect);
		}


	}
}
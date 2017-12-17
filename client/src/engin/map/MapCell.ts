module engin.map{
	export class MapCell extends egret.Sprite{
		public static WIDTH:number = 256;
		public static HEIGHT:number = 256;

		public static GRID_W:number = 60;
		public static GRID_H:number = 30;

		private _row:number=-1;
		private _col:number=-1;
		// private _loader:egret.ImageLoader;
		private _bmp:egret.Bitmap;
		// private _texture:egret.Texture;
		private _mapId:string;
		// private _posX:number=0;
		// private _posY:number = 0;

		// private _txt:egret.TextField;

		public constructor(contain:egret.DisplayObjectContainer, mapid:string, col:number, row:number) {
			super();
			this.init();
			this.changeCell(mapid, row, col);
			contain.addChild(this);
		}

		private init():void{
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
		}
		
		private loadError(e:egret.IOErrorEvent):void
		{
			this._bmp.bitmapData = null;
		}


		// private loadCompleteHandler(e:egret.Event)
		// {
		// 	if(this._loader==null)return;
		// 	this._bmp.bitmapData = this._loader.data;
		// 	this._loader.data = null;
		// }
		
		private loadCompleteHandler(res:utils.ResData)
		{
			this._bmp.bitmapData = res.data.bitmapData;
		}


		public changeCell(mapid:string, row:number, col:number)
		{
			if(this._mapId == mapid && this._row == row && this._col == col)
				return;
			this._row = row;
			this._col = col;
			this._mapId = mapid;
			// this._loader.load(GameConfig.RES_PATH+"m/"+this._mapId+"/"+this.getStrLen(this._row, 3)+this.getStrLen(this._col, 3)+".jpg")
			Facade.instance.loader.loadTexture(Facade.instance.config.getMapCellUrl(this._mapId, this._row, this._col), this, this.loadCompleteHandler)
			// this._posX = this._col*MapCell.WIDTH;
			// this._posY = this._row*MapCell.HEIGHT;
			// this._txt.text = "Row:"+this._row+" Col:"+this._col;
		}

		private getStrLen(num:number, len:number):string
		{
			var str:string = num.toString();
			for(var i:number=str.length; i<len; i++)
				str = "0"+str;
			return str;
		}

		// public get posY():number
		// {
		// 	return this._posY;
		// }
		// public get posX():number
		// {
		// 	return this._posX;
		// }


		public dispose():void{
			this.graphics.clear();
			if(this.parent)
				this.parent.removeChild(this);
			// if(this._bmp.bitmapData)
			// 	this._bmp.bitmapData.$dispose();
			// this._loader.removeEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);
			// this._loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadError, this);
			// this._loader.data = null;
			// this._loader = null;
		}
	}
}
module engin.common {
	export class FrameRes {

		private _url:string;
		private _name:string;
		private _state:number = 0;
		private _texture:egret.Texture;
		private _bd:egret.Bitmap;
		private _data:Array<Object>;

		public static STATE_PRE:number = 0;
		public static STATE_READY:number = 2;
		public static STATE_DISPOSE:number = 2;

		public constructor(url:string, name:string) {
			this._url = url;
			this._name = name;
			this._state = FrameRes.STATE_PRE;
			Facade.instance.loader.loadTexture(this._url+"/"+this._name+".png", this, this.handleImgLoaded);
			Facade.instance.loader.loadJson(this._url+"/"+this._name+".json", this, this.handleJsonLoaded);
		}

		private handleImgLoaded(res:utils.ResData):void
		{
			this._state ++;
			this._texture = res.data;
			//this._bd = new egret.Bitmap(this._texture);
		}
		private handleJsonLoaded(res:utils.ResData):void
		{
			this._state ++;
			this._data = res.data;

		}

		public  get isReady():boolean
		{
			return this._state == FrameRes.STATE_READY;
		}

		public get length():number
		{
			if(this._data)
				return this._data.length;
			return 0;
		}

		public get bd():egret.Bitmap
		{
			if(this._bd == null)
			 	this._bd = new egret.Bitmap(this._texture);
			return this._bd;
		}

		public getFrameData(frame:number):Object
		{
			if(this._data == null)return null;
			if(frame<0||frame>this._data.length)return null;
			return this._data[frame];
		}


		public dispose():void
		{
			if(this._bd)
			{
				this._bd = null;
			}
			if(this._texture)
			{
				this._texture.dispose();
				this._texture = null;
			}
			if(this._data)
			{
				this._data = null;
			}
			this._state = FrameRes.STATE_DISPOSE;
		}

	}
}
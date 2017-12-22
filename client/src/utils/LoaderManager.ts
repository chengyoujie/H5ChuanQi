module utils {
	export class LoaderManager {
		private maxCacheNum:number = 40;
		// private minCacheNum:number = 5;
		private _cache:Array<Loader>=new Array<Loader>();
		// private _wait:Array<ResData> = new Array<ResData>();
		private _pool:Array<ResData> = new Array<ResData>();

		public constructor() {

		}

		public load(url:string, type:number, _this:any=null, complete:Function=null, params:any=null, error:Function=null, progress:Function=null):void
		{
			var res:ResData = this.getResData();
			res.init(url, type, _this, complete, params, error, progress);
			var loader:Loader = this.getResLoader();
			loader.load(res);
		}

		public loadByte(url:string,  _this:any=null, complete:Function=null, params:any=null, error:Function=null, progress:Function=null):void
		{
			this.load(url, ResData.TYPE_BYT, _this, complete, params, error, progress);
		}
		public loadText(url:string,  _this:any=null, complete:Function=null, params:any=null, error:Function=null, progress:Function=null):void	
		{
			this.load(url, ResData.TYPE_TXT, _this, complete, params, error, progress);
		}
		public loadJson(url:string,  _this:any=null, complete:Function=null, params:any=null, error:Function=null, progress:Function=null):void	
		{
			this.load(url, ResData.TYPE_JSON, _this, complete, params, error, progress);
		}
		public loadTexture(url:string, _this:any=null, complete:Function=null, params:any=null, error:Function=null, progress:Function=null):void	
		{
			this.load(url, ResData.TYPE_TEXTURE, _this, complete, params, error, progress);
		}
		public loadCyj(url:string,  _this:any=null, complete:Function=null, params:any=null, error:Function=null, progress:Function=null):void	
		{
			this.load(url, ResData.TYPE_CYJ, _this, complete, params, error, progress);
		}
		public pushPool(loader:Loader, res:ResData)
		{
			if(this._pool.length>this.maxCacheNum)
			{
				res = null;
			}else{
				res.reset();
				this._pool.push(res);
			}
			if(this._cache.length>this.maxCacheNum)
			{
				loader = null;
			}else{
				this._cache.push(loader);
			}
		}

		public getResData():ResData
		{
			var res:ResData;
			if(this._pool.length>0)
				res = this._pool.shift();
			else
				res = new ResData();
			// res.reset();
			return res;
		}

		public getResLoader():Loader
		{
			var loader:Loader ;
			if(this._cache.length>0)
				loader = this._cache.shift();
			else{
				loader = new Loader();
				loader.bindManager(this);
			}
			return loader;
		}


	}
}
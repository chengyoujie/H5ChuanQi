module utils {
	export class Loader {
		public constructor() {
			this.initLoader();
		}

		private _manager:LoaderManager;
		public bindManager(manager:LoaderManager)
		{
			this._manager = manager;
		}

		private _loader:egret.URLLoader;
		// private _imgLoader:egret.ImageLoader;
		private _res:ResData;
		public load(res:ResData)
		{
			this.clearn();
			this._res = res;
			this.startLoader();
		}

		private initLoader():void
		{
			this._loader = new egret.URLLoader();
			// this._imgLoader = new egret.ImageLoader();
		}

		private startLoader():void
		{
			// if(this._res.type == ResData.TYPE_IMG)
			// {
			// 	this._imgLoader.load(this._res.url);
			// 	if(this._res.complete)
			// 		this._imgLoader.addEventListener(egret.Event.COMPLETE, this.handleComplete, this);
			// 	if(this._res.error)
			// 		this._imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.handleError, this);
			// 	if(this._res.progress)
			// 		this._imgLoader.addEventListener(egret.ProgressEvent.PROGRESS, this.handleProgress, this);
			// }else{
				if(this._res.type == ResData.TYPE_BYT)
					this._loader.dataFormat = egret.URLLoaderDataFormat.BINARY;
				else if(this._res.type == ResData.TYPE_TEXTURE)
					this._loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
				else if(this._res.type == ResData.TYPE_JSON)
					this._loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
				else if(this._res.type == ResData.TYPE_CYJ)
					this._loader.dataFormat = egret.URLLoaderDataFormat.BINARY;
				else
					this._loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
				if(this._res.complete)
					this._loader.addEventListener(egret.Event.COMPLETE, this.handleComplete, this);
				if(this._res.error)
					this._loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.handleError, this);
				if(this._res.progress)
					this._loader.addEventListener(egret.ProgressEvent.PROGRESS, this.handleProgress, this);

				this._loader.load(new egret.URLRequest(this._res.url));
			// }
		}

		private handleComplete(e:egret.Event)
		{
			if(this._res)
			{
				if(this._res.type == ResData.TYPE_TEXTURE)
					this._res.data = this._loader.data;
				else if(this._res.type == ResData.TYPE_BYT)
					this._res.data = new egret.ByteArray(this._loader.data);
				else if(this._res.type == ResData.TYPE_JSON)
					this._res.data = JSON.parse(this._loader.data);
				else if(this._res.type == ResData.TYPE_CYJ)
					this._res.data = DataParser.parserCyj(this._loader.data);
				else
					this._res.data = this._loader.data;
				this._res.execComplete();
				this.clearn();
			}
		}



		private handleError(e:egret.IOErrorEvent)
		{
			if(this._res)
			{
				this._res.data = null;
				this._res.message = "Error:"+e.type;
				this._res.execError();
				this.clearn();
			}
		}

		private handleProgress(e:egret.ProgressEvent)
		{
			if(this._res)
			{
				this._res.message = e.bytesLoaded/e.bytesTotal;
				this._res.execProgress();
			}
		}

		public clearn():void
		{
			if(this._res==null)
				return;
			// if(this._res.type == ResData.TYPE_IMG)
			// {
			// 	if(this._res.complete)
			// 		this._imgLoader.removeEventListener(egret.Event.COMPLETE, this.handleComplete, this);
			// 	if(this._res.error)
			// 		this._imgLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.handleError, this);
			// 	if(this._res.progress)
			// 		this._imgLoader.removeEventListener(egret.ProgressEvent.PROGRESS, this.handleProgress, this);
			// }else
			// {
				if(this._res.complete)
					this._loader.removeEventListener(egret.Event.COMPLETE, this.handleComplete, this);
				if(this._res.error)
					this._loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.handleError, this);
				if(this._res.progress)
					this._loader.removeEventListener(egret.ProgressEvent.PROGRESS, this.handleProgress, this);
			// }
			if(this._manager)
				this._manager.pushPool(this, this._res);
			else
				this._res.reset();
			this._res = null;
			this._loader.data = null;
		}
	}
}
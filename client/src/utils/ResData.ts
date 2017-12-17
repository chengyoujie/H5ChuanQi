module utils {
	export class ResData {

		/**文本类型 */
		public static TYPE_TXT:number = 0;
		/**字节数组类型 */
		public static TYPE_BYT:number = 1;
		/**图片类型 */
		public static TYPE_TEXTURE:number = 2;
		/**JSON类型 */
		public static TYPE_JSON:number = 3;
		/**自定义-CYJ类型 */
		public static TYPE_CYJ:number = 4;

		public url:string;
		public type:number;
		public data:any;
		public complete:Function;
		public progress:Function;
		public error:Function;
		public params:any;
		public message:any;
		private _this:any;


		public constructor(){

		}

		public init(url:string, type:number, _this:any, complete:Function=null, params:any=null, error:Function=null, progress:Function=null) {
			this.url = url;
			this.type = type;
			this.complete = complete;
			this.error = error;
			this.progress = progress;
			this.params = params;
			this._this = _this;
		}

		public reset():void
		{
			this.url = null;
			this.type = null;
			this.complete = null;
			this.error = null;
			this.progress = null;
			this.params = null;
			this._this = null;
		}

		public execComplete():void
		{
			this.exec(this.complete);
		}

		public execError():void
		{
			this.exec(this.error);
		}

		public execProgress():void
		{
			this.exec(this.progress);
		}


		private exec(fun:Function):void
		{
			if(fun)
				fun.call(this._this, this);
		}




	}
}
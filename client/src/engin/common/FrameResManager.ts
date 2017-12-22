module engin.common {
	export class FrameResManager {

		private _cache:Object;
		public constructor() {
			this._cache = {};
		}

		public getRes(dirname:string, resname:string, direction:number, action:number):FrameRes
		{
			var url:string = Facade.instance.config.getPakResPath(dirname);
			var name:string = Facade.instance.config.getPakResName(resname, direction, action);
			if(this._cache[url+name]==null)
			{
				this._cache[url+name] = new FrameRes(url, name);
			}
			return this._cache[url+name];
		}
	}
}
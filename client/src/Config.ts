class Config{
	private _cdnPath:string;

	public constructor() {
	 	this._cdnPath = "http://192.168.2.61:5566/cdn/";
	}

	public getMapDataUrl(mapId:any):string
	{
		return this._cdnPath+"m/data/"+mapId+".json";
	}

	public getMapCellUrl(mapId:any, row:number, col:number):string
	{
		return this._cdnPath+"m/"+mapId+"/"+this.getStrLen(row, 3)+this.getStrLen(col, 3)+".jpg";
	}
	private getStrLen(num:number, len:number):string
	{
		var str:string = num.toString();
		for(var i:number=str.length; i<len; i++)
			str = "0"+str;
		return str;
	}

	public static  DIR_NAME:Array<string> =["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	public getPakResName(role:string, direction:number, action:number):string
	{
		return role+"_"+Config.DIR_NAME[action]+direction;
	}

	public getPakResPath(key:string):string
	{
		return this._cdnPath+"u/"+key+"/";
	}

}
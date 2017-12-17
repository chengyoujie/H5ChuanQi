module engin.map{
	export class MapData {

		/**地图的宽度 */
		public mapwidth:number;
		/**地图的高度 */
		public mapheight:number;
		/**图块水平的个数 */
		public bgrw:number;
		/**图块竖直的个数 */
		public bgrh:number;
		/**图块的宽度 [256]*/
		public bgwidth:number;
		/**图块的高度 [256]*/
		public bgheight:number;
		/**透明度数据 base64->byte */
		public alphaArray:Map2DSettingString;
		/**路径度数据 base64->byte */
		public pathArray:Map2DSettingString;

		/*逻辑格子的宽度【60】 */
		public gridwidth_pixal:number;
		/*逻辑格子的高度【30】 */
		public gridheight_pixal:number;
		/*地图id */
		public guid:string;

		public constructor(data:any) {
			var setting:any = data.settings;
			this.mapwidth = data.mapwidth;
			this.mapheight = data.mapheight;
			this.bgrw = setting.bgrw;
			this.bgrh = setting.bgrh;
			this.bgwidth = setting.bgwidth;
			this.bgheight = setting.bgheight;
			this.guid = data.guid;
			// this.alphaArray = new Map2DSetting(egret.Base64Util.decode(setting.alphaArray.data), setting.alphaArray.w, setting.alphaArray.h);
			// this.pathArray = new Map2DSetting(egret.Base64Util.decode(setting.pathArray.data), setting.pathArray.w, setting.pathArray.h);
			this.pathArray = new Map2DSettingString(setting.pathArray.data, setting.pathArray.w, setting.pathArray.h);
			this.alphaArray = new Map2DSettingString(setting.alphaArray.data, setting.pathArray.w, setting.pathArray.h);
			if(setting.enginevo)
			{
				this.gridwidth_pixal = setting.enginevo.gridwidth_pixal;
				this.gridheight_pixal = setting.enginevo.gridheight_pixal;
			}
		}
	}
}
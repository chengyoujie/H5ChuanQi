module engin.map{
	export class Map2DSetting {
		private _byte:egret.ByteArray;
		private _w:number;
		private _h:number;
		private _dataview:DataView;

		public constructor(byte:ArrayBuffer, w:number, h:number) {
			// egret.log(byte[0]);
			this._dataview = new DataView(byte);
			this._byte = new egret.ByteArray(byte);
			this._w = w;
			this._h = h;
			this._byte.endian = egret.Endian.BIG_ENDIAN;
			// egret.log(this._byte.length+"byal:"+this._byte.bytesAvailable+","+this._byte.endian)
		}

		private getBinaryData(index:number):number
		{
			this._byte.position = index;
			// egret.log()
			// var b:boolean = this._byte.readBoolean();	
			// return b==true?1:0;
			// egret.log(this._dataview[index]);
			return this._byte.readByte()&255;
		}

		public get w():number
		{
			return this._w;
		}

		public get h():number
		{
			return this._h;
		}

		/**
		 *
		 * @param x
		 * @param y
		 * @return
		 * 0 不可走
		 * 1 可走
		 */

		public getWalk(x:number, y:number):number
		{
			var d:number=y * this._w + x;
			if (d < 0)
			{
				return 0;
			}
			else if (d > this._byte.length)
			{
				return 0;
			}
			else
			{
				// egret.log("pos:"+x+","+y+" data:"+this.getBinaryData(y *this._w + x));
				return this.getBinaryData(y *this._w + x)&1;
				// return this._byte[y *this._w + x] & 1;
			}
		}

		/**
		* @param x
		 * @param y
		 * @return
		 * ALPHA值0-10
		 * TTTTAAAA
		 */
		public  getAlpha(x:number, y:number):number
		{
			// return this.getBinaryData(y * this._w + x) & 15
			var d:number=y * this._w + x;
			if (d < 0)
			{
				return 0;
			}
			else if (d > this._byte.length)
			{
				return 0;
			}
			else
			{
				return this.getBinaryData(d)&15;
			
			}
		}



	}
}
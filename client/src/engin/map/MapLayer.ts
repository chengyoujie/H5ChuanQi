module engin.map{
	export class MapLayer extends egret.Sprite{
		private _rect:egret.Rectangle;
		/*地图的格子数组  [col(列 x, width)]  [row(行 y, height)] */
		private _mapCells:Array<Array<MapCell>>;

		
		public constructor() {
			super();
			this.init();
		}

		private init():void{
			this._rect = new egret.Rectangle(0, 0, 1, 1)
			this._mapCells = new Array<Array<MapCell>>();

			// this.setViewSize(400, 600);

		}



		/** 设置可视区的大小**/
		public setViewSize(w:number, h:number)
		{
			this._rect.width = w;
			this._rect.height = h;
			// this.graphics.clear();
			// this.graphics.beginFill(0xcc0000, 0.1);
			// this.graphics.drawRect(0, 0, this._rect.width, this._rect.height);
			// this.graphics.endFill();
			if(this._curMapVo==null)return;
			var col:number = Math.ceil(this._rect.width/MapCell.WIDTH)+1;//列数
			var row:number = Math.ceil(this._rect.height/MapCell.HEIGHT)+1;//行数
			var len:number = this._mapCells.length;
			var rlen:number = len>0?this._mapCells[0].length:0;
			var i:number=0;
			var j:number = 0;
			var temp:Array<MapCell>;
			var cell:MapCell;
			var mapid:string = this._curMapVo.guid;
			if(len > col)//当前行的格子比较多删除掉
			{
				for(i=len-1; i>=col; i--)
				{
					temp = this._mapCells[i];
					for(j=temp.length-1; j>=0; j--)
					{
						cell = temp[j];
						cell.dispose();
						cell = null;
					}
					this._mapCells.splice(i,1);
				}
			}else if(len < col){//当前行的格子比较少增加
				for(i=len; i<col; i++)
				{
					temp = new Array<MapCell>();
					for(j=0; j<row; j++)
					{
						cell = new MapCell(this, mapid, i, j);
						temp.push(cell);
					}
					this._mapCells.push(temp);
				}
			}
			//列数
			if(rlen > row)//当前列数比较多需要删除
			{
				for(i=0; i<col; i++)
				{
					temp = this._mapCells[i];
					for(j=temp.length-1; j>=row; j--)
					{
						cell = temp[j];
						cell.dispose();
						temp.splice(j, 1);
						cell = null;
					}
				}
			}else if(rlen < row)//当前列数比较少 需要增加
			{
				for(i=0; i<col; i++)
				{
					temp = this._mapCells[i];
					for(j=temp.length; j<row; j++)
					{
						cell = new MapCell(this, mapid, i, j);
						temp.push(cell);
					}
				}
			}
			this.refushViewRect();
			//测试
			// this.printCellInfo();
		}

		/**测试 */
		private printCellInfo():void
		{
			var cell:MapCell;
			var result:string = "";
			for(var i:number =0; i< this._mapCells.length; i++)
			{
				for(var j:number=0; j<this._mapCells[i].length; j++)
				{
					cell = this._mapCells[i][j];
					result += "["+i+","+j+"]  "
				}
				result +"\n";
			}
			egret.log(result);
		}

		/* 镜头移动 */
		public setViewPos(x:number, y:number)
		{
			if(x<0)x=0;
			if(y<0)y=0;
			this._rect.x = x;
			this._rect.y = y;
			// egret.log("设置可视区位置："+x+","+y);
			this.refushViewRect();
		}

		public get posX():number
		{
			return this._rect.x;
		}
		public get posY():number{
			return this._rect.y;
		}

		private rectrow:number;
		private rectcol:number;
		private offsetx:number;
		private offsety:number;
		public refushViewRect():void
		{
			if(this._curMapVo==null)return;
			this.rectcol = Math.floor(this._rect.x/MapCell.WIDTH);//列数
			this.rectrow = Math.floor(this._rect.y/MapCell.HEIGHT);//行数
			this.offsetx = this._rect.x%MapCell.WIDTH;
			this.offsety = this._rect.y%MapCell.HEIGHT;
			var len:number = this._mapCells.length;
			var temp:Array<MapCell>;
			var cell:MapCell;
			var mapid:string = this._curMapVo.guid;
			for(var i:number=0; i<len; i++)
			{
				temp = this._mapCells[i];
				for(var j:number=0; j<temp.length; j++)
				{
					cell = temp[j];
					cell.changeCell(mapid, this.rectrow+j, this.rectcol+i);
					cell.x = i*MapCell.WIDTH -this.offsetx;
					cell.y = j*MapCell.HEIGHT -this.offsety;
					// egret.log(cell.x+","+cell.y);
				}
			}
			//gird
			this.testGrid();
		}

		private _testGrid:egret.Sprite;
		private testGrid():void
		{
			if(this._curMapVo==null)return;
			if(this._testGrid==null)
			{
				this._testGrid = new egret.Sprite();
				// this._testGrid.scaleX = this._testGrid.scaleY= 0.05;
				this.addChild(this._testGrid);
			}
			this.swapChildren(this._testGrid, this.getChildAt(this.numChildren-1));
			var gcol:number = Math.ceil(this._rect.height/MapCell.GRID_H)+1;
			var grow:number = Math.ceil(this._rect.width/MapCell.GRID_W)+1;
			var startcol:number = Math.floor(this._rect.y/MapCell.GRID_H);
			var startrow:number = Math.floor(this._rect.x/MapCell.GRID_W);
			var offx:number = this._rect.x %MapCell.GRID_W;
			var offy:number = this._rect.y % MapCell.GRID_H;
			this._testGrid.graphics.clear();
			this._testGrid.graphics.lineStyle(1, 0);
			var gx:number;
			var gy:number;
			var color:number = 0xcc0000;
			var alpha:number = 0.2;
			egret.log("row"+startrow+" col:"+startcol+" value:"+this._curMapVo.pathArray.getWalk(startrow, startcol))
			for(var i:number=0; i<gcol; i++)
			{
				for(var j:number=0; j<grow; j++)
				{
					gx = (j)*MapCell.GRID_W - offx;
					gy = (i)*MapCell.GRID_H - offy;
					if(this._curMapVo.pathArray.getWalk(startrow+j, startcol+i)==0)
					{
						color = 0xcc0000;
					}else{
						color = 0x00cc00;
					}
					// alpha = this._curMapVo.alphaArray.getAlpha(startrow+j, startcol+i)/10;
					// egret.log(this._curMapVo.alphaArray.getAlpha(startrow+j, startcol+i));
					// if(this._curMapVo.alphaArray.getAlpha(startrow+j, startcol+i)/10!=1)
					// {
					// 	color =0xcc0000;
					// }else{
					// 	color = 0x00cc00;
					// }
					this._testGrid.graphics.beginFill(color, 0.1);
					this._testGrid.graphics.drawRect(gx, gy, MapCell.GRID_W, MapCell.GRID_H);
					//egret.log("draw pos:"+(startcol+i)+","+(startrow+j)+"walk"+this._curMapVo.pathArray.getWalk(startrow+j, startcol+i), "  position:", gx, ",", gy);
				}
			}
			this._testGrid.graphics.endFill();
		}

		public getWalk(gridx:number, gridy:number):boolean
		{
			if(this._curMapVo == null)return false;
			//egret.log("row"+Math.ceil(mapx/MapCell.GRID_W)+" col:"+Math.ceil(mapy/MapCell.GRID_H)+" value:"+this._curMapVo.pathArray.getWalk(Math.ceil(mapx/MapCell.GRID_W), Math.ceil(mapy/MapCell.GRID_H)))
			return this._curMapVo.pathArray.getWalk(gridx, gridy)!=0;
		}



		private _loader:egret.URLLoader;
		private _curMapVo:MapData;
		public changeMap(mapId:number):void
		{
			this._loader = new egret.URLLoader();
			this._loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
			this._loader.addEventListener(egret.Event.COMPLETE, this.handleDataLoaded, this);
			this._loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.handleIoError, this);
			this._loader.load(new egret.URLRequest(Facade.instance.config.getMapDataUrl(mapId)));
		}

		private handleDataLoaded(e:egret.Event)
		{
			var mapinfo:Object = JSON.parse(this._loader.data);
			this._curMapVo = new MapData(mapinfo);
			this.enterMapSuccess();
		}


		private handleIoError(e:egret.IOErrorEvent)
		{
			this.enterMapFailed();
		}

		private enterMapSuccess():void
		{
			this.setViewSize(Facade.instance.stage.stageWidth, Facade.instance.stage.stageHeight);
			// this.testGrid();
		}

		private enterMapFailed():void
		{

		}

	}
}
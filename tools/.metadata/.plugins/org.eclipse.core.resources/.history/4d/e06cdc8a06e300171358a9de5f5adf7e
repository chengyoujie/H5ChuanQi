package
{
	import com.cyj.app.ToolsApp;

	public class SvnLogInfo
	{
		
		
		public var version:String;
		public var auth:String;
		public var time:String;
		public var day:String;
		public var logs:Vector.<SvnLogItem>=new Vector.<SvnLogItem>();
		public var mark:String;
		
		public var content:String;
		
		public var timeID:Number= 0;
		
		public function SvnLogInfo()
		{
		}
		
		/**
		 * 
		 * 
		 *r9127 | jiangjieqi | 2017-11-22 11:32:56 +0800 (周三, 22 11月 2017) | 1 line
			Changed paths:
			   M /trunk/client/chuanqi2/src/chuanqi2/baseface/renwu/richang/fuben/RiChangFuBenService.as
			
			修改注释 
		 * @param logmsg
		 * 
		 */		
		public function parser(logmsg:String):void
		{
			logmsg = logmsg.replace(/^\s*((.|\n)*\S)?\s*$/,"$1" ); 
			var arr:Array = logmsg.split("\n");
			var infoarr:Array = arr[0].split("|");
			if(infoarr && infoarr.length>=4)
			{
				version = infoarr[0].replace("r", "");
				auth = infoarr[1];
				var dayReg:RegExp = /([0-9]{4}-[0-9]{2}-[0-9]{2})/gi;
				var timeReg:RegExp = /([0-9]{2}:[0-9]{2}:[0-9]{2})/gi;
//				var temp:Array;
//				temp = dayReg.exec(infoarr[2]);
//				day = temp[0];
//				temp = timeReg.exec(infoarr[2]);
//				time = temp[0];
				day = infoarr[2].replace(/^.*?([0-9]{4}-[0-9]{2}-[0-9]{2}).*?$/, "$1");
				time = infoarr[2].replace(/^.*?([0-9]{2}:[0-9]{2}:[0-9]{2}).*?$/, "$1");
				timeID = ToolsApp.getTimeId(day, time);//Number(day.replace(/-/gi, "")+time.replace(/:/gi, ""));
				
			}
			for(var i:int=2; i<arr.length; i++)
			{
				if(arr[i])
				{
					logs.push(new SvnLogItem(arr[i]));
				}else{
					break;
				}
			}
			mark = "";
			for(i++; i<arr.length; i++)
			{
				mark += arr[i]+"\n";
			}
			
			
			content = "";
			for(i=0; i<this.logs.length; i++)
			{
				content += this.logs[i].str()+"\n";
			}
		}
		
	}
}
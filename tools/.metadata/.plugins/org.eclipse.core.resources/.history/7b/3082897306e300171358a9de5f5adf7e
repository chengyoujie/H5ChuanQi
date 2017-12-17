package com.cyj.app.data
{
	import flash.filesystem.File;

	public class ToolsConfig
	{
		
		public var title:String;
		public var appName:String;
		public var version:String;
		public var mapkey:String;
		public var mapextion:String;
		
		public var ftphost:String
		public var ftpname:String;
		public var ftppass:String;;
		
//		public var svnpath:String;
//		public var svncmd:String;
		public var svnoutpath:String;
//		public var svnoutingoredic:String;
		
//		public var rarpath:String;
		
		public var upip:String;
		public var upname:String;
		public var uppass:String;
//		public var updir:String;

		
		public var logmaxshownum:int;
		/**文件数量大于多少才开始计算时间的平均值**/
		public var localtimeminnum:int;
		public var projectpath:String;
		public var versionconfig:String;
		
		private var _logpath:String;
		public function set logpath(value:String):void
		{
			_logpath = value;
			_logpath = _logpath.replace(/\$apppath/gi, File.applicationDirectory.nativePath+"/");
		}
		public function get logpath():String
		{
			return _logpath;
		}
		
		
		
		private var _svnpath:String;
		public function set svnpath(value:String):void
		{
			_svnpath = value;
			_svnpath = _svnpath.replace(/\$apppath/gi, File.applicationDirectory.nativePath+"/");
		}
		public function get svnpath():String
		{
			return _svnpath;
		}

		
		
		
		private var _rarpath:String;
		public function set rarpath(value:String):void
		{
			_rarpath = value;
			_rarpath = _rarpath.replace(/\$apppath/gi, File.applicationDirectory.nativePath+"/");
		}
		public function get rarpath():String
		{
			return _rarpath;
		}


		public function ToolsConfig()
		{
		}
	}
}
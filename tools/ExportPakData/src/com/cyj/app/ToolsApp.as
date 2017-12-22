package com.cyj.app
{
	import com.cyj.app.data.LocalConfig;
	import com.cyj.app.data.ProjectConfig;
	import com.cyj.app.data.ToolsConfig;
	import com.cyj.app.view.ToolsView;
	import com.cyj.app.view.common.Alert;
	import com.cyj.app.view.ui.common.AlertUI;
	import com.cyj.utils.Log;
	import com.cyj.utils.XML2Obj;
	import com.cyj.utils.cmd.CMDManager;
	import com.cyj.utils.cmd.CMDStringParser;
	import com.cyj.utils.file.FileManager;
	import com.cyj.utils.ftp.SimpleFTP;
	import com.cyj.utils.load.LoaderManager;
	import com.cyj.utils.load.ResData;
	import com.cyj.utils.load.ResLoader;
	import com.cyj.utils.md5.MD5;
	
	import flash.desktop.Clipboard;
	import flash.desktop.ClipboardFormats;
	import flash.desktop.NativeApplication;
	import flash.desktop.NativeDragManager;
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.events.NativeDragEvent;
	import flash.filesystem.File;
	import flash.geom.Point;
	import flash.utils.Dictionary;
	
	import morn.core.events.UIEvent;

	/**
	 * 应用入口
	 * @author cyj
	 * 
	 */	
	public class ToolsApp
	{
		public static var view:ToolsView;
		public static var loader:LoaderManager = new LoaderManager();
		public static var file:FileManager = new FileManager();
		public static var config:ToolsConfig;
		public static var event:EventDispatcher = new EventDispatcher();
		public static var projects:Vector.<ProjectConfig> = new Vector.<ProjectConfig>();
		public static var localCfg:LocalConfig = new LocalConfig();
		
		public static var VERSION:String = "1.0.1";
		
		
		public static var CURNUM:int = 0;
		public static var TOTNUM:int = 0;
		
//		public static var ftp:SimpleFTP;		
		public function ToolsApp()
		{
		}
		
		public static function start():void
		{
			loader.loadManyRes(["res/comp.swf", "res/guidecomp.swf"], handleSwfLoaded, null, handleLoadError);
		}
		
		private static function handleSwfLoaded():void
		{
			view = new ToolsView();
			App.stage.addChild(view);
			startDoDrag();
			exitAppEvent();
			loader.loadSingleRes("res/config.xml", ResLoader.TXT, handleConfigLoaded, null, handleLoadError);
		}
		
		
		private static function handleConfigLoaded(res:ResData):void
		{
			XML2Obj.registerClass("toolsconfig", ToolsConfig);
			XML2Obj.registerClass("project", ProjectConfig);
			XML2Obj.registerClass("local", LocalConfig);
			config = XML2Obj.readXml(res.data) as ToolsConfig;
			VERSION = config.version;
			loader.loadSingleRes(config.projectpath, ResLoader.TXT, handleProjectConfigLoaded, null, handleLoadError);
			App.stage.nativeWindow.title = config.title+"@"+VERSION;
			
//			Log.init(App.stage, 9, 360, 586, 65);
			//
//			new ReadMapCfg();
//			ftp = new SimpleFTP(config.ftphost, config.ftpname, config.ftppass);
//			ftp.
//			SimpleFTP.getFile(config.ftphost, config.ftpname, config.ftppass, "/data/", handleGetFtpList);
		}
		
		private static function handleProjectConfigLoaded(res:ResData):void
		{
			
			var pros:XML = new XML(res.data);
			var plist:XMLList = pros.project;
			for(var i:int=0; i<plist.length(); i++)
			{
				projects.push(XML2Obj.readXml(plist[i]));
			}
			loader.loadSingleRes("res/local.xml", ResLoader.TXT, handleLocalConfigLoaded, null, handleLoadError);
			
		}
		
		private static function handleLocalConfigLoaded(res:ResData):void
		{
			
			localCfg = XML2Obj.readXml(res.data) as LocalConfig;
			Log.initLabel(view.txtLog);
			view.initView();
			
			Log.log("系统启动成功");
			loader.loadSingleRes(config.versionconfig, ResLoader.TXT, handleVersionConfigLoaded, null, null);
		}
		
		private static function handleVersionConfigLoaded(res:ResData):void
		{
			var versiontxt:String = res.data;
			var versionReg:RegExp = /[\n\r]*\[(.*?)\][\n\r]*/gi;
			var obj:Object= {};
			var arr:Array= versionReg.exec(versiontxt);
			var lastIndex:int = 0;
			var lastProp:String;
			while(arr)
			{
				if(lastProp)
				{
					obj[lastProp] = versiontxt.substring(lastIndex, versionReg.lastIndex-arr[0].length);
					lastIndex = versionReg.lastIndex;
				}
				lastProp = arr[1];
				lastIndex = versionReg.lastIndex;
				arr = versionReg.exec(versiontxt);
			}
			if(lastProp)
			{
				obj[lastProp] = versiontxt.substring(lastIndex, versiontxt.length);
			}
			if(obj.version != VERSION)
			{
				Alert.show("<font color='#FF0000'>当前版本<font color='#00FF00'>"+VERSION+"</font>最新版本:<font color='#00FF00'>"+obj.version+"</font></font>\n<p align='left'><font color='#FFFF00'>更新内容</font>\n"+obj.desc.replace(/\r\n/gi, "\n")+"</p>", "更新提醒");
			}
			
		} 
		public static function getLenStr(str:String, len:int, addstr:String="0", endstr:String=""):String
		{
			if(!addstr)
				addstr = " ";
			for(var i:int=str.length; i<len; i++)
			{
				str = addstr+str+endstr;
			}
			return str;
		} 
		 
		private static function handleCmdResult(type:int, cmd:String):void
		{
			
		}
		
		 
		private static function handleGetFtpList(res:*, msg:*):void
		{
			Log.log(res);
		}
		
		
		public static function handleLoadError(res:ResData, msg:*):void
		{
			Alert.show("资源加载错误"+res.resPath+"\nerror : "+msg, "加载错误");
		}
		
		private static function startDoDrag():void
		{
			App.stage.addEventListener(NativeDragEvent.NATIVE_DRAG_ENTER, handleDragEnter);
			App.stage.addEventListener(NativeDragEvent.NATIVE_DRAG_DROP, handleDropEvent);
			App.stage.addEventListener(NativeDragEvent.NATIVE_DRAG_EXIT, handleDropExit);
		}
		
		private static function handleDragEnter(e:NativeDragEvent):void
		{
			var clipBoard:Clipboard = e.clipboard;
			if(clipBoard.hasFormat(ClipboardFormats.FILE_LIST_FORMAT))
			{
				NativeDragManager.acceptDragDrop(App.stage);
			}
		}
		
		private static  function handleDropEvent(e:NativeDragEvent):void
		{
			var clip:Clipboard = e.clipboard;
			if(clip.hasFormat(ClipboardFormats.FILE_LIST_FORMAT))
			{
				var arr:Array = clip.getData(ClipboardFormats.FILE_LIST_FORMAT) as Array;
				var file:File;
				for(var i:int=0; i<arr.length; i++)
				{
					file = arr[i];
					if(file.isDirectory==false)
					{
						var type:String = file.name.substr(file.name.lastIndexOf("."));
						if(type == ".dat")
						{
							
						}
					}
//					trace("拖入文件"+file.name);
					//file.namefile.name.lastIndexOf(".")
				}
			}
		}
		
		private static  function handleDropExit(e:NativeDragEvent):void
		{
			//trace("Exit Drop");
		}
		
		private static function exitAppEvent():void
		{
			App.stage.nativeWindow.addEventListener(Event.CLOSING, handleCloseApp);
		}
		
		private static function handleCloseApp(e:Event):void
		{
			Log.log("退出系统");
			Log.refushLog();
			file.saveFile(File.applicationDirectory.nativePath+"/res/local.xml", XML2Obj.readObj(localCfg, "local"));
			//取消默认关闭
//			e.preventDefault();
//			NativeApplication.nativeApplication.activeWindow.visible = true;
			//关闭
			App.stage.nativeWindow.close();
		}
		
		
	}
}
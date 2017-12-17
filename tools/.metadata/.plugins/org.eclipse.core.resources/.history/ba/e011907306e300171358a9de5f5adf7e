package com.cyj.app.view
{
	import com.adobe.crypto.MD5Stream;
	import com.cyj.app.SimpleEvent;
	import com.cyj.app.ToolsApp;
	import com.cyj.app.data.ProjectConfig;
	import com.cyj.app.data.ToolsConfig;
	import com.cyj.app.view.common.Alert;
	import com.cyj.app.view.ui.mapreversal.AppMainUI;
	import com.cyj.utils.Log;
	import com.cyj.utils.cmd.CMDManager;
	import com.cyj.utils.load.ResData;
	import com.cyj.utils.load.ResLoader;
	import com.cyj.utils.md5.MD5;
	
	import flash.events.Event;
	import flash.filesystem.File;
	import flash.utils.ByteArray;
	import flash.utils.Dictionary;
	import flash.utils.flash_proxy;
	import flash.utils.getTimer;
	
	import morn.core.handlers.Handler;
	import morn.core.managers.TipManager;
	
	import org.asmax.util.ZipWriter;
	
	public class ToolsView extends AppMainUI
	{
		
		public static const EVENT_END_SVN_LOG:String = "EVENT_END_SVN_LOG";
		public static const EVENT_END_SVN_EXPORT:String = "EVENT_END_SVN_EXPORT";
		public static const EVENT_END_SVN_ITEM_EXPORT:String = "EVENT_END_SVN_ITEM_EXPORT";
		public static const EVENT_END_RAR_COMPLETE:String = "EVENT_END_RAR_COMPLETE";
		public static const EVENT_END_UP_COMPLETE:String = "EVENT_END_UP_COMPLETE";
		public static const EVENT_END_DEL_COMPLETE:String = "EVENT_END_DEL_COMPLETE";
		
		private var _curProject:ProjectConfig;
		private var _curProjectResDic:Object;
		
		private var _deleteNum:int = 0;
		private var _totalNum:int = 0;
		private var _testExportTime:int = 0;
		private var _testZipTime:int = 0;
		private var _zipPackName:String = "test.zip";
		private var _testUpTime:int= 0;
		private var svnlog:Array = [];
		private var _isRuning:Boolean = false;
		
		private var md5Stream:MD5Stream = new MD5Stream();
		private var errorMsg:String = "";
		private var changeFilesLog:String= "";
		
		public function ToolsView()
		{
			super();
			initEvent();
		}
		/** 初始化界面  **/		
		public function initView():void
		{
			appName.text = ToolsApp.config.appName;
			listSvnLog.dataSource = [];
			refushProgess();
			this.removeChild(tips);
			handleTimeNow();
			var arr:Array = [];
			for(var i:int=0; i<ToolsApp.projects.length; i++)
			{
				arr.push(ToolsApp.projects[i].name);
			}
			comPorject.dataSource = arr;
			if(ToolsApp.localCfg.lastProject>=0&& ToolsApp.localCfg.lastProject<arr.length)
				comPorject.selectedIndex = ToolsApp.localCfg.lastProject;
			else
				comPorject.selectedIndex = 0;
			checkDele.selected = ToolsApp.localCfg.lastDelDir!=0;
			
		}
		/** 初始化事件 **/
		private function initEvent():void
		{
			btnCreate.clickHandler = new Handler(handleGetSvnInfo);
			btnOutPut.clickHandler = new Handler(doExport);
			btnViewLog.clickHandler = new Handler(handleOpenLog);
			btnOutWeb.clickHandler = new Handler(handleOutWeb);
			btnTimeNow.clickHandler = new Handler(handleTimeNow);
			comPorject.selectHandler = new Handler(handleSelectProject);
			checkDele.clickHandler = new Handler(handleCheckDeleClick);
//			btn
			ToolsApp.event.addEventListener(EVENT_END_SVN_LOG, outFileList);
			ToolsApp.event.addEventListener(EVENT_END_SVN_EXPORT, outExportSuccess);
			ToolsApp.event.addEventListener(EVENT_END_RAR_COMPLETE, outRarSuccess);
			ToolsApp.event.addEventListener(EVENT_END_UP_COMPLETE, outUpSuccess);
			ToolsApp.event.addEventListener(EVENT_END_DEL_COMPLETE, outDelSuccess);
			//init
			
		} 
		
		/** 选择是否删除临时文件 **/
		private function handleCheckDeleClick():void
		{
			ToolsApp.localCfg.lastDelDir = checkDele.selected?1:0;
		}
		/** 选择项目 **/
		private function handleSelectProject(index:int):void
		{
			if(index>=ToolsApp.projects.length ||index<0)
			{
				Alert.show("当前选择的索引无效");
				comPorject.selectedIndex = 0;
			}
			if(_isRuning)
			{
				var index:int = ToolsApp.projects.indexOf(_curProject);
				if(index == comPorject.selectedIndex)
					return;
				comPorject.selectedIndex = index;
				Alert.show("正在打包中， 不能切项目");
				return;
			}
			_curProject = ToolsApp.projects[index];
			var file:File =  new File(_curProject.updir);
			var list:Array = file.getDirectoryListing();
			var f:File;
			var nameList:Array = [];
			for(var i:int=0; i<list.length; i++)
			{
				f = list[i];
				if(f.extension == "zip")
				{
					var names:Array = f.name.replace(/res_/gi, "").replace(/\.zip/gi, "").split("-");
					var nameinfos:Array;
					for(var m:int=0; m<names.length; m++)
					{
						nameinfos = names[m].split("_");
						nameList.push({"day":nameinfos[0], "time":nameinfos[1], "timeid":ToolsApp.getTimeId(nameinfos[0], nameinfos[1])});
					}
				}
			}
			nameList.sortOn("timeid", Array.NUMERIC|Array.DESCENDING);
			inputStartDay.text = nameList[0].day.substr(0, 4)+"-"+nameList[0].day.substr(4, 2)+"-"+nameList[0].day.substr(6, 2);
			inputStartTime.text = nameList[0].time.substr(0, 2)+":"+nameList[0].time.substr(2, 2)+":"+nameList[0].time.substr(4, 2);
			handleTimeNow();
			ToolsApp.localCfg.lastProject = index;
			_curProjectResDic = null;
//			ToolsApp.loader.loadSingleRes("file://"+_curProject.resdicpath.replace(/\\/gi, "/"), ResLoader.BYT, handleResDataLoaded, null, ToolsApp.handleLoadError);
			ToolsApp.loader.loadSingleRes(convertFilePath(_curProject.resdicpath), ResLoader.BYT, handleResDataLoaded, null, ToolsApp.handleLoadError);
			
			//test
//			inputStartDay.text = "2017-10-20";
//			inputStartTime.text = "20:42:53";
//			
//			inputEndDay.text = "2017-11-22";
//			inputEndTime.text = "21:53:03";
			
			
		}
		
		private function convertFilePath(path:String):String
		{
			if(path.indexOf("file://")==0)
				return path;
			return "file://"+path.replace(/\\/gi, "/");
		}
		
		
		private function handleResDataLoaded(res:ResData):void
		{
			var byte:ByteArray = res.data;
			byte.inflate();
			_curProjectResDic = byte.readObject();
			
		}
		
		/**保存资源的hash值**/
		private function saveResHash():void
		{
			if(_curProjectResDic == null)return;
			try{
				var byte:ByteArray = new ByteArray();
				byte.writeObject(_curProjectResDic);
				byte.deflate();
//				ToolsApp.file.saveByteFile(_curProject.resdicpath+"\\192.168.2.51\packages\hcz_version\online\res\temp", byte, false);
				var tempDir:String=  File.applicationDirectory.nativePath+"/res/temp/"+_curProject.id;
				var tempPath:String = tempDir+"/res.dat";
				ToolsApp.file.saveByteFile(tempPath, byte, false);
				ToolsApp.cmdOper("copy /y "+ cmdFilePath(tempPath) +" "+cmdFilePath(_curProject.resdicpath)+" ", "RES_COPY");
				
				ToolsApp.file.saveFile(tempDir+"/"+_zipPackName.replace(".zip", ".txt"), changeFilesLog);
				ToolsApp.cmdOper("copy /y "+ cmdFilePath(tempDir+"/"+_zipPackName.replace(".zip", ".txt"))  +" "+_curProject.updir+"\\"+_zipPackName.replace(".zip", ".txt"), "TXT_COPY");
				
				ToolsApp.cmdOper("rd /s /q "+cmdFilePath(tempDir), "RES_TEMP_DEL");//删除
				
			}catch(e:*)
			{
				Alert.show("保存字典资源失败"+_curProject.resdicpath+"\n"+e);
				Log.log("保存字典资源失败"+_curProject.resdicpath+"\n"+e);
			}
			Log.log("--保存资源字典--");
		}
		
		
		/** 获取当前时间 **/
		private function handleTimeNow():void
		{
			var date:Date = new Date();
			inputEndDay.text = ToolsApp.getLenStr(date.fullYear+"", 4, "0", "")+"-"+ToolsApp.getLenStr((date.month+1)+"", 2)+"-"+ToolsApp.getLenStr(date.date+"", 2);
			inputEndTime.text = ToolsApp.getLenStr(date.hours+"", 2)+":"+ToolsApp.getLenStr(date.minutes+"", 2)+":"+ToolsApp.getLenStr(date.seconds+"", 2);
		}
		
		
		/** 打开日志 **/
		private function handleOpenLog():void
		{
			var file:File = new File(ToolsApp.config.logpath);
			if(file.exists)
			{
				Log.refushLog();
				file.openWithDefaultApplication();
			}else{
				Alert.show("没有找到"+ToolsApp.config.logpath+"对应的文件");
			}
		}
		
		/** 打版web **/
		private function handleOutWeb():void
		{
			Alert.show("功能暂未开放");
		}
		
		/** 开始获取日志信息 **/
		private function handleGetSvnInfo():void
		{
			Log.log("开启获取日志");
			var file:File = new File(ToolsApp.config.svnoutpath);
			if(file.exists && file.getDirectoryListing().length>0)
			{
				Alert.show("当前"+ToolsApp.config.svnoutpath+"存在文件是否删除？", "提示", Alert.ALERT_OK_CANCLE, handleCheckDel, "删除", "继续");
			}else{
				doGetSvnInfo();
			}
//			{$starttime}:{$endtime}
			
		}
		/** 点击是否删除临时文件 **/
		private function handleCheckDel(delit:int):void
		{
			if(delit == Alert.ALERT_OK)
			{
				ToolsApp.cmdOper("rd /s /q "+cmdFilePath(ToolsApp.config.svnoutpath), EVENT_END_DEL_COMPLETE);//删除
				Log.log("清除完毕");
			}else{
				doGetSvnInfo();
			}
		}
		/** 临时文件删除成功开始获取svn信息 **/
		private function outDelSuccess(e:Event):void
		{
			doGetSvnInfo();
		}
		/** 获取svn信息 **/
		private function doGetSvnInfo():void
		{
			if(_curProject ==null)
			{
				Alert.show("请选择项目");
				return;
			}
			if(checekDateRegule()==false)return;
			var endTimeArr:Array = inputEndDay.text.split("-");
			var endTime:Date = new Date(endTimeArr[0], int(endTimeArr[1])-1, endTimeArr[2]);
			endTime.time += 24*60*60*1000;
			var cmd:String = _curProject.svncmd.replace(/\$starttime/gi, inputStartDay.text).replace(/\$endtime/gi, endTime.fullYear+"-"+(endTime.month+1)+"-"+endTime.date); 
			ToolsApp.svnOper(cmd, EVENT_END_SVN_LOG);
		}
		
		/** 检测日期，时间格式是否合法 **/
		private function checekDateRegule():Boolean
		{
			var dayReg:RegExp = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/gi;
			
			if(dayReg.exec(inputStartDay.text)==null)
			{
				Alert.show("开始日期不符合格式 XXXX-XX-XX");
				return false;
			}
			dayReg.lastIndex = 0;
			if(dayReg.exec(inputEndDay.text)==null)
			{
				Alert.show("结束日期不符合格式 XXXX-XX-XX");
				return false;
			}
			var timeReg:RegExp = /^[0-9]{2}:[0-9]{2}:[0-9]{2}$/gi;
			if(timeReg.exec(inputStartTime.text)==null)
			{
				Alert.show("开始时间不符合格式 HH:MM:SS");
				return false;
			}
			timeReg.lastIndex = 0;
			if(timeReg.exec(inputEndTime.text)==null)
			{
				Alert.show("结束时间不符合格式 HH:MM:SS");
				return false;
			}
			return true;
		}
		
		/** 导出完毕开始zip压缩文件 **/
		public function outExportSuccess(e:SimpleEvent=null):void
		{
//			Alert.show("导出完毕");
			Log.log("SVN导出完毕， 开始打包资源");
			_testExportTime = getTimer() - _testExportTime;
			
			ToolsApp.cmdClear();
//			var zipWrite:ZipWriter = new ZipWriter();                    后台运行
			
//			D:\common\tools_respackage\src\res\bin\rarbin\winrar.exe a -r test.zip junyou\
			var files:File = new File(ToolsApp.config.svnoutpath);
			var rarfile:String = "";
			if(files.isDirectory)
			{
				var arr:Array = files.getDirectoryListing();
				var f:File;
				for(var i:int=0; i<arr.length; i++)
				{
					f = arr[i];
					rarfile += cmdFilePath(f.nativePath.replace(files.nativePath+"\\", ""))+" ";
				}
			}else{
				rarfile = files.nativePath;
			}
			_testZipTime = getTimer();
			ToolsApp.cmdOper("pushd "+cmdFilePath(ToolsApp.config.svnoutpath));
			ToolsApp.cmdOper("start /wait "+ToolsApp.config.rarpath+" a -r "+_zipPackName+" "+rarfile +" -ibck ");
			ToolsApp.cmdOper("popd",EVENT_END_RAR_COMPLETE);
			Log.log("资源压缩中....");
//			zipWrite.
		}
		
		/** 压缩完毕开始上传文件 **/
		public function outRarSuccess(e:SimpleEvent):void
		{
			
			if(_curProject ==null)
			{
				Alert.show("请选择项目");
				return;
			}
			Log.log("压缩结束 准备上传...");
			_testZipTime = getTimer() - _testZipTime;
			_testUpTime = getTimer();
			ToolsApp.cmdClear();
			ToolsApp.cmdOper("net use \\\\"+ToolsApp.config.upip+" "+ToolsApp.config.uppass+" /user:\""+ToolsApp.config.upname+"\"");
			ToolsApp.cmdOper("copy /y "+ cmdFilePath(ToolsApp.config.svnoutpath+"/"+_zipPackName)  +" "+_curProject.updir+" ", EVENT_END_UP_COMPLETE);
			
		}
		
		/** zip上传完毕 **/
		public function outUpSuccess(e:SimpleEvent):void
		{;
			Log.log("上传结束");
			saveResHash();
			ToolsApp.cmdClear();
			if(checkDele.selected)
			{
				ToolsApp.cmdOper("rd /s /q "+cmdFilePath(ToolsApp.config.svnoutpath));//删除
				Log.log("清除完毕");
			}
			_testUpTime = getTimer() - _testUpTime;
			
			Log.log("用時 导出:"+_testExportTime+" 平均:"+_testExportTime/_totalNum + "  总个数:"+_totalNum);
			Log.log("用時 压缩:"+_testZipTime+" 平均:"+_testZipTime/_totalNum + "  总个数:"+_totalNum);
			Log.log("用時 上传:"+_testUpTime+" 平均:"+_testUpTime/_totalNum + "  总个数:"+_totalNum);
			if(errorMsg)
			{
				Log.log("资源导出失败\n"+errorMsg);
				Alert.show("上传完毕"+_zipPackName +"\n"+errorMsg);
			}else{
				Alert.show("上传完毕"+_zipPackName );
			}
			_isRuning = false;
			if(_totalNum>=ToolsApp.config.localtimeminnum)
			{
				if(checkUse50.selected)
				{
					ToolsApp.localCfg.time50Export = _testExportTime/_totalNum/1000;
					ToolsApp.localCfg.time50Up = _testUpTime/_totalNum/1000;
					ToolsApp.localCfg.time50Zip = _testZipTime/_totalNum/1000;
				}else{
					ToolsApp.localCfg.timeExport = _testExportTime/_totalNum/1000;
					ToolsApp.localCfg.timeUp = _testUpTime/_totalNum/1000;
					ToolsApp.localCfg.timeZip = _testZipTime/_totalNum/1000;
				}
			}
			
			Log.log("资源上传完毕"+_zipPackName);
		}
		
		/** cmd用到的文件路径  格式转换 **/
		public function cmdFilePath(path:String):String
		{
			return path.replace(/\//gi, "\\");
		}
		
		
		/** 开始解析svn列表 **/
		public function outFileList(e:SimpleEvent):void
		{
			Log.log("获取日志成功，刷新列表....");
//			var timestart:String = "00:00:00";
//			var endtime:String = "23:59:59";
			
			if(checekDateRegule()==false)return;
			var startTimeId:Number = ToolsApp.getTimeId(inputStartDay.text, inputStartTime.text);//Number(inputStartDay.text.replace(/-/gi, "")+inputStartTime.text.replace(/:/gi, ""));
			var endTimeId:Number = ToolsApp.getTimeId(inputEndDay.text, inputEndTime.text);//Number(inputEndDay.text.replace(/-/gi, "") + inputEndTime.text.replace(/:/gi, ""));
			
			_zipPackName = "res_"+inputStartDay.text.replace(/-/gi, "")+"_"+inputStartTime.text.replace(/:/gi, "")+"-res_"+inputEndDay.text.replace(/-/gi, "")+"_"+inputEndTime.text.replace(/:/gi, "")+".zip";
			var arr:Array;
			ToolsApp.cmdClear();
			var cmd:String = e.data as String;
			svnlog.length = 0;
			var i:int;
			var totalNum:int = 0;
			if(cmd.indexOf("------------------------------------------------------------------------")!=-1)
			{
				
				cmd = cmd.replace(/\r/gi, "");
				arr = cmd.split("------------------------------------------------------------------------");
				var logTitleMatchReg:RegExp = /r([0-9]+)\s+\|\s+(\w+).*?[\r\n]Changed paths:/gi;
				//\s*r([0-9]+)\s+\|\s+(\w+)\s+\|\s+([0-9]{4}-[0-9]{2}-[0-9]{2}\s+[0-9]{2}:[0-9]{2}:[0-9]{2}).*?\s+Changed paths:
				for(i=0; i<arr.length; i++)
				{
					logTitleMatchReg.lastIndex = 0;
					var temp:Array = logTitleMatchReg.exec(arr[i]);
					if(temp)
					{
						var info:SvnLogInfo = new SvnLogInfo();
						info.parser(arr[i]);
						if(info.timeID>endTimeId || info.timeID<startTimeId)continue;
						svnlog.push(info);
						totalNum += info.logs.length;
					}
				}
			}
			if(svnlog.length>ToolsApp.config.logmaxshownum)
			{
				var logs:Array = [];
				for(i=0; i<ToolsApp.config.logmaxshownum-2; i++)
				{
					logs.push(svnlog[i]);
				}
				logs.push(SvnItemView.INGORE_SHOW_ITEM);
				logs.push(svnlog[svnlog.length-1]);
				listSvnLog.dataSource = logs;
			}else{
				listSvnLog.dataSource = svnlog;
			}
			if(svnlog.length==0)
			{
				Alert.show("当前没有提交记录，不用打版");
			}
			txtSvnInfo.text= "svn日志数:"+svnlog.length+"文件:"+totalNum;
			Log.log("Svn信息获取完毕");
		}
		
		/** 显示所有svn信息列表 **/
		public function showAll():void
		{
			listSvnLog.dataSource = svnlog;
			Log.log("显示全部列表");
		}
		
		/** 开始导出svn列表 **/
		private function doExport():void
		{
			if(svnlog.length ==0)
			{
				Alert.show("当前没有可以打包的资源,请先获取Svn信息");
				return;
			}
			if(_curProject ==null)
			{
				Alert.show("请选择项目");
				return;
			}
			if(_curProjectResDic==null)
			{
				Alert.show("或许"+_curProject.resdicpath+"没有加载完。。。。，也或许加载错误了\n请确认路径");
				return;
			}
			_isRuning = true;
			errorMsg = "";
			changeFilesLog = "";
			_testExportTime = getTimer();
			var item:SvnLogInfo;
			var svnoper:String = "";
			var path:String;
			var res50path:String;
			var logDic:Dictionary = new Dictionary();
			var i:int;
			for(i=0; i< svnlog.length; i++)
			{
				item =  svnlog[i];
//				export  [-r 版本号]  svn://路径(目录或文件的全路径) [本地目录全路径]　--username　用户名
//				svn expr
				for(var m:int=0; m<item.logs.length; m++)
				{
//					svnoper += "export  "+item.version+" https://svn/svn/hcz/"+item.logs[m].file+" d:/OUT/"+item.logs[m].file;
//					ToolsApp.svnOper("export  -r "+item.version+" https://svn/svn/hcz/"+item.logs[m].file+" D:/OUT/"/*+item.logs[m].file*/ +"  --no-auth-cache --force", EVENT_END_SVN_ITEM_EXPORT);
					res50path = item.logs[m].file.replace(_curProject.svnoutingoredic, "").replace(/\\/gi, "/");
					path = res50path;
					
					changeFilesLog += item.logs[m].oper+" "+res50path+"\n";
					if(path.indexOf("m/") != -1)
					{
						path = path.replace(/m\//gi, "m2/");
						if(path.substr(-3) == "jpg")
						{
							path = "m2/"+MD5.hash(path.replace("m2/", "")+ToolsApp.config.mapkey).substr(0, 10)+"."+ToolsApp.config.mapextion;
						}else if(path.indexOf("m2/lib/")!=-1)
						{
							
						}else{
							path = null;
							continue;
						}
					}
					if(item.logs[m].oper.indexOf(SvnLogItem.OPER_DEL)!=-1)
					{
						if(logDic[item.logs[m].file])
							delete logDic[item.logs[m].file];
						if(_curProjectResDic[path])
						{
							delete _curProjectResDic[path];
						}
						continue;
					}
					logDic[item.logs[m].file] = {"data":item.logs[m], "version":item.version, "path":path, "res50path":res50path};
				}
			}
			var logitem:SvnLogItem;
			var version:String;
//			var outPath:String;
			var file:File;
			var outFile:File = new File(ToolsApp.config.svnoutpath);
			_totalNum = 0;
			_deleteNum = 0;
			for(var logpath:String in logDic)
			{
				logitem = logDic[logpath].data;
				version = logDic[logpath].version;
				path = logDic[logpath].path;
				res50path = logDic[logpath].res50path;
				if(path == null)continue;
//				outPath = null;
//				file = new File(ToolsApp.config.svnoutpath+"/"+logitem.file.replace(_curProject.svnoutingoredic, ""));
//				if(file.nativePath.indexOf("m\\") != -1)
//				{
//					if(file.extension == "jpg" || file.extension == "JPG")
//					{
//						outPath = ToolsApp.config.svnoutpath+"/m2/"+MD5.hash(file.nativePath.replace(outFile.nativePath+"\\m\\", "").replace(/\\/gi, "/")+ToolsApp.config.mapkey).substr(0,10)+"."+ToolsApp.config.mapextion;
////						outPath = ToolsApp.config.svnoutpath+"/m2/"+MD5.hash("8001/000000.jpg"+ToolsApp.config.mapkey).substr(0,10)+"."+ToolsApp.config.mapextion;
//						file = new File(outPath);
//					}else if(file.nativePath.indexOf("m\\lib\\") == -1){
//						outPath = file.nativePath.replace("m\\lib\\", "m2\\lib\\");
//					}else{
//						outPath = null;
//					}
//				}else{
//					outPath = file.nativePath;
//				}
				file = new File(ToolsApp.config.svnoutpath+"/"+path);
//				if(outPath)
//				{
					
					if(file.isDirectory)
					{
						file.createDirectory();
					}else if(file.parent.exists == false){
						file.parent.createDirectory();
					}
					
					
					_totalNum ++;
					if(checkUse50.selected == false)
					{
						
						_curProjectResDic[path] = MD5.hash(Math.random()*1000+"cyj").substr(0, 8);
						ToolsApp.svnOper("export  -r "+version+" \""+_curProject.svnroot+logitem.file+"\" \""+ cmdFilePath(file.nativePath)+"\" --force", "ITEM");//需要加上“ 如果文件中含有空格会导致输出错误
					}else{
						ToolsApp.loader.loadSingleRes(convertFilePath(_curProject.res50path)+"/"+res50path, ResLoader.BYT, handleSaveToFile, null, hanldeSaveError, {"path":path});
					}
//				}
			}
//			ToolsApp.file.saveFile("D:/log/log.txt", Log.content);
			if(_totalNum==0)
			{
				Alert.show("当前没有可以打版的内容");
				return;
			}
			Log.refushLog();
			if(checkUse50.selected==false)
				ToolsApp.cmdOper("", EVENT_END_SVN_EXPORT);
//			txtInfo.text = "总共"+_totalNum + " 已处理："+_deleteNum;
			refushProgess();
			Log.log("Svn信息解析完毕,开始导出");
			
		}
		
		/**从50上文件保存成功**/
		private function handleSaveToFile(res:ResData):void
		{
			var byte:ByteArray = res.data;
			var path:String = res.param.path;
			if(_curProjectResDic)
			{
				_curProjectResDic[path] = md5Stream.complete(byte).substr(0, 8);
			}
			ToolsApp.file.saveByteFile(ToolsApp.config.svnoutpath+"/"+path, byte);
			expleteComplete();
			Log.log("保存资源:"+path+" key:"+(_curProjectResDic==null?"NULL":_curProjectResDic[path])+"  "+_deleteNum+"/"+_totalNum);
			checkComplete();
		}
		/**从50上文件保存失败**/
		private function hanldeSaveError(res:ResData, msg:String):void
		{
			Log.error("资源保存失败："+res.param.path+"  Error:"+msg);
			errorMsg += "资源保存失败："+res.param.path+"  Error:"+msg+"\n";
			expleteComplete();
			checkComplete();
		}
		
		/**检测是否已经导出完毕**/
		private function checkComplete():void
		{
			if(_deleteNum>=_totalNum)
			{
				outExportSuccess();
			}
		}
		
		
		
		/** 某一项导出完毕 **/
		public function expleteComplete():void
		{
			_deleteNum ++;
			refushProgess();
		}
		
		/**
		 *刷新上传进度 
		 * 
		 */		
		private function refushProgess():void
		{
			progExpFile.value = _deleteNum/_totalNum;
			progExpFile.label = "处理"+_deleteNum+"/"+_totalNum;
			if(checkUse50.selected==false)
			{
				txtUpLeftTime.text = ""+getTimeStr(_totalNum*ToolsApp.localCfg.timeZip+(_totalNum-_deleteNum)*ToolsApp.localCfg.timeExport+_totalNum*ToolsApp.localCfg.timeUp);
			}else{
				txtUpLeftTime.text = ""+getTimeStr(_totalNum*ToolsApp.localCfg.time50Zip+(_totalNum-_deleteNum)*ToolsApp.localCfg.time50Export+_totalNum*ToolsApp.localCfg.time50Up);
			}
//			Log.log("当前导出"+_deleteNum+"/"+_totalNum);
		}
		
		/**
		 *获取剩余时间 
		 * @param time
		 * @return 
		 * 
		 */		
		private function getTimeStr(time:int):String
		{
			if(time<0)return "0s";
			if(time<60)
			{
				return time+"s";
			}else{
				return Math.ceil(time/60)+":"+time%60;
			}
		}
		
	}
}
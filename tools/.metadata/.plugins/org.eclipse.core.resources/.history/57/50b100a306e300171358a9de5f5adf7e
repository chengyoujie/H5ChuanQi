
package com.cyj.app.view
{
	import com.cyj.app.ToolsApp;
	import com.cyj.app.view.ui.mapreversal.SvnItemViewUI;
	
	import flash.events.MouseEvent;
	
	import morn.core.handlers.Handler;
	
	public class SvnItemView extends SvnItemViewUI
	{
		
		public static const INGORE_SHOW_ITEM:String = "INGORE_SHOW_ITEM";
		
		public function SvnItemView()
		{
			super();
		}
		
		private var _svnItem:SvnLogInfo;
		override public function set dataSource(value:Object):void
		{
			if(value == INGORE_SHOW_ITEM)
			{
				txtVersion.text = "";
				txtDay.text = "";
				txtTime.text = "......";
				txtFileNum.text = "";
				txtMark.htmlText = "<font color='#00FF00'>点击显示全部︾</font>";
				txtAuth.text = "";
				this.addEventListener(MouseEvent.CLICK, handleShowAll);
				return;
			}
			_svnItem = value as SvnLogInfo;
			if(_svnItem==null)return;
			txtVersion.text = _svnItem.version;
			txtDay.text = _svnItem.day;
			txtTime.text = _svnItem.time;
			txtFileNum.text = ""+_svnItem.logs.length;
			txtMark.text = _svnItem.mark;
			txtAuth.text = _svnItem.auth;
			toolTip = new Handler(showTip, [_svnItem]);; 
		}
		
		private function showTip(data:SvnLogInfo):void
		{
			ToolsApp.view.tips.dataSource = data;
			App.stage.setChildIndex(App.tip, App.stage.numChildren-1);
			App.tip.addChild(ToolsApp.view.tips);
		}
		
		private function handleShowAll(e:MouseEvent):void
		{
			ToolsApp.view.showAll();
		}
		
	}
}
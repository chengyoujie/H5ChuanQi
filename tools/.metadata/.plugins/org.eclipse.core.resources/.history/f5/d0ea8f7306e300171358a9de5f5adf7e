package com.cyj.app.view
{
	import com.cyj.app.view.ui.mapreversal.SvnTipUI;
	
	public class SvnTip extends SvnTipUI
	{
		public function SvnTip()
		{
			super();
		}
		
		
		private var _item:SvnLogInfo;
		override public function set dataSource(value:Object):void
		{
			_item = value as SvnLogInfo;
			if(_item == null)return;
			txtAuth.text = _item.auth;
			txtVersion.text = _item.version;
			txtContent.text = _item.content;
			txtContent.width = txtContent.textField.textWidth+10;
			txtContent.height = Math.min(txtContent.textField.textHeight+10, 400);
			bg.width = Math.max(txtContent.width, 250);
			bg.height = txtContent.y + txtContent.height + 5;
		}
	}
}
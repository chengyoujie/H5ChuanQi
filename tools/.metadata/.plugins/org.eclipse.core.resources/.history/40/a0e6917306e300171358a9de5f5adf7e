/**Created by the Morn,do not modify.*/
package com.cyj.app.view.ui.mapreversal {
	import morn.core.components.*;
	public class SvnTipUI extends View {
		public var bg:Image = null;
		public var txtVersion:Label = null;
		public var txtAuth:Label = null;
		public var txtContent:Label = null;
		protected static var uiXML:XML =
			<View width="250" height="340">
			  <Image skin="png.guidecomp.内框_圆角2" x="0" y="0" sizeGrid="5,5,5,5,1" width="253" height="341" var="bg"/>
			  <Label text="版本号：" x="6" y="7" color="0x99ff00" width="65" height="18" align="center"/>
			  <Label text="0000" x="75" y="7" color="0xffff00" width="137" height="18" align="left" var="txtVersion"/>
			  <Label text="提交者：" x="7" y="30" color="0x99ff00" width="65" height="18" align="center"/>
			  <Label text="chengyoujie" x="75" y="30" color="0xffff00" width="137" height="18" align="left" var="txtAuth"/>
			  <Label text="提交内容：" x="7" y="55" color="0x99ff00" width="65" height="18" align="center"/>
			  <Label text="chengyoujie" x="11" y="79" color="0xffff00" width="231" height="251" align="left" var="txtContent"/>
			</View>;
		public function SvnTipUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}
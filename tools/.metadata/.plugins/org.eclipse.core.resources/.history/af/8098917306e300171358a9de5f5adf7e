/**Created by the Morn,do not modify.*/
package com.cyj.app.view.ui.mapreversal {
	import morn.core.components.*;
	public class SvnItemViewUI extends View {
		public var txtVersion:Label = null;
		public var txtFileNum:Label = null;
		public var txtMark:Label = null;
		public var txtDay:Label = null;
		public var txtTime:Label = null;
		public var txtAuth:Label = null;
		protected static var uiXML:XML =
			<View width="600" height="23">
			  <Image skin="png.comp.blank" width="600" height="23" x="0" y="0.5"/>
			  <Label text="版本号" x="2" y="2" color="0xffcc33" width="67" height="18" align="center" var="txtVersion"/>
			  <Label text="文件数" x="314" y="2" color="0xffcc33" width="67" height="18" align="center" var="txtFileNum"/>
			  <Label text="注释" x="488" y="2" color="0xffcc33" width="110" height="18" align="center" var="txtMark"/>
			  <Label text="日期" x="76" y="2" color="0xffcc33" width="110" height="18" align="center" var="txtDay"/>
			  <Label text="时间" x="199" y="2" color="0xffcc33" width="110" height="18" align="center" var="txtTime"/>
			  <Label text="提交者" x="385" y="2" color="0xffcc33" width="104" height="18" align="center" var="txtAuth"/>
			  <Clip skin="png.guidecomp.clip_格子选中" x="1" y="0" width="600" height="23" sizeGrid="5,5,5,5,1" name="selectBox" visible="false"/>
			</View>;
		public function SvnItemViewUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}
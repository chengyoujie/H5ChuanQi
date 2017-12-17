package
{
	import com.cyj.app.ToolsApp;
	import com.cyj.utils.md5.MD5;
	
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	
	[SWF(width="650", height="600", backgroundColor="#444444", frameRate="30")]
	public class ExportPakData extends Sprite
	{
		public function ExportPakData()
		{
			if(this.stage)
				initStage();
			else
				this.addEventListener(Event.ADDED_TO_STAGE, initStage);
		}
		
		private function initStage(e:Event=null):void
		{
			stage.align = StageAlign.TOP_LEFT;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			App.init(this);
			ToolsApp.start();
			
			//			trace(MD5.hash("8001/000000.jpg"+"3tion").substr(0,10));
			//			trace(MD5.hash("res/m/8001/000000.jpg").substr(0,10));
		}
	}
}
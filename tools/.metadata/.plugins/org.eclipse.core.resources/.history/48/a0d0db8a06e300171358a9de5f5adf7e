package
{
	public class SvnLogItem
	{
		public var oper:String;
		public var file:String;
		
		public static const OPER:Object = {"M":"修改", "D":"删除", "A":"增加"};
		
		public static const OPER_DEL:String = "D";
		public static const OPER_ADD:String = "A";
		public static const OPER_MOD:String = "M";
		
		public function SvnLogItem(msg:String)
		{
			msg = msg.replace(/^\s*((.|\n)*\S)?\s*$/,"$1" ); 
			oper = msg.substr(0, 1);
			file = msg.substr(2);
		}
		
		public function str():String
		{
			if(oper in OPER)
				return OPER[oper]+" : "+file.substr(file.lastIndexOf("/"));
			return oper + " : "+ file;
		}
		
	}
}
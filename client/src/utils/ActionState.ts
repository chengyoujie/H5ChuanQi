module utils {
	export class ActionState {

		/**
		 * 人物动作 - 待机（0）
		 */		
		public static  STATE_IDLE:number = 0;
		/**
		 * 人物动作-跑步（ 1）
		 */		
		public static  STATE_RUN:number = 1;
		/**
		 * 人物动作-死亡 （2）高级怪物可以有攻击动作2
		 */		
		public static  STATE_DIE:number = 2;
		/**
		 * 人物动作-走路 （3）
		 */		
		public static  STATE_WALK:number = 3;
		
		/**
		 *人物动作-受伤（4） 
		 */		
		public static  STATE_INJURY:number = 4;
		
		/**
		 *人物动作-攻击1  （5）
		 */		
		public static  STATE_ATTACK1:number = 5;
		
		/**
		 *人物动作-攻击2 （6）
		 */		
		public static  STATE_ATTACK2:number = 6;
		
		/**
		 *人物动作-马上待机（7）
		 */		
		public static  STATE_QUICK_IDLE:number = 7;
		
		/**
		 *人物动作-马上跑步  （8）
		 */		
		public static  STATE_QUICK_RUN:number = 8;
		/**
		 *人物动作-上马 （9）
		 */		
		public static  STATE_RIDE:number = 9;
		
		/**
		 *人物动作-马上走路（10）
		 */		
		public static  STATE_QUICK_WALK:number = 10;
		
		/**
		 *人物动作-攻击3（11）
		 */		
		public static  STATE_ATTACK3:number = 11;
		
		/**
		 *人物动作-攻击4（12）
		 */		
		public static  STATE_ATTACK4:number = 12;
		
		/**
		 *人物动作-跳跃1（13）
		 */		
		public static  STATE_JUMP:number = 13;
		
		/**
		 *人物动作-跳跃2（14）翻跟头
		 */			
		public static  STATE_JUMP2:number = 14;

		public ructor() {
		}
	}
}
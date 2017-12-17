module utils {
	export class Direction {

		/**
		 * 人物方向 ↓
		 */
		public static  FACE_TO_0:number=0;

		/**
		 * 人物方向 ↘
		 */
		public static  FACE_TO_1:number=1; //右下

		/**
		 * 人物方向 →
		 */
		public static  FACE_TO_2:number=2; //右

		/**
		 * 人物方向 ↗
		 */
		public static  FACE_TO_3:number=3; //右上

		/**
		 * 人物方向 ↑
		 */
		public static  FACE_TO_4:number=4; //上

		/**
		 * 人物方向 ↖
		 */
		public static  FACE_TO_5:number=5; //左上

		/**
		 * 人物方向 ←
		 */
		public static  FACE_TO_6:number=6; //左

		/**
		 * 人物方向 ↙
		 */
		public static  FACE_TO_7:number=7; //左下
		/**
		 * 人物方向 之前的方向
		 */
		public static  FACE_TO_OLD:number=8; //左下


		/**
		 * 朝向对应坐标偏移量
		 */
		public static FACE_POS:Array<Array<number>>=[
			/*0*/[0, 1],
			/*1*/[1, 1],
			/*2*/[1, 0],
			/*3*/[1, -1],
			/*4*/[0, -1],
			/*5*/[-1, -1],
			/*6*/[-1, 0],
			/*7*/[-1, 1],
			/*8*/[0, 0]
		];

		/**
		 * 根据起点到终点取得屏幕方向值
		 * @param fx
		 * @param fy
		 * @param tx
		 * @param ty
		 * @return
		 *
		 */
		public static getMouseDirection8(fx:number, fy:number, tx:number, ty:number):number
		{
			if(tx==fx && ty == fy)return 0;
			var d:number=(ty - fy) / (tx - fx);
			if (fx <= tx)
			{
				if (d > 2.414213562373095)
				{
					return 0;
				}
				else if (d > 0.41421356237309503)
				{
					return 1;
				}
				else if (d > -0.41421356237309503)
				{
					return 2;
				}
				else if (d > -2.414213562373095)
				{
					return 3;
				}
				else
				{
					return 4;
				}
			}
			else
			{
				if (d <= -2.414213562373095)
				{
					return 0;
				}
				else if (d <= -0.41421356237309503)
				{
					return 7;
				}
				else if (d <= 0.41421356237309503)
				{
					return 6;
				}
				else if (d <= 2.414213562373095)
				{
					return 5;
				}
				else
				{
					return 4;
				}
			}
		}

		public ructor() {
		}
	}
}
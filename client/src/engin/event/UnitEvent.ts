module engin.event {
	export class UnitEvent extends egret.Event{

		public static  EVENT_MOVE_STEP_END:string = "EVENT_MOVE_STEP_END";

		public constructor(type: string, bubbles?: boolean, cancelable?: boolean, data?: any) {
			super(type, bubbles, cancelable, data);
		}
	}
}
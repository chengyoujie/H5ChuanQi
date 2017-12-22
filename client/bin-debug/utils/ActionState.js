var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    var ActionState = (function () {
        function ActionState() {
        }
        ActionState.prototype.ructor = function () {
        };
        return ActionState;
    }());
    /**
     * 人物动作 - 待机（0）
     */
    ActionState.STATE_IDLE = 0;
    /**
     * 人物动作-跑步（ 1）
     */
    ActionState.STATE_RUN = 1;
    /**
     * 人物动作-死亡 （2）高级怪物可以有攻击动作2
     */
    ActionState.STATE_DIE = 2;
    /**
     * 人物动作-走路 （3）
     */
    ActionState.STATE_WALK = 3;
    /**
     *人物动作-受伤（4）
     */
    ActionState.STATE_INJURY = 4;
    /**
     *人物动作-攻击1  （5）
     */
    ActionState.STATE_ATTACK1 = 5;
    /**
     *人物动作-攻击2 （6）
     */
    ActionState.STATE_ATTACK2 = 6;
    /**
     *人物动作-马上待机（7）
     */
    ActionState.STATE_QUICK_IDLE = 7;
    /**
     *人物动作-马上跑步  （8）
     */
    ActionState.STATE_QUICK_RUN = 8;
    /**
     *人物动作-上马 （9）
     */
    ActionState.STATE_RIDE = 9;
    /**
     *人物动作-马上走路（10）
     */
    ActionState.STATE_QUICK_WALK = 10;
    /**
     *人物动作-攻击3（11）
     */
    ActionState.STATE_ATTACK3 = 11;
    /**
     *人物动作-攻击4（12）
     */
    ActionState.STATE_ATTACK4 = 12;
    /**
     *人物动作-跳跃1（13）
     */
    ActionState.STATE_JUMP = 13;
    /**
     *人物动作-跳跃2（14）翻跟头
     */
    ActionState.STATE_JUMP2 = 14;
    utils.ActionState = ActionState;
    __reflect(ActionState.prototype, "utils.ActionState");
})(utils || (utils = {}));
//# sourceMappingURL=ActionState.js.map
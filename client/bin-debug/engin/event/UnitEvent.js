var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var engin;
(function (engin) {
    var event;
    (function (event) {
        var UnitEvent = (function (_super) {
            __extends(UnitEvent, _super);
            function UnitEvent(type, bubbles, cancelable, data) {
                return _super.call(this, type, bubbles, cancelable, data) || this;
            }
            return UnitEvent;
        }(egret.Event));
        UnitEvent.EVENT_MOVE_STEP_END = "EVENT_MOVE_STEP_END";
        event.UnitEvent = UnitEvent;
        __reflect(UnitEvent.prototype, "engin.event.UnitEvent");
    })(event = engin.event || (engin.event = {}));
})(engin || (engin = {}));
//# sourceMappingURL=UnitEvent.js.map
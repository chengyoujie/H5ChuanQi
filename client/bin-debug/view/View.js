var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var view;
(function (view) {
    var View = (function () {
        function View() {
        }
        return View;
    }());
    view.View = View;
    __reflect(View.prototype, "view.View");
})(view || (view = {}));
//# sourceMappingURL=View.js.map
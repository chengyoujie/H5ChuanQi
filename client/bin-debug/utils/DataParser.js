var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    var DataParser = (function () {
        function DataParser() {
        }
        DataParser.parserCyj = function (data) {
            return null;
        };
        return DataParser;
    }());
    utils.DataParser = DataParser;
    __reflect(DataParser.prototype, "utils.DataParser");
})(utils || (utils = {}));
//# sourceMappingURL=DataParser.js.map
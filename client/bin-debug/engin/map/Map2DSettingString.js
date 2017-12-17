var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var engin;
(function (engin) {
    var map;
    (function (map) {
        var Map2DSettingString = (function () {
            function Map2DSettingString(data, w, h) {
                this._data = data;
                this._w = w;
                this._h = h;
                // this._byte.endian = egret.Endian.BIG_ENDIAN;
                // egret.log(this._byte.length+"byal:"+this._byte.bytesAvailable+","+this._byte.endian)
            }
            Map2DSettingString.prototype.getBinaryData = function (index) {
                // this._byte.position = index;
                // var b:boolean = this._byte.readBoolean();	
                // return b==true?1:0;
                return this._data[index];
            };
            Object.defineProperty(Map2DSettingString.prototype, "w", {
                get: function () {
                    return this._w;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Map2DSettingString.prototype, "h", {
                get: function () {
                    return this._h;
                },
                enumerable: true,
                configurable: true
            });
            /**
             *
             * @param x
             * @param y
             * @return
             * 0 不可走
             * 1 可走
             */
            Map2DSettingString.prototype.getWalk = function (x, y) {
                var d = y * this._w + x;
                if (d < 0) {
                    return 0;
                }
                else if (d > this._data.length) {
                    return 0;
                }
                else {
                    // egret.log("pos:"+x+","+y+" data:"+this.getBinaryData(y *this._w + x));
                    return this.getBinaryData(y * this._w + x) & 1;
                }
            };
            /**
            * @param x
             * @param y
             * @return
             * ALPHA值0-10
             * TTTTAAAA
             */
            Map2DSettingString.prototype.getAlpha = function (x, y) {
                return this.getBinaryData(y * this._w + x) & 15;
            };
            return Map2DSettingString;
        }());
        map.Map2DSettingString = Map2DSettingString;
        __reflect(Map2DSettingString.prototype, "engin.map.Map2DSettingString");
    })(map = engin.map || (engin.map = {}));
})(engin || (engin = {}));
//# sourceMappingURL=Map2DSettingString.js.map
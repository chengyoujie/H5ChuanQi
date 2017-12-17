var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var engin;
(function (engin) {
    var map;
    (function (map) {
        var Map2DSetting = (function () {
            function Map2DSetting(byte, w, h) {
                // egret.log(byte[0]);
                this._dataview = new DataView(byte);
                this._byte = new egret.ByteArray(byte);
                this._w = w;
                this._h = h;
                this._byte.endian = egret.Endian.BIG_ENDIAN;
                // egret.log(this._byte.length+"byal:"+this._byte.bytesAvailable+","+this._byte.endian)
            }
            Map2DSetting.prototype.getBinaryData = function (index) {
                this._byte.position = index;
                // egret.log()
                // var b:boolean = this._byte.readBoolean();	
                // return b==true?1:0;
                // egret.log(this._dataview[index]);
                return this._byte.readByte() & 255;
            };
            Object.defineProperty(Map2DSetting.prototype, "w", {
                get: function () {
                    return this._w;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Map2DSetting.prototype, "h", {
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
            Map2DSetting.prototype.getWalk = function (x, y) {
                var d = y * this._w + x;
                if (d < 0) {
                    return 0;
                }
                else if (d > this._byte.length) {
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
            Map2DSetting.prototype.getAlpha = function (x, y) {
                // return this.getBinaryData(y * this._w + x) & 15
                var d = y * this._w + x;
                if (d < 0) {
                    return 0;
                }
                else if (d > this._byte.length) {
                    return 0;
                }
                else {
                    return this.getBinaryData(d) & 15;
                }
            };
            return Map2DSetting;
        }());
        map.Map2DSetting = Map2DSetting;
        __reflect(Map2DSetting.prototype, "engin.map.Map2DSetting");
    })(map = engin.map || (engin.map = {}));
})(engin || (engin = {}));
//# sourceMappingURL=Map2DSetting.js.map
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    var Direction = (function () {
        function Direction() {
        }
        /**
         * 根据起点到终点取得屏幕方向值
         * @param fx
         * @param fy
         * @param tx
         * @param ty
         * @return
         *
         */
        Direction.getMouseDirection8 = function (fx, fy, tx, ty) {
            if (tx == fx && ty == fy)
                return 0;
            var d = (ty - fy) / (tx - fx);
            if (fx <= tx) {
                if (d > 2.414213562373095) {
                    return 0;
                }
                else if (d > 0.41421356237309503) {
                    return 1;
                }
                else if (d > -0.41421356237309503) {
                    return 2;
                }
                else if (d > -2.414213562373095) {
                    return 3;
                }
                else {
                    return 4;
                }
            }
            else {
                if (d <= -2.414213562373095) {
                    return 0;
                }
                else if (d <= -0.41421356237309503) {
                    return 7;
                }
                else if (d <= 0.41421356237309503) {
                    return 6;
                }
                else if (d <= 2.414213562373095) {
                    return 5;
                }
                else {
                    return 4;
                }
            }
        };
        Direction.prototype.ructor = function () {
        };
        return Direction;
    }());
    /**
     * 人物方向 ↓
     */
    Direction.FACE_TO_0 = 0;
    /**
     * 人物方向 ↘
     */
    Direction.FACE_TO_1 = 1; //右下
    /**
     * 人物方向 →
     */
    Direction.FACE_TO_2 = 2; //右
    /**
     * 人物方向 ↗
     */
    Direction.FACE_TO_3 = 3; //右上
    /**
     * 人物方向 ↑
     */
    Direction.FACE_TO_4 = 4; //上
    /**
     * 人物方向 ↖
     */
    Direction.FACE_TO_5 = 5; //左上
    /**
     * 人物方向 ←
     */
    Direction.FACE_TO_6 = 6; //左
    /**
     * 人物方向 ↙
     */
    Direction.FACE_TO_7 = 7; //左下
    /**
     * 人物方向 之前的方向
     */
    Direction.FACE_TO_OLD = 8; //左下
    /**
     * 朝向对应坐标偏移量
     */
    Direction.FACE_POS = [
        /*0*/ [0, 1],
        /*1*/ [1, 1],
        /*2*/ [1, 0],
        /*3*/ [1, -1],
        /*4*/ [0, -1],
        /*5*/ [-1, -1],
        /*6*/ [-1, 0],
        /*7*/ [-1, 1],
        /*8*/ [0, 0]
    ];
    utils.Direction = Direction;
    __reflect(Direction.prototype, "utils.Direction");
})(utils || (utils = {}));
//# sourceMappingURL=Direction.js.map
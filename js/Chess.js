var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./GameObject"], function (require, exports, GameObject_1) {
    var Chess = (function (_super) {
        __extends(Chess, _super);
        function Chess(x, y, flag) {
            _super.call(this, x, y);
            this.setFlag(flag);
        }
        Chess.prototype.setFlag = function (flag) {
            if (this.hasFlag(flag)) {
                this._flag = flag;
            }
            else {
                throw "no such flag";
            }
        };
        Chess.prototype.getFlag = function () {
            return this._flag;
        };
        Chess.prototype.hasFlag = function (flag) {
            if (flag === Chess.FLAG_EMPTY ||
                flag === Chess.FLAG_O ||
                flag === Chess.FLAG_X) {
                return true;
            }
            return false;
        };
        Chess.prototype.isFlag = function (flag) {
            return this.getFlag() === flag ? true : false;
        };
        Object.defineProperty(Chess, "FLAG_EMPTY", {
            get: function () { return 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Chess, "FLAG_O", {
            get: function () { return 1; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Chess, "FLAG_X", {
            get: function () { return 2; },
            enumerable: true,
            configurable: true
        });
        return Chess;
    })(GameObject_1.GameObject);
    exports.Chess = Chess;
});

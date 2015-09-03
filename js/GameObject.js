define(["require", "exports"], function (require, exports) {
    var GameObject = (function () {
        function GameObject(x, y) {
            this.setX(x);
            this.setY(y);
        }
        GameObject.prototype.setX = function (x) { this._x = x || 0; };
        GameObject.prototype.setY = function (y) { this._y = y || 0; };
        GameObject.prototype.getX = function () { return this._x; };
        GameObject.prototype.getY = function () { return this._y; };
        return GameObject;
    })();
    exports.GameObject = GameObject;
});

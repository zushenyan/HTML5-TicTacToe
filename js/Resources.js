define(["require", "exports"], function (require, exports) {
    var instance = null;
    var Resources = (function () {
        function Resources() {
            if (!instance) {
                instance = this;
            }
            return instance;
        }
        Resources.createImage = function (path) {
            var image = new Image();
            image.src = path;
            return image;
        };
        Resources.createSound = function (path) {
            path += (/firefox|msie/.test(navigator.userAgent)) ? ".ogg" : ".wav";
            return new Audio(path);
        };
        Object.defineProperty(Resources, "IMG_EMPTY", {
            get: function () { return Resources.singletonHelper(Resources.createImage, "resource/empty.png"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resources, "IMG_O1", {
            get: function () { return Resources.singletonHelper(Resources.createImage, "resource/circle1.png"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resources, "IMG_O2", {
            get: function () { return Resources.singletonHelper(Resources.createImage, "resource/circle2.png"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resources, "IMG_O3", {
            get: function () { return Resources.singletonHelper(Resources.createImage, "resource/circle3.png"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resources, "IMG_O4", {
            get: function () { return Resources.singletonHelper(Resources.createImage, "resource/circle4.png"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resources, "IMG_X1", {
            get: function () { return Resources.singletonHelper(Resources.createImage, "resource/cross1.png"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resources, "IMG_X2", {
            get: function () { return Resources.singletonHelper(Resources.createImage, "resource/cross2.png"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resources, "IMG_X3", {
            get: function () { return Resources.singletonHelper(Resources.createImage, "resource/cross3.png"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resources, "IMG_X4", {
            get: function () { return Resources.singletonHelper(Resources.createImage, "resource/cross4.png"); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Resources, "SOUND_WRITING", {
            get: function () { return Resources.singletonHelper(Resources.createSound, "resource/writing"); },
            enumerable: true,
            configurable: true
        });
        Resources.singletonHelper = function (callback, args) {
            if (instance) {
                return callback(args);
            }
            else {
                new Resources();
                return callback(args);
            }
        };
        return Resources;
    })();
    exports.Resources = Resources;
});

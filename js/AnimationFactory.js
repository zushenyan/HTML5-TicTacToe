define(["require", "exports", "./Animation", "./Resources"], function (require, exports, Animation_1, Resources_1) {
    var AnimationFactory = (function () {
        function AnimationFactory() {
        }
        AnimationFactory.createChessEmpty = function (x, y) {
            var animation = new Animation_1.Animation(x, y, false);
            animation.addFrame(Resources_1.Resources.IMG_EMPTY, 0);
            return animation;
        };
        ;
        AnimationFactory.createChessO = function (x, y) {
            var animation = new Animation_1.Animation(x, y, false);
            animation.addFrame(Resources_1.Resources.IMG_O1, AnimationFactory.ANIM_DURATION);
            animation.addFrame(Resources_1.Resources.IMG_O2, AnimationFactory.ANIM_DURATION);
            animation.addFrame(Resources_1.Resources.IMG_O3, AnimationFactory.ANIM_DURATION);
            animation.addFrame(Resources_1.Resources.IMG_O4, AnimationFactory.ANIM_DURATION);
            return animation;
        };
        ;
        AnimationFactory.createChessX = function (x, y) {
            var animation = new Animation_1.Animation(x, y, false);
            animation.addFrame(Resources_1.Resources.IMG_X1, AnimationFactory.ANIM_DURATION);
            animation.addFrame(Resources_1.Resources.IMG_X2, AnimationFactory.ANIM_DURATION);
            animation.addFrame(Resources_1.Resources.IMG_X3, AnimationFactory.ANIM_DURATION);
            animation.addFrame(Resources_1.Resources.IMG_X4, AnimationFactory.ANIM_DURATION);
            return animation;
        };
        ;
        Object.defineProperty(AnimationFactory, "ANIM_DURATION", {
            get: function () { return 125; },
            enumerable: true,
            configurable: true
        });
        return AnimationFactory;
    })();
    exports.AnimationFactory = AnimationFactory;
});

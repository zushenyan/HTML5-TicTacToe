import {Animation} from "./Animation";
import {Resources} from "./Resources";

export class AnimationFactory{
	constructor(){}

	static createChessEmpty(x, y){
		let animation = new Animation(x, y, false);
		animation.addFrame(Resources.IMG_EMPTY, 0);

		return animation;
	};

	static createChessO(x, y){
		let animation = new Animation(x, y, false);

		animation.addFrame(Resources.IMG_O1, AnimationFactory.ANIM_DURATION);
		animation.addFrame(Resources.IMG_O2, AnimationFactory.ANIM_DURATION);
		animation.addFrame(Resources.IMG_O3, AnimationFactory.ANIM_DURATION);
		animation.addFrame(Resources.IMG_O4, AnimationFactory.ANIM_DURATION);

		return animation;
	};

	static createChessX(x, y){
		let animation = new Animation(x, y, false);

		animation.addFrame(Resources.IMG_X1, AnimationFactory.ANIM_DURATION);
		animation.addFrame(Resources.IMG_X2, AnimationFactory.ANIM_DURATION);
		animation.addFrame(Resources.IMG_X3, AnimationFactory.ANIM_DURATION);
		animation.addFrame(Resources.IMG_X4, AnimationFactory.ANIM_DURATION);

		return animation;
	};

	static get ANIM_DURATION() { return 125; }
}

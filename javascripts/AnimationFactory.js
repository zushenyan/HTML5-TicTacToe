function AnimationFactory(){
}

//constant variables
AnimationFactory.IMG_EMPTY = "resource/empty.png";

AnimationFactory.IMG_O1 = "resource/circle1.png";
AnimationFactory.IMG_O2 = "resource/circle2.png";
AnimationFactory.IMG_O3 = "resource/circle3.png";
AnimationFactory.IMG_O4 = "resource/circle4.png";

AnimationFactory.IMG_X1 = "resource/cross1.png";
AnimationFactory.IMG_X2 = "resource/cross2.png";
AnimationFactory.IMG_X3 = "resource/cross3.png";
AnimationFactory.IMG_X4 = "resource/cross4.png";

AnimationFactory.ANIM_DURATION = 125;

AnimationFactory.prototype.constructor = AnimationFactory;

AnimationFactory.createChessEmpty = function(x, y){
	var animation = new Animation(x, y);
	var img = new Image();

	img.src = AnimationFactory.IMG_EMPTY;

	animation.addFrame(img);

	return animation;
};

AnimationFactory.createChessO = function(x, y){
	var animation = new Animation(x, y);
	var img1 = new Image();
	var img2 = new Image();
	var img3 = new Image();
	var img4 = new Image();

	img1.src = AnimationFactory.IMG_O1;
	img2.src = AnimationFactory.IMG_O2;
	img3.src = AnimationFactory.IMG_O3;
	img4.src = AnimationFactory.IMG_O4;

	animation.addFrame(img1, AnimationFactory.ANIM_DURATION);
	animation.addFrame(img2, AnimationFactory.ANIM_DURATION);
	animation.addFrame(img3, AnimationFactory.ANIM_DURATION);
	animation.addFrame(img4, AnimationFactory.ANIM_DURATION);

	return animation;
};

AnimationFactory.createChessX = function(x, y){
	var animation = new Animation(x, y);
	var img1 = new Image();
	var img2 = new Image();
	var img3 = new Image();
	var img4 = new Image();

	img1.src = AnimationFactory.IMG_X1;
	img2.src = AnimationFactory.IMG_X2;
	img3.src = AnimationFactory.IMG_X3;
	img4.src = AnimationFactory.IMG_X4;

	animation.addFrame(img1, AnimationFactory.ANIM_DURATION);
	animation.addFrame(img2, AnimationFactory.ANIM_DURATION);
	animation.addFrame(img3, AnimationFactory.ANIM_DURATION);
	animation.addFrame(img4, AnimationFactory.ANIM_DURATION);

	return animation;
};
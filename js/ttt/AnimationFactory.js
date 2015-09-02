define(["./TicTacToe", "./Animation", "./Resources"], function(TicTacToe){
	TicTacToe.AnimationFactory = (function(TicTacToe){
		function AnimationFactory(){ }

		AnimationFactory.ANIM_DURATION = 125;

		AnimationFactory.createChessEmpty = function(x, y){
			var animation = new TicTacToe.Animation(x, y);
			animation.addFrame(TicTacToe.Resources.IMG_EMPTY);

			return animation;
		};

		AnimationFactory.createChessO = function(x, y){
			var animation = new TicTacToe.Animation(x, y);

			animation.addFrame(TicTacToe.Resources.IMG_O1, AnimationFactory.ANIM_DURATION);
			animation.addFrame(TicTacToe.Resources.IMG_O2, AnimationFactory.ANIM_DURATION);
			animation.addFrame(TicTacToe.Resources.IMG_O3, AnimationFactory.ANIM_DURATION);
			animation.addFrame(TicTacToe.Resources.IMG_O4, AnimationFactory.ANIM_DURATION);

			return animation;
		};

		AnimationFactory.createChessX = function(x, y){
			var animation = new TicTacToe.Animation(x, y);

			animation.addFrame(TicTacToe.Resources.IMG_X1, AnimationFactory.ANIM_DURATION);
			animation.addFrame(TicTacToe.Resources.IMG_X2, AnimationFactory.ANIM_DURATION);
			animation.addFrame(TicTacToe.Resources.IMG_X3, AnimationFactory.ANIM_DURATION);
			animation.addFrame(TicTacToe.Resources.IMG_X4, AnimationFactory.ANIM_DURATION);

			return animation;
		};

		return AnimationFactory;
	})(TicTacToe);
});

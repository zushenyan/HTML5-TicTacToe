define(["./TicTacToe"], function(TicTacToe){
	TicTacToe.Resources = (function(){
		function Resources(){ }

		Resources.IMG_EMPTY = createImage("resource/empty.png");

		Resources.IMG_O1 = createImage("resource/circle1.png");
		Resources.IMG_O2 = createImage("resource/circle2.png");
		Resources.IMG_O3 = createImage("resource/circle3.png");
		Resources.IMG_O4 = createImage("resource/circle4.png");

		Resources.IMG_X1 = createImage("resource/cross1.png");
		Resources.IMG_X2 = createImage("resource/cross2.png");
		Resources.IMG_X3 = createImage("resource/cross3.png");
		Resources.IMG_X4 = createImage("resource/cross4.png");

		Resources.SOUND_WRITTING = createSound("resource/writing");

		function createImage(path){
			var image = new Image();
			image.src = path;
			return image;
		}

		function createSound(path){
			path += (/firefox|msie/.test(navigator.userAgent)) ? ".ogg" : ".wav";
			return new Audio(path);
		}

		return Resources;
	})();
});

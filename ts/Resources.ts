let instance = null;

export class Resources{
	constructor(){
		if(!instance){
			instance = this;
		}

		return instance;
	}

	static createImage(path){
		var image = new Image();
		image.src = path;
		return image;
	}

	static createSound(path){
		path += (/firefox|msie/.test(navigator.userAgent)) ? ".ogg" : ".wav";
		return new Audio(path);
	}

	static get IMG_EMPTY(){ return Resources.singletonHelper(Resources.createImage, "resource/empty.png"); }
	static get IMG_O1(){ return Resources.singletonHelper(Resources.createImage, "resource/circle1.png"); }
	static get IMG_O2(){ return Resources.singletonHelper(Resources.createImage, "resource/circle2.png"); }
	static get IMG_O3(){ return Resources.singletonHelper(Resources.createImage, "resource/circle3.png"); }
	static get IMG_O4(){ return Resources.singletonHelper(Resources.createImage, "resource/circle4.png"); }
	static get IMG_X1(){ return Resources.singletonHelper(Resources.createImage, "resource/cross1.png"); }
	static get IMG_X2(){ return Resources.singletonHelper(Resources.createImage, "resource/cross2.png"); }
	static get IMG_X3(){ return Resources.singletonHelper(Resources.createImage, "resource/cross3.png"); }
	static get IMG_X4(){ return Resources.singletonHelper(Resources.createImage, "resource/cross4.png"); }
	static get SOUND_WRITING(){ return Resources.singletonHelper(Resources.createSound, "resource/writing"); }

	static singletonHelper(callback, args){
		if(instance){
			return callback(args);
		}
		else {
			new Resources();
			return callback(args);
		}
	}
}

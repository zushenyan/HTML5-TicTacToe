function Animation(x, y, loop){
	this._array = new Array();
	this._currIndex = 0;
	this._animTime = 0;
	this._totalDuration = 0;
	this._loop = loop || false;
	this.setXY(x, y);
}

Animation.prototype.constructor = Animation;

Animation.prototype.setX = function(x) {
	this._x = x || 0;
};

Animation.prototype.getX = function() {
	return this._x;
};

Animation.prototype.setY = function(y) {
	this._y = y || 0;
};

Animation.prototype.getY = function() {
	return this._y;
};

Animation.prototype.setXY = function(x, y) {
	this.setX(x);
	this.setY(y);
};

Animation.prototype.drawSelf = function(ctx) {
	ctx.drawImage(this.getCurrentFrame(), this.getX(), this.getY());
};

Animation.prototype.addFrame = function(image, duration){
	this._totalDuration += duration;

	var frame = {
		img : image,
		dur : duration
	};

	this._array.push(frame);
};

Animation.prototype.getCurrentFrame = function(){
	return this._array[this._currIndex].img;
};

Animation.prototype.setLoop = function(loop){
	this._loop = loop;
};

Animation.prototype.isLoop = function(){
	return this._loop;
};

Animation.prototype.rewind = function(){
	this._animTime = 0;
	this._currIndex = 0;
};

Animation.prototype.playAnimation = function(elapsedTime){
	if(this._array.length > 1){
		this._animTime += elapsedTime;
		this._animTime = this._animTime % this._totalDuration;

		if(!this.isLoop() && this._currIndex == this._array.length - 1){
			return;
		}
		else{
			calIndexHelper(this);
		}
	}

	function calIndexHelper(that){
		var min = 0, max = 0;
		for(var i = 0; i < that._array.length; i++){
			max += that._array[i].dur;
			if(that._animTime >= min && that._animTime < max){
				that._currIndex = i;
				break;
			}
			else{
				min += that._array[i].dur;
			}
		}
	}
};
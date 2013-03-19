function GameObject(x, y){
	this._x = x;
	this._y = y;
}

GameObject.prototype.constructor = GameObject;

GameObject.prototype.setX = function(x){
	this._x = x;
};

GameObject.prototype.setY = function(y){
	this._y = y;
};

GameObject.prototype.getX = function(){
	return this._x;
};

GameObject.prototype.getY = function(){
	return this._y;
};
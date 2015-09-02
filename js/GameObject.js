var TicTacToe = TicTacToe || {};

TicTacToe.GameObject = (function(){
	function GameObject(x, y){
		this._x = x || 0;
		this._y = y || 0;
	}

	GameObject.prototype.setX = function(x){ this._x = x; };
	GameObject.prototype.setY = function(y){ this._y = y; };
	GameObject.prototype.getX = function(){ return this._x; };
	GameObject.prototype.getY = function(){ return this._y; };

	return GameObject;
})();

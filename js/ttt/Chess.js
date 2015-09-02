define(["./TicTacToe", "./GameObject"], function(TicTacToe){
	TicTacToe.Chess = (function(_parent){
		function Chess(x, y, flag){
			_parent.call(this, x, y, flag);
			this.setFlag(flag);
		}

		Chess.prototype = Object.create(_parent.prototype);
		Chess.prototype.constructor = Chess;

		Chess.prototype.setFlag = function(flag){
			if(this.hasFlag(flag)){
				this._flag = flag;
			}
			else{
				throw "no such flag";
			}
		};

		Chess.prototype.getFlag = function(){
			return this._flag;
		};

		Chess.prototype.hasFlag = function(flag){
			if(
				flag === Chess.FLAG_EMPTY ||
				flag === Chess.FLAG_O ||
				flag === Chess.FLAG_X){
				return true;
			}
			return false;
		};

		Chess.prototype.isFlag = function(flag){
			return this.getFlag() === flag ? true : false;
		};

		/*
			static zone
		*/
		Chess.FLAG_EMPTY = 0;
		Chess.FLAG_O = 1;
		Chess.FLAG_X = 2;

		return Chess;
	})(TicTacToe.GameObject);
});

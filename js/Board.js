var TicTacToe = TicTacToe || {};

TicTacToe.Board = (function(){
	function Board(){
		this.resetBoard();
	}

	Board.prototype.resetBoard = function(){
		this._board = new Array(3);

		for(var i = 0; i < this._board.length; i++){
			this._board[i] = new Array(3);
		}

		for(var i = 0; i < this._board.length; i++){
			for(var j = 0; j < this._board[i].length; j++){
				this._board[i][j] = new TicTacToe.Chess(j, i, TicTacToe.Chess.FLAG_EMPTY);
			}
		}
	};

	Board.prototype.placeFlag = function(x, y, flag){ this._board[y][x].setFlag(flag); };
	Board.prototype.getFlag = function(x, y){ return this._board[y][x].getFlag(); };

	Board.prototype.getWidth = function(){ return this._board.length; };
	Board.prototype.getHeight = function(){ return this._board[0].length; };

	//for debug usage
	Board.prototype.printBoard = function(){
		var str = "";
		for(var i = 0; i < this._board.length; i++){
			for(var j = 0; j < this._board[i].length; j++){
				str += this._board[i][j].getFlag() + " ";
			}
			str = "";
		}
	};

	return Board;
})();

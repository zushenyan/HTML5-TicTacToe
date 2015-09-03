import {Chess} from "./Chess";

export class Board{
	_board;

	constructor(){
		this.resetBoard();
	}

	resetBoard(){
		this._board = new Array(3);

		for(var i = 0; i < this._board.length; i++){
			this._board[i] = new Array(3);
		}

		for(var i = 0; i < this._board.length; i++){
			for(var j = 0; j < this._board[i].length; j++){
				this._board[i][j] = new Chess(j, i, Chess.FLAG_EMPTY);
			}
		}
	};

	placeFlag(x, y, flag){ this._board[y][x].setFlag(flag); };
	getFlag(x, y){ return this._board[y][x].getFlag(); };

	getWidth(){ return this._board.length; };
	getHeight(){ return this._board[0].length; };

	//for debug usage
	printBoard(){
		var str = "";
		for(var i = 0; i < this._board.length; i++){
			for(var j = 0; j < this._board[i].length; j++){
				str += this._board[i][j].getFlag() + " ";
			}
			str = "";
		}
	};
}

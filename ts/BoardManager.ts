import {Chess} from "./Chess";
import {Board} from "./Board";

export class BoardManager{
	_board;
	_isGameover;
	_turn;

	constructor(){
		this._board = new Board();
		this.newGame();
	}

	// constant variables
	static get STATE_GOING(){ return "0"; };
	static get STATE_O_WINS(){ return "1"; };
	static get STATE_X_WINS(){ return "2"; };
	static get STATE_EVEN(){ return "-1"; };

	static get ERROR_INVALID_MOVEMENT(){ return 0; };
	static get ERROR_GAMEOVER(){ return 1; };

	newGame(){
		this._board.resetBoard();
		this.resetCounter();
		this.allowFlagPlacement();
	};

	turnCounter(){ this._turn++; };
	getWhosTurn(){ return (this._turn % 2) === 1 ? Chess.FLAG_O : Chess.FLAG_X; };
	getPreviousTurn(){ return (this.getWhosTurn() === Chess.FLAG_O) ? Chess.FLAG_X : Chess.FLAG_O; };
	resetCounter(){ this._turn = 0; };
	isGameOver(){ return this._isGameover; };
	allowFlagPlacement(){ this._isGameover = false; };
	forbitFlagPlacement(){ this._isGameover = true; };

	placeFlag(x, y){
		if(this.isGameOver()){
			throw BoardManager.ERROR_GAMEOVER;
		}
		else if(this._board.getFlag(x, y) !== Chess.FLAG_EMPTY){
			throw BoardManager.ERROR_INVALID_MOVEMENT;
		}
		this._board.placeFlag(x, y, this.getWhosTurn());
		this.turnCounter();
		return this.checkWinner();
	};

	getFlag(x, y){
		return this._board.getFlag(x, y);
	};

	checkWinner(){
		let result = null, isFullBoard = false;

		//check if it's full board
		let count = 0;
		for(let i = 0; i < this._board.getHeight(); i++){
			for(let j = 0; j < this._board.getWidth(); j++){
				if(this._board.getFlag(j, i) == Chess.FLAG_EMPTY){
					count++;
				}
			}
		}

		if(count == 0){
			isFullBoard = true;
		}

		result =
				checkRowHelper([0,0], [0,1], [0,2], this._board) ||
				checkRowHelper([1,0], [1,1], [1,2], this._board) ||
				checkRowHelper([2,0], [2,1], [2,2], this._board) ||
				checkRowHelper([0,0], [1,0], [2,0], this._board) ||
				checkRowHelper([0,1], [1,1], [2,1], this._board) ||
				checkRowHelper([0,2], [1,2], [2,2], this._board) ||
				checkRowHelper([0,0], [1,1], [2,2], this._board) ||
				checkRowHelper([0,2], [1,1], [2,0], this._board);

		if(result && result !== Chess.FLAG_EMPTY){
			this.forbitFlagPlacement();
			return result === Chess.FLAG_O ? BoardManager.STATE_O_WINS : BoardManager.STATE_X_WINS;
		}
		else if(isFullBoard){
			this.forbitFlagPlacement();
			return BoardManager.STATE_EVEN;
		}
		else{
			return BoardManager.STATE_GOING;
		}

		function checkRowHelper(chess1, chess2, chess3, board){
			if(
				(board.getFlag(chess1[0], chess1[1]) == board.getFlag(chess2[0], chess2[1])) &&
				(board.getFlag(chess1[0], chess1[1]) == board.getFlag(chess3[0], chess3[1]))
				){
				return board.getFlag(chess1[0], chess1[1]);
			}
			return null;
		}
	};

	printBoard(){ this._board.printBoard(); };
}

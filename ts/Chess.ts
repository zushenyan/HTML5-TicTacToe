import {GameObject} from "./GameObject";
export class Chess extends GameObject{
	_flag;

	constructor(x, y, flag){
		super(x, y);
		this.setFlag(flag);
	}

	setFlag(flag){
		if(this.hasFlag(flag)){
			this._flag = flag;
		}
		else{
			throw "no such flag";
		}
	}

	getFlag(){
		return this._flag;
	}

	hasFlag(flag){
		if(
			flag === Chess.FLAG_EMPTY ||
			flag === Chess.FLAG_O ||
			flag === Chess.FLAG_X
			){
			return true;
		}
		return false;
	}

	isFlag(flag){
		return this.getFlag() === flag ? true : false;
	}

	static get FLAG_EMPTY(){ return 0; }
	static get FLAG_O(){ return 1; }
	static get FLAG_X(){ return 2; }
}

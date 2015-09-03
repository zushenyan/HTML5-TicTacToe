export class GameObject{
	_x;
	_y;

	constructor(x, y){
		this.setX(x);
		this.setY(y);
	}

	setX(x){ this._x = x || 0}
	setY(y){ this._y = y || 0}
	getX(){ return this._x; }
	getY(){ return this._y; }
}

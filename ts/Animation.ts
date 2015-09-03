export class Animation{
	_animTime;
	_array;
	_currIndex;
	_totalDuration;
	_loop;
	_x;
	_y;

	constructor(x, y, loop){
		this._array = new Array();
		this._currIndex = 0;
		this._animTime = 0;
		this._totalDuration = 0;
		this._loop = loop || false;
		this.setXY(x, y);
	}

	setX(x) { this._x = x || 0; };
	getX() { return this._x; };
	setY(y) { this._y = y || 0; };
	getY() { return this._y; };

	setXY(x, y) {
		this.setX(x);
		this.setY(y);
	};

	drawSelf(ctx) {
		ctx.drawImage(this.getCurrentFrame(), this.getX(), this.getY());
	};

	addFrame(image, duration){
		this._totalDuration += duration;

		let frame = {
			img : image,
			dur : duration
		};

		this._array.push(frame);
	};

	getCurrentFrame(){ return this._array[this._currIndex].img; };
	setLoop(loop){ this._loop = loop; };
	isLoop(){ return this._loop; };

	rewind(){
		this._animTime = 0;
		this._currIndex = 0;
	};

	playAnimation(elapsedTime){
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
			let min = 0, max = 0;
			for(let i = 0; i < that._array.length; i++){
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
}

import {Chess} from "./Chess";
import {BoardManager} from "./BoardManager";
import {AnimationFactory} from "./AnimationFactory";
import {Resources} from "./Resources";

/*
  fixed the problem that compiler keeps telling "The property 'blah' does not exist on value of type 'window'"...blah blah blah
*/
interface MyWindow extends Window {
  requestAnimationFrame: any;
  webkitRequestAnimationFrame: any;
  mozRequestAnimationFrame: any;
  oRequestAnimationFrame: any;
 }
 declare var window: MyWindow;

//game data
let _bm = null,
		_lastTime = null,
		_animBoard = null,
    _sound = null;

let _dict_turn = null,
		_dict_state = null;

//UI variables
let _canvas = null,
		_turnStatus = null,
		_newGameButton = null,
		_imBanner = null,
		_winnerBanner = null,
		_fpsMeter = null;

//initialize things
function init(){
	initAnimFrame();
  initSound();
	initDict();
	initUI();
	initEvent();
	initGameLogic();

	window.requestAnimationFrame(update);
}

function initAnimFrame(){
	window.requestAnimationFrame =
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback){
			window.setTimeout(callback, 1000 / 60);
		};
}

function initSound(){
  this._sound = Resources.SOUND_WRITING;
}

function initDict(){
	_dict_turn = [];
	_dict_state = [];

	_dict_turn[Chess.FLAG_O] = "Player: O\'s turn";
	_dict_turn[Chess.FLAG_X] = "Player: X\'s turn";

	_dict_state[BoardManager.STATE_GOING] = "game is running";
	_dict_state[BoardManager.STATE_O_WINS] = "O player wins";
	_dict_state[BoardManager.STATE_X_WINS] = "X player wins";
	_dict_state[BoardManager.STATE_EVEN] = "even";
}

function initUI(){
	_canvas = document.getElementById("canvas");
	_turnStatus = document.getElementById("turnStatus");
	_newGameButton = document.getElementById("restartButton");
	_imBanner = document.getElementById("invalidMovementBanner");
	_winnerBanner = document.getElementById("winnerBanner");
	_fpsMeter = document.getElementById("fps");

	_canvas.width = 300;
	_canvas.height = 300;

	_newGameButton.innerHTML = "Restart";
	_imBanner.innerHTML = "invalid movement!";
	_winnerBanner.innerHTML = "";

	_imBanner.className = "hideBanner";
	_winnerBanner.className = "hideBanner";
}

function initEvent(){
	_canvas.addEventListener("mousedown", mouseInput);
	_newGameButton.addEventListener("click", newGame);
}

//things about updating and drawing
function update(){
	let elapsedTime = Date.now() - _lastTime;
	updateFPSMeter(elapsedTime);

	// update animations
	for(let i = 0; i < _animBoard.length; i++){
		for(let j = 0; j < _animBoard[i].length; j++){
			_animBoard[i][j].playAnimation(elapsedTime);
		}
	}

	_turnStatus.innerHTML = _dict_turn[_bm.getWhosTurn()];
	_winnerBanner.innerHTML = _dict_state[_bm.checkWinner()];

	if(_bm.checkWinner() !== BoardManager.STATE_GOING){
		setBannerStyle(_winnerBanner, "showBanner");
	}

	draw();

	window.requestAnimationFrame(update);
	_lastTime = Date.now();
}

function draw(){
	if(_canvas){
		let ctx = _canvas.getContext("2d");

		//clear screen
		ctx.clearRect(0, 0, _canvas.width, _canvas.height);

		//seperation line
		for(let i = 1; i <= 2; i++){
			let x = _canvas.width;
			let y = i * (_canvas.height / 3);
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(x, y);
			ctx.stroke();

			x = i * (_canvas.width / 3);
			y = _canvas.height;
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, y);
			ctx.stroke();
		}

		//draw animation
		for(let i = 0; i < _animBoard.length; i++){
			for(let j = 0; j < _animBoard[i].length; j++){
				_animBoard[i][j].drawSelf(ctx);
			}
		}
	}
}

function mouseInput(e){
	let cursor = getRelCursorPos(e);

	//judge which cell
	let x = Math.floor(cursor.x / (_canvas.width / 3));
	let y = Math.floor(cursor.y / (_canvas.height / 3));

	//to ensure no accident happens
	x = x > 2 ? 2 : x;
	y = y > 2 ? 2 : y;

	//time to do something
	try{
		_bm.placeFlag(x, y);
		setAnimBoard(x, y, _bm.getPreviousTurn());
		playSound();
	}
	catch(e){
		if(e === BoardManager.ERROR_INVALID_MOVEMENT){
			changeBannerStyleAfter(_imBanner, "showBanner", 1500, function(){ setBannerStyle(_imBanner, "hideBanner")});
		}
		else if(e === BoardManager.ERROR_GAMEOVER){
			//do nothing
		}
		else{
			throw e;
		}
	}
}

function getRelCursorPos(e){
  let rect = _canvas.getBoundingClientRect();
  let canvasX = Math.round((e.clientX - rect.left) / (rect.right - rect.left) * _canvas.width);
  let canvasY = Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * _canvas.height);

	return {x: canvasX, y:canvasY};
}

//game logic
function initGameLogic(){
	_bm = new BoardManager();
	initAnimBoard();
	resetAnimBoard();
}

function initAnimBoard(){
	_animBoard = new Array(3);
	for(let i = 0; i < _animBoard.length; i++){
		_animBoard[i] = new Array(3);
	}
}

function resetAnimBoard(){
	for(let i = 0; i < _animBoard.length; i++){
		for(let j = 0; j < _animBoard[i].length; j++){
			setAnimBoard(j, i, Chess.FLAG_EMPTY);
		}
	};
}

function setAnimBoard(x, y, flag){
	let cellWidth = _canvas.width / 3;
	let cellHeight = _canvas.height / 3;

	if(flag === Chess.FLAG_EMPTY){
		_animBoard[y][x] = AnimationFactory.createChessEmpty(x * cellWidth, y * cellHeight);
	}
	else if(flag === Chess.FLAG_X){
		_animBoard[y][x] = AnimationFactory.createChessX(x * cellWidth, y * cellHeight);
	}
	else if(flag === Chess.FLAG_O){
		_animBoard[y][x] = AnimationFactory.createChessO(x * cellWidth, y * cellHeight);
	}
	else{
		throw "how could it be possible!?";
	}
}

function newGame(){
	_bm.newGame();
	resetAnimBoard();
	setBannerStyle(_winnerBanner, "hideBanner");
}

function playSound(){
	if(!this._sound.paused){
		this._sound.currentTime = 0;
		this._sound.play();
	}
	else{
		this._sound.play();
	}
}

function changeBannerStyleAfter(banner, style, milsec, callback){
	setBannerStyle(banner, style);
	window.setTimeout(callback, milsec);
}

function setBannerStyle(banner, style){
	banner.className = style;
}

function updateFPSMeter(elapsedTime){
	_fpsMeter.innerHTML = (1000 / elapsedTime).toFixed(1) + " fps";
}

init();

//game data
var _bm = null;
var _lastTime = null;
var _animBoard = null;

//UI variables
var _canvas = null, _turnStatus = null, _newGameButton = null, _imBanner = null, _winnerBanner = null;

//initialize things
function init(){
	initUI();
	initEvent();
	initGameLogic();
}

function initUI(){
	_canvas = document.getElementById("canvas");
	_turnStatus = document.getElementById("turnStatus");
	_newGameButton = document.getElementById("restartButton");
	_imBanner = document.getElementById("invalidMovementBanner");
	_winnerBanner = document.getElementById("winnerBanner");

	_canvas.width = 300;
	_canvas.height = 300;
	
	_newGameButton.innerHTML = "Restart";
	_imBanner.innerHTML = "invalid movement!";
	_winnerBanner.innerHTML = "";

	var main = document.getElementById("main");
	var width = parseInt(window.getComputedStyle(main, null).getPropertyValue("width"));
	var lp = (window.screen.width - width) / 2 + "px";
	main.style.left = lp;
}

function initEvent(){
	_canvas.addEventListener("mousedown", mouseInput);
	_newGameButton.addEventListener("click", newGame);
}

//things about updating and drawing
function update(){
	var elapsedTime = Date.now() - _lastTime;

	//update animations
	for(var i = 0; i < _animBoard.length; i++){
		for(var j = 0; j < _animBoard[i].length; j++){
			_animBoard[i][j].playAnimation(elapsedTime);
		}
	}

	//update ui info
	var turn = "";
	if(_bm.getWhosTurn() == Chess.FLAG_O){
		turn = "Player: O\'s turn";
	}
	else if(_bm.getWhosTurn() == Chess.FLAG_X){
		turn = "Player: X\'s turn";
	}
	else{
		turn = "what?";
	}
	_turnStatus.innerHTML = turn;

	var result = "";
	if(_bm.checkWinner() == BoardManager.STATE_GOING){
		result = "game is running";
	}
	else if(_bm.checkWinner() == BoardManager.STATE_O_WINS){
		result = "O player wins!";
	}
	else if(_bm.checkWinner() == BoardManager.STATE_X_WINS){
		result = "X player wins!";
	}
	else if(_bm.checkWinner() == BoardManager.STATE_EVEN){
		result = "even";
	}
	else{
		result = "impossible!";
	}

	_winnerBanner.innerHTML = result;

	if(_bm.checkWinner() != BoardManager.STATE_GOING){
		showWinnerBanner();
	}

	_lastTime = Date.now();
	draw();
}

function draw(){
	if(_canvas){
		var ctx = _canvas.getContext("2d");

		//clear screen
		ctx.clearRect(0, 0, _canvas.width, _canvas.height);

		//seperation line
		for(var i = 1; i <= 2; i++){
			var x = _canvas.width;
			var y = i * (_canvas.height / 3);
			ctx.moveTo(0, y);
			ctx.lineTo(x, y);
			ctx.stroke();

			x = i * (_canvas.width / 3);
			y = _canvas.height;
			ctx.moveTo(x, 0);
			ctx.lineTo(x, y);
			ctx.stroke();
		}

		//draw animation
		for(var i = 0; i < _animBoard.length; i++){
			for(var j = 0; j < _animBoard[i].length; j++){
				_animBoard[i][j].drawSelf(ctx);
			}
		}
	}
}

function mouseInput(e){
	var cursor = getRelCursorPos(e);

	//judge which cell
	var x = Math.floor(cursor.x / (_canvas.width / 3));
	var y = Math.floor(cursor.y / (_canvas.height / 3));

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
		if(e == BoardManager.ERROR_INVALID_MOVEMENT){
			showIMBanner();
		}
		else if(e == BoardManager.ERROR_GAMEOVER){
			//do nothing
		}
		else{
			alert(e);
		}
	}
}

function getRelCursorPos(e){
	var totalOffsetX = 0;
	var totalOffsetY = 0;
	var canvasX = 0;
	var canvasY = 0;
	var currentElement = _canvas;

	do{
		totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
		totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
	}while(currentElement = currentElement.offsetParent);

	canvasX = e.pageX - totalOffsetX;
	canvasY = e.pageY - totalOffsetY;

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
	for(var i = 0; i < _animBoard.length; i++){
		_animBoard[i] = new Array(3);
	}
}

function resetAnimBoard(){
	for(var i = 0; i < _animBoard.length; i++){
		for(var j = 0; j < _animBoard[i].length; j++){
			setAnimBoard(j, i, Chess.FLAG_EMPTY);
		}
	};
}

function setAnimBoard(x, y, flag){
	var cellWidth = _canvas.width / 3;
	var cellHeight = _canvas.height / 3;

	if(flag == Chess.FLAG_EMPTY){
		_animBoard[y][x] = AnimationFactory.createChessEmpty(x * cellWidth, y * cellHeight);
	}
	else if(flag == Chess.FLAG_X){
		_animBoard[y][x] = AnimationFactory.createChessX(x * cellWidth, y * cellHeight);
	}
	else if(flag == Chess.FLAG_O){
		_animBoard[y][x] = AnimationFactory.createChessO(x * cellWidth, y * cellHeight);
	}
	else{
		throw "how could it be possible!?";
	}
}

function newGame(){
	_bm.newGame();
	resetAnimBoard();
	hideWinnerBanner();
}

function playSound(){
	var sound = new Audio();
	sound.src = "resource/writing.wav";
	sound.type = "audio/wav";
	sound.preload = "true";
	sound.play();
}

function showIMBanner(){
	_imBanner.style.display = "block";
	window.setTimeout(hideIMBanner, 1500);
}

function hideIMBanner(){
	_imBanner.style.display = "none";
}

function showWinnerBanner(){
	_winnerBanner.style.display = "block";
}

function hideWinnerBanner(){
	_winnerBanner.style.display = "none";
}

window.onload = init;
window.setInterval(update, 100);
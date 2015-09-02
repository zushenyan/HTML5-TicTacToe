(function(window, TicTacToe){
	//game data
	var _bm = null,
			_lastTime = null,
			_animBoard = null;

	var _dict_turn = null,
			_dict_state = null;

	//UI variables
	var _canvas = null,
			_turnStatus = null,
			_newGameButton = null,
			_imBanner = null,
			_winnerBanner = null,
			_fpsMeter = null;

	//initialize things
	function init(){
		initAnimFrame();
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

	function initDict(){
		_dict_turn = [];
		_dict_state = [];

		_dict_turn[TicTacToe.Chess.FLAG_O] = "Player: O\'s turn";
		_dict_turn[TicTacToe.Chess.FLAG_X] = "Player: X\'s turn";

		_dict_state[TicTacToe.BoardManager.STATE_GOING] = "game is running";
		_dict_state[TicTacToe.BoardManager.STATE_O_WINS] = "O player wins";
		_dict_state[TicTacToe.BoardManager.STATE_X_WINS] = "X player wins";
		_dict_state[TicTacToe.BoardManager.STATE_EVEN] = "even";
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
		var elapsedTime = Date.now() - _lastTime;
		updateFPSMeter(elapsedTime);

		// update animations
		for(var i = 0; i < _animBoard.length; i++){
			for(var j = 0; j < _animBoard[i].length; j++){
				_animBoard[i][j].playAnimation(elapsedTime);
			}
		}

		_turnStatus.innerHTML = _dict_turn[_bm.getWhosTurn()];
		_winnerBanner.innerHTML = _dict_state[_bm.checkWinner()];

		if(_bm.checkWinner() !== TicTacToe.BoardManager.STATE_GOING){
			setBannerStyle(_winnerBanner, "showBanner");
		}

		draw();

		window.requestAnimationFrame(update);
		_lastTime = Date.now();
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
			if(e === TicTacToe.BoardManager.ERROR_INVALID_MOVEMENT){
				changeBannerStyleAfter(_imBanner, "showBanner", 1500, function(){ setBannerStyle(_imBanner, "hideBanner")});
			}
			else if(e === TicTacToe.BoardManager.ERROR_GAMEOVER){
				//do nothing
			}
			else{
				throw e;
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
		_bm = new TicTacToe.BoardManager();
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
				setAnimBoard(j, i, TicTacToe.Chess.FLAG_EMPTY);
			}
		};
	}

	function setAnimBoard(x, y, flag){
		var cellWidth = _canvas.width / 3;
		var cellHeight = _canvas.height / 3;

		if(flag === TicTacToe.Chess.FLAG_EMPTY){
			_animBoard[y][x] = TicTacToe.AnimationFactory.createChessEmpty(x * cellWidth, y * cellHeight);
		}
		else if(flag === TicTacToe.Chess.FLAG_X){
			_animBoard[y][x] = TicTacToe.AnimationFactory.createChessX(x * cellWidth, y * cellHeight);
		}
		else if(flag === TicTacToe.Chess.FLAG_O){
			_animBoard[y][x] = TicTacToe.AnimationFactory.createChessO(x * cellWidth, y * cellHeight);
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
		if(!TicTacToe.Resources.SOUND_WRITTING.paused){
			TicTacToe.Resources.SOUND_WRITTING.currentTime = 0;
			TicTacToe.Resources.SOUND_WRITTING.play();
		}
		else{
			TicTacToe.Resources.SOUND_WRITTING.play();
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

	window.onload = init;
})(
	((window !== "undefined") ? window : this),
	(TicTacToe ? TicTacToe : {})
	);

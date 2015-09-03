define(["require", "exports", "./Chess", "./Board"], function (require, exports, Chess_1, Board_1) {
    var BoardManager = (function () {
        function BoardManager() {
            this._board = new Board_1.Board();
            this.newGame();
        }
        Object.defineProperty(BoardManager, "STATE_GOING", {
            get: function () { return "0"; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(BoardManager, "STATE_O_WINS", {
            get: function () { return "1"; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(BoardManager, "STATE_X_WINS", {
            get: function () { return "2"; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(BoardManager, "STATE_EVEN", {
            get: function () { return "-1"; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(BoardManager, "ERROR_INVALID_MOVEMENT", {
            get: function () { return 0; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(BoardManager, "ERROR_GAMEOVER", {
            get: function () { return 1; },
            enumerable: true,
            configurable: true
        });
        ;
        BoardManager.prototype.newGame = function () {
            this._board.resetBoard();
            this.resetCounter();
            this.allowFlagPlacement();
        };
        ;
        BoardManager.prototype.turnCounter = function () { this._turn++; };
        ;
        BoardManager.prototype.getWhosTurn = function () { return (this._turn % 2) === 1 ? Chess_1.Chess.FLAG_O : Chess_1.Chess.FLAG_X; };
        ;
        BoardManager.prototype.getPreviousTurn = function () { return (this.getWhosTurn() === Chess_1.Chess.FLAG_O) ? Chess_1.Chess.FLAG_X : Chess_1.Chess.FLAG_O; };
        ;
        BoardManager.prototype.resetCounter = function () { this._turn = 0; };
        ;
        BoardManager.prototype.isGameOver = function () { return this._isGameover; };
        ;
        BoardManager.prototype.allowFlagPlacement = function () { this._isGameover = false; };
        ;
        BoardManager.prototype.forbitFlagPlacement = function () { this._isGameover = true; };
        ;
        BoardManager.prototype.placeFlag = function (x, y) {
            if (this.isGameOver()) {
                throw BoardManager.ERROR_GAMEOVER;
            }
            else if (this._board.getFlag(x, y) !== Chess_1.Chess.FLAG_EMPTY) {
                throw BoardManager.ERROR_INVALID_MOVEMENT;
            }
            this._board.placeFlag(x, y, this.getWhosTurn());
            this.turnCounter();
            return this.checkWinner();
        };
        ;
        BoardManager.prototype.getFlag = function (x, y) {
            return this._board.getFlag(x, y);
        };
        ;
        BoardManager.prototype.checkWinner = function () {
            var result = null, isFullBoard = false;
            var count = 0;
            for (var i = 0; i < this._board.getHeight(); i++) {
                for (var j = 0; j < this._board.getWidth(); j++) {
                    if (this._board.getFlag(j, i) == Chess_1.Chess.FLAG_EMPTY) {
                        count++;
                    }
                }
            }
            if (count == 0) {
                isFullBoard = true;
            }
            result =
                checkRowHelper([0, 0], [0, 1], [0, 2], this._board) ||
                    checkRowHelper([1, 0], [1, 1], [1, 2], this._board) ||
                    checkRowHelper([2, 0], [2, 1], [2, 2], this._board) ||
                    checkRowHelper([0, 0], [1, 0], [2, 0], this._board) ||
                    checkRowHelper([0, 1], [1, 1], [2, 1], this._board) ||
                    checkRowHelper([0, 2], [1, 2], [2, 2], this._board) ||
                    checkRowHelper([0, 0], [1, 1], [2, 2], this._board) ||
                    checkRowHelper([0, 2], [1, 1], [2, 0], this._board);
            if (result && result !== Chess_1.Chess.FLAG_EMPTY) {
                this.forbitFlagPlacement();
                return result === Chess_1.Chess.FLAG_O ? BoardManager.STATE_O_WINS : BoardManager.STATE_X_WINS;
            }
            else if (isFullBoard) {
                this.forbitFlagPlacement();
                return BoardManager.STATE_EVEN;
            }
            else {
                return BoardManager.STATE_GOING;
            }
            function checkRowHelper(chess1, chess2, chess3, board) {
                if ((board.getFlag(chess1[0], chess1[1]) == board.getFlag(chess2[0], chess2[1])) &&
                    (board.getFlag(chess1[0], chess1[1]) == board.getFlag(chess3[0], chess3[1]))) {
                    return board.getFlag(chess1[0], chess1[1]);
                }
                return null;
            }
        };
        ;
        BoardManager.prototype.printBoard = function () { this._board.printBoard(); };
        ;
        return BoardManager;
    })();
    exports.BoardManager = BoardManager;
});

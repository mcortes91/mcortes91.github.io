var ticTacToe;
var size = 3;
var row;
var firstPlayer;
var secondPlayer;
var currentPlayer;
var boxes = [];
var firstPlayerScore = 0;
var secondPlayerScore = 0;
var clickable = false;

var setCurrentPlayer = function () {
	var input = prompt('player, choose x or o: ').toUpperCase();
	if(input == 'X') {
		firstPlayer = 'X';
		secondPlayer = 'O';
	} else if( input == 'O') {
		firstPlayer = 'O';
		secondPlayer = 'X';
	} 
	currentPlayer = firstPlayer;
	clickable = true;
}

var makeGame = function() {
	ticTacToe = [];
	for (i = 0; i < size; i++) {
		row = [];
		for(j = 0; j < size; j++) {
			row.push(null);
		};
		ticTacToe.push(row);
	};
	 return ticTacToe;
};

var reset = function() {
	clickable = true;
	boxes = [];
	$('#game').html("");
	startGame();
}

var render = function() {
	var $game = $('<div>').attr('id', 'gameBoard');
	var $player1 = $('<div>').attr('id', 'player1');
	var $player2 = $('<div>').attr('id', 'player2');
	var $reset = $('<button>reset</button>').attr('id', 'reset');
	$reset.on('click', function() {
		reset();
	})
	$('#game').append($player1, $player2, $reset);
	var $ul = $('<ul>');
	for(i = 0; i < ticTacToe.length; i++) {
		var row = ticTacToe[i];
		for(j = 0; j < row.length; j++) {
			$li = $('<li>');
			boxes.push($li);
			$li.on('click', function (eventObject) {
				if(clickable){
					if($(this).text() == false){
						$(this).closest('li').addClass('xo').text(currentPlayer);
					} 
					changeTurn();
					determineWinner();
				}
			})
			$ul.append($li);
		};
	};
	$('#game').append($game);
	$game.append($ul);
	$('#player1').text('Player: ' + firstPlayerScore);
	$('#player2').text('Player: ' + secondPlayerScore);
};



var changeTurn = function(){
	if(currentPlayer == firstPlayer){
    	currentPlayer = secondPlayer ;
    } else if( currentPlayer == secondPlayer){
        currentPlayer = firstPlayer;
    }
}

var determineWinner = function() {
	if (playerWinner('X')) {
    	if(firstPlayer == 'X') {
    		alert('Player1 wins!');
    		firstPlayerScore++;
    	} else {
    		alert('Player2 wins!');
    		secondPlayerScore++;
    	} 
    	clickable = false;
  	} else if (playerWinner('O')) {
   		if(firstPlayer == 'O') {
    		alert('Player1 wins!');
    		firstPlayerScore++;
    	} else {
    		alert('Player2 wins!');
    		secondPlayerScore++;
    	}
    	clickable = false;
	}
	$('#player1').text('Player: ' + firstPlayerScore);
	$('#player2').text('Player: ' + secondPlayerScore);
  	return null;
}

var playerWinner = function(currentPlayer) {
	return winsRow(currentPlayer) || winsColumn(currentPlayer) || winsDiagonal(currentPlayer);
}

var winsRow = function(currentPlayer) {
	return allThree(currentPlayer, boxes[0].text(), boxes[1].text(), boxes[2].text()) ||
         allThree(currentPlayer, boxes[3].text(), boxes[4].text(), boxes[5].text()) ||
         allThree(currentPlayer, boxes[6].text(), boxes[7].text(), boxes[8].text());
}

var winsColumn = function(currentPlayer) {
  	return allThree(currentPlayer, boxes[0].text(), boxes[3].text(), boxes[6].text()) ||
         allThree(currentPlayer, boxes[1].text(), boxes[4].text(), boxes[7].text()) ||
         allThree(currentPlayer, boxes[2].text(), boxes[5].text(), boxes[8].text());
}

var winsDiagonal = function(currentPlayer) {
  	return allThree(currentPlayer, boxes[0].text(), boxes[4].text(), boxes[8].text()) ||
         allThree(currentPlayer, boxes[2].text(), boxes[4].text(), boxes[6].text());
}

var allThree = function(currentPlayer, cellOne, cellTwo, cellThree) {
  	return (cellOne === currentPlayer) && (cellTwo === currentPlayer) && (cellThree === currentPlayer);
}


var startGame = function () {
	makeGame();
	render();
}
startGame();

$(document).ready(function(){
  var $button = $('<button>Start</button>');
  $button.on('click', function(){
     setCurrentPlayer();
     this.remove();
  });
  $('#game').append($button);
});


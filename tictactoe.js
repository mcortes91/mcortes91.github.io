var ticTacToe;
var size = 3;
var row;
var firstPlayer;
var secondPlayer;
var currentPlayer;
var boxes = [];

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

var render = function() {
	var $game = $('<div>').attr('id', 'game');
	var $ul = $('<ul>');

	for(i = 0; i < ticTacToe.length; i++) {
		var row = ticTacToe[i];

		for(j = 0; j < row.length; j++) {
			$li = $('<li>');
			boxes.push($li);
			$li.on('click', function (eventObject) {
				if($(this).text() == false){
					$(this).closest('li').addClass('xo').text(currentPlayer);
				} else {
					eventObject.preventDefault();
				}
				changeTurn();
				determineWinner();
	})
				
			$ul.append($li);


		};
		
	};
	$('body').append($game);
	$game.append($ul);
};



function changeTurn(){
      if(currentPlayer == firstPlayer){
           currentPlayer = secondPlayer ;
      } else if( currentPlayer == secondPlayer){
           currentPlayer = firstPlayer;
      }

 }

// var determineWinner = function() {
// 	if(boxes[0].text() == boxes[1].text() && boxes[0].text() == boxes[2].text() && boxes[0].text() != 'O' && boxes[1].text() != 'O' && boxes[2].text() != 'O') {
// 		alert('winner!');
// 	} else if(boxes[3].text() == boxes[4].text() && boxes[3].text() == boxes[5].text() && boxes[3].text() != 'O' && boxes[4].text() != 'O' && boxes[5].text() != 'O') {
// 		alert('winner!');
// 	} else if(boxes[6].text() == boxes[7].text() && boxes[6].text() == boxes[8].text() && boxes[6].text() != 'O' && boxes[7].text() != 'O' && boxes[8].text() != 'O') {
// 		alert('winner!');
// 	}
// }

function determineWinner() {
	if (winnerIs('X')) {
    	if(firstPlayer == 'X') {
    		alert('Player1 wins!');
    	} else {
    		alert('Player2 wins!');
    	}
  	} else if (winnerIs('O')) {
   		if(firstPlayer == 'O') {
    		alert('Player1 wins!');
    	} else {
    		alert('Player2 wins!');
    	}
	}
  return null;
}

function winnerIs(currentPlayer) {
  return winsRow(currentPlayer) || winsColumn(currentPlayer) || winsDiagonal(currentPlayer);
}

function winsRow(currentPlayer) {
  return allThree(currentPlayer, boxes[0].text(), boxes[1].text(), boxes[2].text()) ||
         allThree(currentPlayer, boxes[3].text(), boxes[4].text(), boxes[5].text()) ||
         allThree(currentPlayer, boxes[6].text(), boxes[7].text(), boxes[8].text());
}

function winsColumn(currentPlayer) {
  return allThree(currentPlayer, boxes[0].text(), boxes[3].text(), boxes[6].text()) ||
         allThree(currentPlayer, boxes[1].text(), boxes[4].text(), boxes[7].text()) ||
         allThree(currentPlayer, boxes[2].text(), boxes[5].text(), boxes[8].text());
}

function winsDiagonal(currentPlayer) {
  return allThree(currentPlayer, boxes[0].text(), boxes[4].text(), boxes[8].text()) ||
         allThree(currentPlayer, boxes[2].text(), boxes[4].text(), boxes[6].text());
}

function allThree(currentPlayer, cellOne, cellTwo, cellThree) {
  return (cellOne === currentPlayer) && (cellTwo === currentPlayer) && (cellThree === currentPlayer);
}
var startGame = function () {
	makeGame();
	render();
	setCurrentPlayer();
}

startGame();
// JavaScript Document
// define variable
var player1 = 'X', player2 = 'O', count = 0, o_win = 0, x_win = 0, currentTurn=1, movesMade=0, dimension;

$(document).ready(function() {
  // prepare size of box
    dimension = prompt("Please enter dimension of box (3-5):", "3");
    while (dimension == null || dimension == "" || !$.isNumeric(dimension) || parseInt(dimension) < 3 || parseInt(dimension) > 5) {
      dimension = prompt("Please enter dimension of box (3-5):", "3");
    }

    dimension = parseInt(dimension);
  // do size tweak
  var new_span_size = 26+(100*(dimension-1));
  var new_reset_size = 204+(80*(dimension-3));
  $('.span3').css({'width':new_span_size});
  $('#reset').css({'width':new_reset_size});
  $('.input-holder').css({'width':(new_reset_size+22)});
  $('#tic-tac-toe').css({'width':(new_reset_size+22)});
  // add all boxs
  for (var i = 0; i < dimension*dimension; i++) {
    var new_btn = "<li class='btn span1'>+</li>";
    $('#game').append(new_btn);
  }

  // function for add mark
  $(".span1").click('click', (e) => {
      //this is keeping track of whose turn it is
      //if it's odd then it's player one's turn else player two's
      if(event.target.innerHTML == "+"){
        if (currentTurn % 2 === 1) {
            event.target.innerHTML = player1;
            event.target.style.color = "#EC434B";
            currentTurn++;
        } else {
            event.target.innerHTML = player2;
            event.target.style.color = "#FBCC09";
            currentTurn--;
        }
        movesMade++;
      }else alert("Already mark!");
      //populate boxs to array
      var moves = Array.prototype.slice.call($(".span1"));
      var results = moves.map(function(square) { return square.innerHTML; });
      //convert 1D array to 2D array
      var new_array = [];
      while(results.length) new_array.push(results.splice(0,dimension));
      //check for mark combo
      if(checkForAllDirection(new_array, event.target.innerHTML))
        declareWinner(event.target.innerHTML);
        
      if(movesMade==(dimension*dimension)){
        alert("It's tight");
        resetBoard();
      }
  });
    // function to do reset game score
      $("#reset").click(function () {
      resetBoard();
      resetScore();
    });
});

function resetScore(){
   o_win=0;
   x_win=0;
   $('#x_win').text(x_win);
   $('#o_win').text(o_win);
}

function resetBoard(){
  $("#game li").text("+");
  $("#game li").css({"color":"grey"});
  movesMade = 0;
}

function declareWinner(winner) {
  // update player score
      if(winner=="X"){
        x_win++;
        $('#x_win').text(x_win);
      }else{
        o_win++;
        $('#o_win').text(o_win);
      }
      alert(winner+' wins');
      resetBoard();
}

function checkForAllDirection(new_array, mark){
  //check for all posible mark combo
  var vertical_count = 0, horizontal_count = 0, right_to_left_count = 0, left_to_right_count = 0;

  for (var i = 0; i < dimension; i++) {
      vertical_count = 0;
      horizontal_count = 0;

      for (var j = 0; j < dimension; j++) {
        if(new_array[i][j] == mark)
          horizontal_count++;

        if(new_array[j][i] == mark)
          vertical_count++;
      }

      if(new_array[i][i] == mark)
        left_to_right_count++;

      if(new_array[(dimension-1-i)][i] == mark)
        right_to_left_count++;

      if (horizontal_count == dimension || vertical_count == dimension)
          return true;

      if (left_to_right_count == dimension || right_to_left_count == dimension)
          return true;
  }
  return false;
}

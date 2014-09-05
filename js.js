$( document ).ready(function() {
  run()
  bindListeners()
})

/// starts the game
function run() {
  my_game = new Game
  myView = new BoardView(15)
  my_controller = new Controller(myView, my_game)
  my_controller.makeBord()
}

// bindes the listener
function bindListeners(){
  document.addEventListener('keyup', function(event){
    if(event.keyCode === 80){
      var track = my_controller.track1
      my_controller.movePlayer(track)
    } else if(event.keyCode === 81){
      var track = my_controller.track2
      my_controller.movePlayer(track)
    }
  })
}

// contians game rules
function Game(){}

Game.prototype = {
  winner: function(track){
    var track = track.children()
    if(track[track.length-1].className === "active"){
      alert("we have a winner!")
      track[track.length-1].className = ""
      this.clearTrack()
      this.resetGame()
    }
  },
  clearTrack: function(){
    var active = $('.active')
    active.each(function() {
      $( this ).removeClass("active") ;
    });
  },
  resetGame: function(){
    $("#player1_strip").children().first().addClass('active')
    $("#player2_strip").children().first().addClass('active')
  }
}

// contians traks
function Track(table_class) {
  this.track = $(table_class)
}

//board view
function BoardView(length) {
  this.length = length
}

BoardView.prototype = {
  displayBoard: function(track){
    for (i = 0; i < this.length; i++) {
     track.children().parent().append("<td></td>");
   }
 },
 displayPlayer: function(track){
  var active = track.find('.active')
  var next = track.find('.active').next()
  active.removeClass("active")
  next.addClass("active")
}
}

/// controller
function Controller(view, game){
  this.game = game
  this.track1 = new Track("#player1_strip")
  this.track2 = new Track("#player2_strip")
  this.view = view
}

Controller.prototype = {
  makeBord: function(){
    var track_1 = this.track1.track
    var track_2 = this.track2.track
    this.view.displayBoard(track_1)
    this.view.displayBoard(track_2)
  },
  movePlayer: function(trackToGrab){
    var track = trackToGrab.track
    this.view.displayPlayer(track)
    this.game.winner(track)
  }
}


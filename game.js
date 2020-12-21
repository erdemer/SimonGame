//Initial Variables
var buttonColours = ['red', 'blue', 'green', 'yellow']
var gamePattern = []
var userClickedPattern = []

var level = 0
var tgl = false;


function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)
  level++
  $("#level-title").text("Level " + level)
  playSound(randomChosenColour)
    console.log("gamePattern: "+gamePattern);
}



$(document).keypress(function (event) {
  if(event.key == "A"){
    tgl = true;
  }
  if(tgl){
    $("#level-title").text("Level " + level)
    console.log(event.key)
    nextSequence()
  }
})


$(".btn").click(function(event) {
  userChosenColour = event.target.id
  //  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour)
  playSound(userChosenColour)
  animatePress(userChosenColour)
  console.log("userClickedPattern: "+userClickedPattern);
  checkAnswer(userClickedPattern.length-1)
})


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed")
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);

}
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
      userClickedPattern= []
      nextSequence()
    },1000)
  }
  } else {
    console.log("wrong");
    playSound("wrong")
    $("body").addClass("game-over")
    setTimeout(function(){
    $("body").removeClass("game-over")
  },200)
  $("#level-title").text("Game Over, Press Any Key to Restart")
  startOver()
  }
}

function startOver() {
  console.log("Start Over function works")
  level = 0
  gamePattern = []

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

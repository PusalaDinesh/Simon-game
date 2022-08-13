var userClickedPattern =[];
var gamePattern=[];
var colors = ["red","green","blue","yellow"];
var level=0;
var started = false;
$(document).keydown(function(){
  if(!started){
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    playSound("sounds/wrong.mp3");
    $("body").addClass("game-over");
    $("h1").text("Game Over.Press any key to restart")
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    startover();
  }
}

function nextSequence(){
userClickedPattern = [];
level++;
$("h1").text("Level "+level);
var randomNumber = Math.floor(Math.random()*4);

var randomChosenColor = colors[randomNumber];
gamePattern.push(randomChosenColor);
$("."+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound("sounds/"+randomChosenColor+".mp3");

}

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound("sounds/"+userChosenColor+".mp3");
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


function playSound(name){
  var audio=new Audio(name);
  audio.play();
}
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}


function startover(){
  level=0;
  started=false;
  gamePattern=[];
}

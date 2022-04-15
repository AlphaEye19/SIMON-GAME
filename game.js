var gamePattern=[];
var userClickedPattern=[];

var buttonColours=["red", "blue", "green", "yellow"];

var started=false;

var level=0;

function startOver(){
  level=0;
  started=false;
  gamePattern=[];

}

$(document).keypress(function(){
  $("#level-title").removeClass("blink");
if(!started)
{
  $("#level-title").css("color","#FFFDA2");
   $("#level-title").text('Level 1');
   setTimeout(function(){nextSequence();},1000);
   started=true;
}
});

$(".btn").click(function(){
  var userChosenColour=($(this).attr('id'));
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playsound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
  {
    console.log("success");
      if(userClickedPattern.length==gamePattern.length)
      {
         setTimeout(function(){nextSequence();},1000);
      }
  }
  else
  {
    $(document.body).css("background-image","none");

    $(document.body).addClass("game-over");

    setTimeout(function () {
    $(document.body).removeClass("game-over");}, 1000) ;

    $(document.body).css("background-image","url(bkg.jpg)");

    setTimeout(function () {
    $(document.body).css("background-image","url(bkg1.jpg)");}, 1000) ;

    $("#level-title").text('Game over,Press any key to Restart').css("color","#B20600");

    var audio = new Audio("wrong.mp3");
    audio.play();

    $("#level-title").addClass("blink");

    startOver();
  }
  }


function nextSequence(){
  userClickedPattern=[];
  level++;
   $("#level-title").text('Level ' + level);
  var randomNumber=(Math.floor(Math.random()*4));
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $( "#"+randomChosenColour ).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);

}


function playsound(name){
  var audio = new Audio(name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $('#'+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");}, 100) ;
}

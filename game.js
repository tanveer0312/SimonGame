var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;



$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});


$(document).on("keypress", function(){
    if(gameStarted === false){
        nextSequence();
    }
    gameStarted = true;
});

function nextSequence(){
    
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    if(gameStarted === true){
        level++;
    }
    $("#level-title").html("Level " + level)
    
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed")

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
      }, 100);
}

function reload (){
    location.reload();
} 

function checkAnswer(currentLevel){
  
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){   // checkAnswer(userClickedPattern.length-1);
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
           setTimeout(nextSequence, 1000);
            userClickedPattern =[];
        }
        
    }else{
        $("#level-title").text("Game Over, Press any key to restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        gameStarted = false;
        level = 0;
        userClickedPattern=[];
        gamePattern=[];
    }
}































const buttonColours = ["red", "blue", "green", "yellow"];

const gamePattern = [];
const userClickedPattern=[];

const level=0;
const started=false;

$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    const userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
    {
        if(userClickedPattern.length==gamePattern.length)
        {
            setTimeout(function() {
                nextSequence();
                
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function()  {
            $("body").removeClass("game-over");
            
        }, 200);
            startOver();
    }
}


function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
   
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
 
}

function animatePress( currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}



function playSound(name)
{
    const audio = new Audio("sounds/" + name + ".mp3");
     audio.play();
}



function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}
var buttonColor=["red","blue","green","yellow"]
var gamePattern=[]
var userClickedPattern=[]
var started=false
var level=0
$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("level "+level)
        nextSequence();
        started=true
    }
})
$("#level-title").click(function(){
    if (!started) {
        $("#level-title").text("level "+level)
        nextSequence();
        started=true
    }
})

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern)
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
})

function startOver(){
    level=0
    gamePattern=[]
    started=false
}

function checkAnswer(currentlevel){
    if (gamePattern[currentlevel]===userClickedPattern[currentlevel]) {
        console.log("success")
        if (userClickedPattern.length===gamePattern.length) {
            setTimeout(nextSequence(),1000) 
        }
    }
    else{
        console.log("wrong")
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver()
    }
    
}


function nextSequence() {
    userClickedPattern=[]
    level++
    $("#level-title").text("level "+level)

    var randomNumber=Math.floor(Math.random()*3)
    var randomChosenColor=buttonColor[randomNumber];
    gamePattern.push(randomChosenColor)
    console.log(gamePattern)
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColor)
}

function playSound(name){
    $("#"+name).fadeIn(100).fadeOut(100).fadeIn(100)
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    },100)
}

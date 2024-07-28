var level = 1;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(document).on("keypress", function() {
    $("body").removeClass("game-over");
    if (level === 1) {
        nextSequence();
    }
});

function nextSequence() {
    userClickedPattern = [];
    $(".level-title").text("Level " + level);

    for (let i = 0; i < level; i++) {
        let r = Math.floor(Math.random() * 4); 
        let chosenColour = buttonColours[r];
        gamePattern.push(chosenColour);

        setTimeout(function() {
            $("." + chosenColour).addClass("pressed");
            playSound(chosenColour);

            setTimeout(function() {
                $("." + chosenColour).removeClass("pressed");
            }, 250);
        }, 500 * i);
    }
}

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                level++;
                gamePattern = [];
                nextSequence();
            }, 1000);
        }
    } else {
        $(".level-title").text("Game Over, Press Any Key to Restart");
        level = 1;
        gamePattern = [];
        playSound("wrong")
        $("body").addClass("game-over");
    }
}

function playSound(name) {
    var audio = new Audio("/sounds/"+name + ".mp3");
    audio.play();
}

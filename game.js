var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function playSound(color) {
  var redSound = new Audio("sounds/red.mp3");
  var blueSound = new Audio("sounds/blue.mp3");
  var greenSound = new Audio("sounds/green.mp3");
  var yellowSound = new Audio("sounds/yellow.mp3");
  var wrong = new Audio("sounds/wrong.mp3");

  switch (color) {
    case "red":
      redSound.play();
      break;
    case "blue":
      blueSound.play();
      break;
    case "green":
      greenSound.play();
      break;
    case "yellow":
      yellowSound.play();
      break;
    case "wrong":
      wrong.play();
      break;

    default:
      break;
  }
}

function animatePress(color) {
  $("." + color).addClass("pressed");
  setTimeout(() => {
    $("." + color).removeClass("pressed");
  }, 100);
}

$(".btn").on("click", function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAns(userClickedPattern.length - 1);
  console.log(userClickedPattern);
});

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("." + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);

  console.log(gamePattern);
  level++;
  $("h1").text("level " + level);
}

$(document).on("keydown", function () {
  while (level < 1) {
    nextSequence();
  }
});

function startOver() {
    level = 0;
    gamePattern = [];
}

function checkAns(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 300);
    $("h1").text("Game over! Press any key to restart!");
    startOver();
    console.log("wrong");
  }
}

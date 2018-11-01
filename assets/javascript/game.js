var selectableWords =           
    [
        "EMMA",
        "BRANDI",
        "KAREN",
        "LANA",
        "TODD",
        "GARY",
        "JAMES",
        "CHRIS",
        "SHANNA",
        "JULIE",
        "AMANDA",
        "ANNA",
        "COLE",
        "CHRISTINE",
        "DESTINY",
        "JACKIE",
        "STACY",
        "KENDRA",
        "AARON",
        "MICHAEL",
        "JARED",
    ];

const maxTries = 10;            

var guessedLetters = [];        
var currentWordIndex;           
var guessingWord = [];          
var remainingGuesses = 0;       
var hasFinished = false;        
var wins = 0;                   

function resetGame() {
    remainingGuesses = maxTries;
    currentWordIndex = Math.floor(Math.random()*(selectableWords.length));
    guessedLetters = [];
    guessingWord = [];
    //document.getElementById(hangmanImage).src ="assets/images/peace.jpg";

for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }   
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";
    updateDisplay();
    };


function updateDisplay() {
    document.getElementById("totalWins").innerText = wins;
    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};

function updateHangmanImage() {
    document.getElementById("hangmanImage").src = "assets/images/peace" + (maxTries - remainingGuesses) + ".jpg";
};

function evaluateGuess(letter) {
    var positions = [];
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if(selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }
    if (positions.length <= 0) {
        remainingGuesses--;
        //updateHangmanImage();
    } else {
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        //winSound.play();
        hasFinished = true;
    }
};



function checkLoss()
{
    if(remainingGuesses <= 0) {
        //loseSound.play();
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        hasFinished = true;
    }
}


function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
};



document.onkeydown = function(event) {
    
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
       if(event.keyCode >= 65 && event.keyCode <= 90) {
            //keySound.play();
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};
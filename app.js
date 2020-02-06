//Game values
let min = 1, 
    max = 10,
    winningNum =  getRandomNum(min,max),
    guessesLeft = 3;

//UI Elements
const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');
      
//Assign UI min/max
minNum.textContent = min;
maxNum.textContent = max;

//Play again listener
game.addEventListener('mousedown',function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

//Listen for guess
guessBtn.addEventListener('click',function(){
    let guess = parseInt(guessInput.value);

    //validation
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        
    }

    //Check if correct guess
     else if(guess === winningNum){
        //game won
       gameOver(true, `${winningNum} is correct! Well done!`);
    }else{
        //wrong number
        guessesLeft -=1;
        if(guessesLeft === 0){
            //game over
            gameOver(false,`Game over! ${winningNum} was the correct number `);        
        }else{
            //continue guessing
            setMessage(`Incorrect. You have ${guessesLeft} guesses left`, 'red');
            //Change border
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
        }
    }
})

//Game over
function gameOver(won, msg){
    let color;
    won === true ? color ='green' : color = 'red'; 
     //Disable Input
     guessInput.disabled = true;
     //Change border
     guessInput.style.borderColor = 'color';
     //set text color
     message.style.color = color;
     //Msg
     setMessage(msg);

     //Play again
     guessBtn.value = 'Play Again';
     guessBtn.className += 'play-again';

}

//Get winning number
function getRandomNum(min,max){
   return Math.floor(Math.random()*(max-min+1)+1);
}

//Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}


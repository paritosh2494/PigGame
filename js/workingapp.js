//Initialize a game

var scores, roundScores, activePlayer, gamePlaying ,diceDOM ,prevDice;
init();

document.querySelector('.btn-roll').addEventListener('click', function (){
    if(gamePlaying){
        winningScoreText();
        var dice;
        //1.Random Number

        dice = Math.floor(Math.random()*6)+1;
        console.log('CurrentDice:'+dice);
        //2.Display the result

        diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'image/dice-' + dice +'.png';
        document.querySelector('#current-'+ activePlayer).textContent = dice;
        //3.Update the round score if the rolled number was not 1
        /* Challenge 1 */
        if (dice === 6 && prevDice === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#current-' + activePlayer).textContent = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();  
        } /* Challenge 1 */
        else if(dice !== 1) {
            roundScores += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        } else {
            nextPlayer();    
        }
        if(dice == prevDice == 6){
            prevDice = 1;
        } else {
            prevDice = dice;   
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function (){
    if(gamePlaying){
        //1.Save Score
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'none';   
        scores[activePlayer] += roundScores;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        roundScores = 0;
        var winningScore;

        var input = document.querySelector('.final-score').value;
        if(input){
            winningScore = input;
            document.querySelector('.final-score').disabled = true;
        } else {
            winningScore = 100;
            document.querySelector('.final-score').value = 100;
            document.querySelector('.final-score').disabled = true;
        }

        //check if player won
        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-'+ activePlayer).textContent = 'Winner!';
            diceDOM.style.display = 'none';
            document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //3.Next Player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    roundScores = 0;
    document.querySelector('#current-' + activePlayer).textContent = 0;
    document.querySelector('.player-'+ activePlayer + '-panel').classList.toggle('active');
    activePlayer = activePlayer === 1 ? 0 : 1;
    document.querySelector('.player-'+ activePlayer + '-panel').classList.toggle('active');
    document.querySelector('#current-' + activePlayer).textContent = 0;
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScores = 0;
    gamePlaying = true;
    prevDice = 0;
    diceDOM = document.querySelector('.dice');
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.final-score').value = null;
    document.querySelector('.final-score').disabled = false;
}
function winningScoreText() {
    var input = document.querySelector('.final-score').value;
    if(input){
        winningScore = input;
        document.querySelector('.final-score').disabled = true;
    } else {
        winningScore = 100;
        document.querySelector('.final-score').value = 100;
        document.querySelector('.final-score').disabled = true;
    }
}
document.querySelector('.btn-rules-info').addEventListener('click',function() {
    document.querySelector('.wrapper').style.display = 'none';
    document.querySelector('.rules').style.display = 'block';
});
document.querySelector('.close-rules').addEventListener('click',function() {
    document.querySelector('.wrapper').style.display = 'block';
    document.querySelector('.rules').style.display = 'none';
});


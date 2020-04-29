//Initialize a game
var scores, roundScores, activePlayer, gamePlaying;
init();

document.querySelector('.btn-roll').addEventListener('click', function (){
    if(gamePlaying){
        var dice ,diceDOM;
        //1.Random Number

        dice = Math.floor(Math.random()*6)+1;
        console.log(dice);
        //2.Display the result

        diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'image/dice-' + dice +'.png';
        document.querySelector('#current-'+ activePlayer).textContent = dice;
        //3.Update the round score if the rolled number was not 1

        if(dice !== 1){
            roundScores += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;
        } else {
            nextPlayer();
            roundScores = 0;
            diceDOM.style.display = 'none';        
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

        //check if player won
        if(scores[activePlayer] >= 20){
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
}

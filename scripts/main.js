window.onload = function() {
    let mortalKombat = document.getElementById("mortalKombat");
    mortalKombat.play();
    mortalKombat.muted = true;
}

volumeButton = document.querySelector('i');
volumeButton.addEventListener('click', (e) => {
	if(e.target.classList[1] === 'fa-volume-off'){
	volumeButton.classList.replace('fa-volume-off', 'fa-volume-up');
	mortalKombat.muted = false;
	}else {
	volumeButton.classList.replace('fa-volume-up', 'fa-volume-off');
	mortalKombat.muted = true;
	};
})



let playerScore, computerScore, selectedFighter

function selectFighter(){
	selectedFighter = this.parentElement;
	selectedFighter.classList.add('chosen');
	let allFighters = document.querySelectorAll('#choose');
	//run through all fighters on the selection screen and remove the ones not selected
	allFighters.forEach((fighter) => {
		if(fighter.classList[0] !== selectedFighter.classList[0]){
			fighter.classList.add('notChosen');
		}
	});
	//remove character selection effects from chosen fighter, rmv buttons and opacity
	selectedFighter.id = 'choose_disabled'
	let selectedFighterEffects = selectedFighter.childNodes;
	selectedFighterEffects.forEach((effect) => {
		if(effect.classList){
			effect.classList.add('notChosen')
		}
	})
	//set up fight page
	wrapper = document.querySelector('.wrapper');
	wrapper.id = 'fight';
	bear = document.querySelector('.bear');
	bear.classList.remove('notChosen');
	playerSelectionBox = document.querySelector('.playerSelection');
	playerSelectionBox.classList.remove('notChosen');
	computerSelectionBox = document.querySelector('.computerSelection');
	computerSelectionBox.classList.remove('notChosen');
	choices = document.querySelector('#choices');
	choices.classList.remove('notChosen');
	let bearRoar = document.querySelector('#bearRoar');
	mortalKombat.pause();
	bearRoar.play();
	bearRoar.onended = () => mortalKombat.play();
	selectedFighter.addEventListener('transitionend',  (e)=>{
		if(e.propertyName === 'transform' && wrapper.id === 'fight'){
			alert(`OH MY GOD! It's a FUCKING BEAR!`);
		}	
	} );
	//reset scores
	playerScore = 0, computerScore = 0;
}

let charSelectButtons = document.querySelectorAll('#choose button');
charSelectButtons.forEach((button) => {
	button.addEventListener('click', selectFighter);
})


let rock = document.querySelector('.rock');
rock.addEventListener('click', () => {
	playRound('rock')
});
let paper = document.querySelector('.paper');
paper.addEventListener('click', () => {
	playRound('paper')
});
let scissors = document.querySelector('.scissors');
scissors.addEventListener('click', () => {
	playRound('scissors')
});


/*ROCK PAPER SCISSOR GAME */
function computerPlay(){
	let choiceList = ['rock', 'paper', 'scissors'];
	let choiceSelected = Math.floor(Math.random() * 3);
	return choiceList[choiceSelected];
}
function playRound(playerSelection){
	playerSelectionBox.style.backgroundImage = `url('../media/player${playerSelection}.png')`
	computerSelection = computerPlay();
	computerSelectionBox.style.backgroundImage = `url('../media/computer${computerSelection}.png')`
	let winner = getWinner(playerSelection, computerSelection);
	getScore(winner);
}

function getWinner(playerSelection, computerSelection){
	if(playerSelection == computerSelection){
		return 'draw';
	} else if (playerSelection == 'rock') {
		switch (computerSelection){
			case 'scissors':
				return 'player'
			case 'paper':
				return 'computer'
		}
	} else if (playerSelection == 'paper') {
		switch (computerSelection){
			case 'rock':
				return 'player'
			case 'scissors':
				return 'computer'
		}
	} else if (playerSelection == 'scissors') {
		switch (computerSelection){
			case 'paper':
				return 'player'
			case 'rock':
				return 'computer'
		}
	}
}

function getScore(winner){
	if (winner === 'player') {
		playerScore++
		if (playerScore > 1) {
		alert(`You've slayed the beast.`);
		//game end reset scores
		playerScore = 0
		computerScore = 0
		} else {
		alert('That bear is feeling it now! Attack again!');
		}
	} else if(winner === 'computer'){
		computerScore++
		if(computerScore > 1) {
		alert(`You've been slain.`);
		//game end reset scores
		playerScore = 0;
		computerScore = 0
		} else {
		alert('That bear just fucked your shit up. No matter! Attack again!');
		}
	} else if(winner === 'draw') {
		alert('Your attacks were of equal strength. Charge the beast again!');
	}
}

// go back to char selection menu

let backButton = document.querySelector('.backToCharSelect');
backButton.addEventListener('click', setUpCharSelectMenu)

function setUpCharSelectMenu() {
	//fuck my life....
	//add character selection effects from chosen fighter, add buttons and opacity
	selectedFighter.id = 'choose'
	let selectedFighterEffects = selectedFighter.childNodes;
	selectedFighterEffects.forEach((effect) => {
		if(effect.classList){
			effect.classList.remove('notChosen');
		}
	})
	//run through all fighters on the selection screen and add the ones not selected
	let allFighters = document.querySelectorAll('#choose');
	allFighters.forEach((fighter) => {
			fighter.classList.remove('notChosen', 'chosen');
	});
	//set up char select page
	wrapper = document.querySelector('.wrapper');
	wrapper.id = '';
	bear = document.querySelector('.bear');
	bear.classList.add('notChosen');
	playerSelectionBox = document.querySelector('.playerSelection');
	playerSelectionBox.classList.add('notChosen');
	computerSelectionBox = document.querySelector('.computerSelection');
	computerSelectionBox.classList.add('notChosen');
	choices = document.querySelector('#choices');
	choices.classList.add('notChosen');
}
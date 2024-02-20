var scores, roundScore, activePlayer, prevDiceRoll, gamePlaying;

init();

// Ajout Event Listener au bouton qui fait rouler les dés
document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {
// Créer deux nombres aléatoires pour les dés
      var dice1 = Math.floor(Math.random() * 6) + 1;
      

    document.getElementById('dice1').style.display = 'block';
    document.getElementById('dice1').src = 'images/dice-' + dice1 + '.png';
    
// Vérifier si le joueur obtient un 6 deux fois de suite
      if(dice1 === 6 && prevDiceRoll === 6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer();
    // Mettre à jour le score du tour si le nombre obtenu n'était pas un 1
    } else if (dice1 !== 1) {
        // Ajoutez un score si le nombre de dés est différent de 1
        roundScore += dice1;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        
        nextPlayer();
    }

    // Sauvegarde du lancer de dés précédent sur une variable
    prevDiceRoll = dice1;
  }
});

// Accumuler des points ('hold')
document.querySelector('.btn-hold').addEventListener('click', function () {

  if (gamePlaying) {

    // Ajout du score actuel au score global
    scores[activePlayer] += roundScore;

    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Enregistrement de l'entrée du score final dans une variable
    var input = document.getElementById('winningScore').value;
    var winningScore;

    if(input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Vérifier si le joueur a gagné la partie
    if (scores[activePlayer] >= winningScore) {
    
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

      // Cacher les dés
      document.getElementById('dice1').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

      gamePlaying = false;

    } else {
      // Si le joueur gagne la partie, c'est au tour du joueur suivant
      nextPlayer();
    }
  }
});

//Redémarrer le jeu  
document.querySelector('.btn-new').addEventListener('click', init);

function init() {

  gamePlaying = true;

  // Remettre les deux scores à 0
  scores = [0, 0];

  activePlayer = 0;

  roundScore = 0;

  // Cacher les dés
  document.getElementById('dice1').style.display = 'none';
  

  // Réglage des scores à 0 par défaut 
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // Suppression du "statut de gagnant" du joueur gagnant
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  //  Le "statut actif" du "Joueur 2" est supprimé et attribué au "Joueur 1" 
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {

  // C'est au tour du joueur suivant si le nombre de dés est 1 (en utilisant l'opérateur ternaire)
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  //Ajout de la classe active au joueur qui a le tour maintenant
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // Cacher les dés
  document.getElementById('dice1').style.display = 'none';
}
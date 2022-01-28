window.addEventListener('DOMContentLoaded', function () {
  // Execute after page load

  //
  //DOM elements
  //
  const dealBtn = document.querySelector(".deal-button");
  const hitBtn = document.getElementById("hit-button");
  const message = document.getElementById("messages");
  const standBtn = document.getElementById("stand-button");
  const resetBtn = document.getElementById("reset-button");
  const playerHand = document.getElementById("player-hand");
  const dealerHand = document.getElementById("dealer-hand");
  const playersPoints = document.getElementById("player-points");
  const dealersPoints = document.getElementById("dealer-points")
  const cardImg = document.createElement("img"); 

  let deck = [];
  let dealerCurrentHand = [];
  let playerCurrentHand = [];
  let playerPoints = 0;
  let dealerPoints = 0;
  //
  //creates an ordered deck of cards in the deck array
  //
  let buildDeck = () => {
    for (let i = 1; i <= 13; i++) {
      deck.push({ rank: i, suit: 'hearts' })
      deck.push({ rank: i, suit: 'spades' })
      deck.push({ rank: i, suit: 'diamonds' })
      deck.push({ rank: i, suit: 'clubs' })
    }
  }
  buildDeck();

  //
  //functions
  //
  let randomInt = (max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(1) + 1)) + 1;
  let getCard = (hand) => hand.push(deck[randomInt(deck.length)]);
  
  
  
  

  //
  // takes a card object and returns the corresponding image
  //
  let getCardImage = (card) => {
    let cardRank = card.rank;
    let cardSuit = card.suit;
    let newElement = document.createElement("img");

    switch (card.rank) {
      case 1: cardRank = 'ace'; break;

      case 11: cardRank = 'jack'; break;

      case 12: cardRank = 'queen'; break;

      case 13: cardRank = 'king'; break;
    }

    newElement.src = `images/${cardRank}_of_${cardSuit}.png`;
    return newElement;
  }

  //
  //calculates the points for each hand
  //
  let calculatePlayerPoints = (currentHand) => {
    let points = 0;

    for (let i = 0; i < currentHand.length; i++) {
      let currentRank = currentHand[i].rank;
      switch (currentRank) {
        case 11: currentRank = 10; break;
        case 12: currentRank = 10; break;
        case 13: currentRank = 10; break;
      }
      if (currentRank == 1) {
        if ((playersPoints.innerHTML + 11) > 21) {
          currentRank = 1;
        }
        else {
          currentRank = 11;
        }
      }
      points += currentRank;
    }
    return points;
  }

  let calculateDealerPoints = (currentHand) => {
    let points = 0;

    for (let i = 0; i < currentHand.length; i++) {
      let currentRank = currentHand[i].rank;
      switch (currentRank) {
        case 11: currentRank = 10; break;
        case 12: currentRank = 10; break;
        case 13: currentRank = 10; break;
      }
      if (currentRank == 1) {
        if ((dealersPoints.innerHTML + 11) > 21) {
          currentRank = 1;
        }
        else {
          currentRank = 11;
        }
      }
      points += currentRank;
    }
    return points;
  }



  //
  // deals starting hands when 'deal' button is clicked
  //
  dealBtn.addEventListener('click', e => {
    if (playerCurrentHand.length >= 2) {
      alert("Cannot deal more than once per game");
    }
    else {
      getCard(playerCurrentHand)
      playerHand.appendChild(getCardImage(playerCurrentHand[playerCurrentHand.length - 1]))

      getCard(dealerCurrentHand)
      dealerHand.appendChild(getCardImage(dealerCurrentHand[dealerCurrentHand.length - 1]))

      getCard(playerCurrentHand)
      playerHand.appendChild(getCardImage(playerCurrentHand[playerCurrentHand.length - 1]))

      getCard(dealerCurrentHand)
      dealerHand.appendChild(getCardImage(dealerCurrentHand[dealerCurrentHand.length - 1]))

      dealersPoints.innerHTML=(calculateDealerPoints(dealerCurrentHand));

      playersPoints.innerHTML=(calculatePlayerPoints(playerCurrentHand));
    }
  });


  //
  // adds a card to the player's hand when 'hit' button is clicked
  //
  hitBtn.addEventListener('click', e => {
    if (playerCurrentHand.length < 2) {
      alert("Cannot hit before using deal")
    }
    else if (playerCurrentHand.length == 9) {
      alert("Cannot hit more than 7 times")
    }
    else if (calculatePlayerPoints(playerCurrentHand) > 21) {
      alert('Cannot hit after busting ')
    }
    else {
      getCard(playerCurrentHand)
      playerHand.appendChild(getCardImage(playerCurrentHand[playerCurrentHand.length - 1]));

      playersPoints.innerHTML=(calculatePlayerPoints(playerCurrentHand)); 
    }

    if (calculatePlayerPoints(playerCurrentHand) > 21) {
      message.innerHTML="You Busted"
    }
  })

  //
  //deals cards to the dealer after stand button is clicked
  //
  standBtn.addEventListener('click', e => {

    if (calculatePlayerPoints(playerCurrentHand) > 21) {
      alert("Cannot Stand after busting")
    }

    while (dealersPoints.innerHTML<17) {
      getCard(dealerCurrentHand)
      dealerHand.appendChild(getCardImage(dealerCurrentHand[dealerCurrentHand.length - 1]))
      dealersPoints.innerHTML=(calculateDealerPoints(dealerCurrentHand));
    }

    if (calculateDealerPoints(dealerCurrentHand) > 21) {
      message.innerHTML="Dealer Busted You Win!"
    }
    else if (calculateDealerPoints(dealerCurrentHand) > calculatePlayerPoints(playerCurrentHand)) {
      message.innerHTML="You Lose"
    }
    else if (calculateDealerPoints(dealerCurrentHand) < calculatePlayerPoints(playerCurrentHand)) {
      message.innerHTML="You Win"
    }
  })

  resetBtn.addEventListener('click', e => {
    playerCurrentHand=[];
    dealerCurrentHand=[];
    dealerHand.innerHTML="";
    playerHand.innerHTML="";
    dealersPoints.innerHTML="";
    playersPoints.innerHTML="";
    message.innerHTML="";
    
  })
})

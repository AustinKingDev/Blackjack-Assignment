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


  class Hand {
    constructor() {
      this.hand = [];
    }

    addCard(card) {
      this.hand.push(card);
    }

    getPoints() {
      let points = 0;

      this.hand.forEach(card => {
        let currentRank = card.rank;

        switch (currentRank) {
          case "ace": currentRank = 10; break;
          case "jack": currentRank = 10; break;
          case "queen": currentRank = 10; break;
          case "king": currentRank = 10; break;
          default:
        }
        points += currentRank;
      }
      )
      return points;
    }
  }

  class Card {
    constructor(rank, suit) {
      this.rank = rank;
      this.suit = suit;
      this.image = new Image;

      switch (this.rank) {
        case 1: this.rank = "ace"; break;
        case 11: this.rank = "jack"; break;
        case 12: this.rank = "queen"; break;
        case 13: this.rank = "king"; break;
        default:
      }
      this.image.src = `images/${this.rank}_of_${this.suit}.png`
    }


    getImageUrl() {
      return this.image.src;
    }
  }

  class Deck {
    constructor() {
      this.deck = this.createDeck();
    }

    createDeck() {
      this.deck = [];

      for (let i = 1; i <= 13; i++) {
        this.deck.push(new Card(i, 'hearts'));
        this.deck.push(new Card(i, 'spades'));
        this.deck.push(new Card(i, 'diamonds'));
        this.deck.push(new Card(i, 'clubs'));
      }
      return this.deck;
    }

    shuffle() {
      let currentIndex = this.deck.length,
        randomIndex;

      while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [this.deck[currentIndex], this.deck[randomIndex]] = [
          this.deck[randomIndex],
          this.deck[currentIndex],
        ];
      }
      return this.deck;
    }
    draw() {
      return this.deck.pop();
    }

    numCardsLeft() {
      return this.deck.length;
    }

  }

  let deck = new Deck();
  console.log(deck)
  deck.shuffle();
  let dealerCurrentHand = new Hand;
  let playerCurrentHand = new Hand;
  let playerPoints = 0;
  let dealerPoints = 0;
  //
  //creates an ordered deck of cards in the deck array
  //
  // let buildDeck = () => {
  //   for (let i = 1; i <= 13; i++) {
  //     deck.push({ rank: i, suit: 'hearts' })
  //     deck.push({ rank: i, suit: 'spades' })
  //     deck.push({ rank: i, suit: 'diamonds' })
  //     deck.push({ rank: i, suit: 'clubs' })
  //   }
  // }
  // buildDeck();


  //
  //functions
  //






  //
  // takes a card object and returns the corresponding image
  //
  // let getCardImage = (card) => {
  //   let cardRank = card.rank;
  //   let cardSuit = card.suit;
  //   let newElement = document.createElement("img");

  //   switch (card.rank) {
  //     case 1: cardRank = 'ace'; break;

  //     case 11: cardRank = 'jack'; break;

  //     case 12: cardRank = 'queen'; break;

  //     case 13: cardRank = 'king'; break;
  //   }

  //   newElement.src = `images/${cardRank}_of_${cardSuit}.png`;
  //   return newElement;
  // }

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
    if (playerCurrentHand.hand.length >= 2) {
      alert("Cannot deal more than once per game");
    }
    else {
      playerCurrentHand.addCard(deck.draw());
      playerHand.append(playerCurrentHand.hand[playerCurrentHand.hand.length - 1].image);

      dealerCurrentHand.addCard(deck.draw());
      dealerHand.append(dealerCurrentHand.hand[dealerCurrentHand.hand.length -1].image);

      playerCurrentHand.addCard(deck.draw());
      playerHand.append(playerCurrentHand.hand[playerCurrentHand.hand.length - 1].image);

      dealerCurrentHand.addCard(deck.draw());
      dealerHand.append(dealerCurrentHand.hand[dealerCurrentHand.hand.length -1].image);

      dealersPoints.innerHTML = (dealerCurrentHand.getPoints());

      playersPoints.innerHTML = (playerCurrentHand.getPoints());
    }
  });


  //
  // adds a card to the player's hand when 'hit' button is clicked
  //
  hitBtn.addEventListener('click', e => {
    if (playerCurrentHand.hand.length < 2) {
      alert("Cannot hit before using deal")
    }
    else if (playerCurrentHand.hand.length == 9) {
      alert("Cannot hit more than 7 times")
    }
    else if (playerCurrentHand.getPoints() > 21) {
      alert('Cannot hit after busting ')
    }
    else {
      playerCurrentHand.addCard(deck.draw());
      playerHand.append(playerCurrentHand.hand[playerCurrentHand.hand.length - 1].image);

      playersPoints.innerHTML = (playerCurrentHand.getPoints());
    }

    if (calculatePlayerPoints(playerCurrentHand) > 21) {
      message.innerHTML = "You Busted"
    }
  })

  //
  //deals cards to the dealer after stand button is clicked
  //
  standBtn.addEventListener('click', e => {

    if (playerCurrentHand.getPoints() > 21) {
      alert("Cannot Stand after busting")
    }

    while (dealersPoints.innerHTML < 17) {
      dealerCurrentHand.addCard(deck.draw());
      dealerHand.append(dealerCurrentHand.hand[dealerCurrentHand.hand.length -1].image);
      dealersPoints.innerHTML = (dealerCurrentHand.getPoints());
    }

    if (dealerCurrentHand.getPoints() > 21) {
      message.innerHTML = "Dealer Busted You Win!"
    }
    else if (dealerCurrentHand.getPoints() > playerCurrentHand.getPoints()) {
      message.innerHTML = "You Lose"
    }
    else if (dealerCurrentHand.getPoints() < playerCurrentHand.getPoints()) {
      message.innerHTML = "You Win"
    }
  })

  resetBtn.addEventListener('click', e => {
    deck = new Deck();
    playerCurrentHand = new Hand;
    dealerCurrentHand = new Hand;
    dealerHand.innerHTML = "";
    playerHand.innerHTML = "";
    dealersPoints.innerHTML = "";
    playersPoints.innerHTML = "";
    message.innerHTML = "";

  })
})

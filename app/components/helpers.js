var Helpers = {
  getDecks: function() {
    return JSON.parse(localStorage.getItem("decks"));
  },

  setDecks: function(decks) {
    decks.forEach(function(deck) {
      deck.cards.sort(this.compare);
    }.bind(this));

    localStorage.setItem("decks", JSON.stringify(decks));
  },

  orderDeck: function(deck) {
    return deck.cards.sort(this.compare);
  },

  compare: function(cardA, cardB) {
    if (parseInt(cardA.position) < parseInt(cardB.position)) {
      return -1;
    } else if (parseInt(cardA.position) > parseInt(cardB.position)) {
      return 1;
    } else {
      return 0;
    }
  },

  getDeck: function(deckId) {
    return this.getDecks()
               .filter(function(deck) { return ((deck.id + "") === (deckId + "")); })[0];
  },

  removeDeck: function(deck) {
    return _.reject(this.getDecks(), function(el) { return el.id === deck.id; });
  },

  removeCard: function(deck, cardId) {
    return _.reject(deck.cards, function(el) { return el.id === cardId; });
  },

  createLSCard: function(deck) {
    var decks = this.getDecks();
    decks = _.reject(decks, function(el) { return el.id === deck.id; });
    decks.push(deck);
    this.setDecks(decks);
  },

  editLSCard: function(card, cardId, deckId) {
    card.id = cardId;
    var decks = this.getDecks();
    var deck = this.getDeck(deckId);
    var cards = this.removeCard(deck, cardId);
    deck.cards = cards;
    deck.cards.push(card);
    decks = this.removeDeck(deck);
    decks.push(deck);
    this.setDecks(decks);
  }
}

module.exports = Helpers;

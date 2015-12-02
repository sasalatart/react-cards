import React from "react";
import { Router, Route, Link } from "react-router";
var Helper = require('./helpers');

var RemoveForm = React.createClass({
  getInitialState: function() {
    return {type: this.props.type, id: this.props.id};
  },

  handleRemove: function(e) {
    e.preventDefault();
    var decks = Helper.getDecks();
    var deck = Helper.getDeck(this.props.deckId);
    decks = Helper.removeDeck(deck);

    if (this.props.type === 'deck') {
      this.props.onRemove(decks);
    } else {
      deck.cards = Helper.removeCard(deck, this.props.cardId);
      decks.push(deck);
      this.props.onRemove(deck);
    }
    Helper.setDecks(decks);

    return;
  },

  render: function() {
    return (
      <i className="large red close link icon" onClick={this.handleRemove}></i>
    );
  }
})

module.exports = RemoveForm;

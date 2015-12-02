import React from "react";
import { Router, Route, Link } from "react-router";
var DeckForm = require('./DeckForm');
var RemoveForm = require('./RemoveForm');
var Deck = require('./Deck');
var Helper = require('./helpers');

var Table = React.createClass({
  getInitialState: function() {
    var decks = localStorage.getItem("decks");
    if (!decks) {
      return {decks: []};
    } else {
      return {decks: JSON.parse(decks)};
    }
  },

  handleDeckSubmit: function(deck) {
    deck.id = Date.now();
    deck.cards = [];
    this.state.decks.push(deck);
    this.setState({decks: this.state.decks});
    Helper.setDecks(this.state.decks);
  },

  handleDeckRemove: function(decks) {
    this.setState({decks: decks});
  },

  render: function() {
    var deckNodes = this.state.decks.map(function(deck) {
      return (
        <div key={deck.id} className="card ui tall stacked segment">
          <div className="content">
            <div className="header right aligned">
              <RemoveForm type="deck" deckId={deck.id} onRemove={this.handleDeckRemove}></RemoveForm>
            </div>
            <h2 className="center aligned">{deck.name}</h2>
          </div>
          <a href={"#/decks/" + deck.id} className="ui red button">Study</a>
        </div>
      );
    }.bind(this));

    return (
      <div className="ui raised segment">
        <h1 className="ui center aligned red segment">
          ReactCards
        </h1>
        <DeckForm onDeckSubmit={this.handleDeckSubmit}></DeckForm>
        <div className="ui three stackable link cards">
          {deckNodes}
        </div>
      </div>
    );
  }
})

module.exports = Table;

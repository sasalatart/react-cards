import React from "react";
import { Router, Route, Link } from "react-router";
var CardForm = require('./CardForm');
var Card = require('./Card');
var Helper = require('./helpers');

var Deck = React.createClass({
  getInitialState: function() {
    return {deck: Helper.getDeck(this.props.params.id)};
  },

  handleCardSubmit: function(card) {
    card.id = Date.now();
    this.state.deck.cards.push(card);
    this.setState({deck: this.state.deck});
    Helper.createLSCard(this.state.deck);
  },

  handleCardChange: function(deck) {
    this.setState({deck: deck});
  },

  render: function() {
    var cardSize = "ui four stackable cards";
    var fontSize = "small-font";
    switch(this.state.deck.size) {
        case "small":
            cardSize = "ui four stackable cards";
            fontSize = "small-font";
            break;
        case "medium":
            cardSize = "ui three stackable cards";
            fontSize = "medium-font";
            break;
        case "large":
            cardSize = "ui two stackable cards";
            fontSize = "large-font";
            break;
    }

    var cardNodes = this.state.deck.cards.map(function(card) {
      return (
        <Card key={card.id} id={card.id} deckId={this.state.deck.id}
              position={card.position} fontSize={fontSize}
              question={card.question} answer={card.answer}
              onEdit={this.handleCardChange}
              onRemove={this.handleCardChange}></Card>
      );
    }.bind(this));

    var lastPosition = 0;
    if (this.state.deck.cards.length !== 0) {
      lastPosition = parseInt(this.state.deck.cards[this.state.deck.cards.length - 1].position) + 1;
    }

    return (
      <div className="ui raised segment">
        <a href={"/react-cards/#/"} className="ui red button">
          <i className="long arrow left icon"></i>
        </a>
        <h1 className="ui center aligned red segment">
          {this.state.deck.name}
        </h1>
        <CardForm deckId={this.state.deck.id} lastPosition={lastPosition}
                  onCardSubmit={this.handleCardSubmit}></CardForm>
        <div className={cardSize}>
          {cardNodes}
        </div>
      </div>
    );
  }
})

module.exports = Deck;

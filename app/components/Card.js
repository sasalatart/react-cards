import React from "react";
import { Router, Route, Link } from "react-router";
var CardForm = require('./CardForm');
var RemoveForm = require('./RemoveForm');
var Helper = require('./helpers');

var Card = React.createClass({
  getInitialState: function() {
    return {question: this.props.question, answer: this.props.answer, position: this.props.position};
  },

  toggle: function(e) {
    e.preventDefault();
    var card = this.refs.card;
    var toHide = this.refs.question;
    var toShow = this.refs.answer;

    if ($(toHide).hasClass('hidden')) {
      toShow = this.refs.question;
      toHide = this.refs.answer;
    }

    $(card).transition({
      animation  : 'horizontal flip',
      onComplete : function() {
        $(card).transition('horizontal flip');
        $(toShow).removeClass('hidden');
        $(toHide).addClass('hidden');
      }
    });
  },

  handleCardRemove: function(deck) {
    this.props.onRemove(deck);
  },

  toggleEditForm: function() {
    $(this.refs.editForm).transition('horizontal flip');
  },

  handleEditCard: function(card) {
    this.toggleEditForm();
    card.id = this.props.id;
    this.setState({question: card.question, answer: card.answer, position: card.position});
    Helper.editLSCard(card, this.props.id, this.props.deckId);
    this.props.onEdit(Helper.getDeck(this.props.deckId));
  },

  render: function() {
    return (
      <div className="card" ref="card">
        <div className="content center aligned">
          <div className="header left floated">
            <div className={this.props.fontSize}>
              <a className="ui red label">#{this.state.position}</a>
            </div>
          </div>
          <div className="header right floated">
            <div className={this.props.fontSize}>
              <i className="large red edit link icon" ref="editButton" onClick={this.toggleEditForm}></i>
              <RemoveForm type="card" deckId={this.props.deckId} cardId={this.props.id} onRemove={this.handleCardRemove}></RemoveForm>
            </div>
          </div>
          <div ref="question">
            <div className="description">
              <h2 className="ui center aligned icon header">
                <div className={this.props.fontSize}>
                  <i className="red circular icon">Q</i>
                  {this.state.question}
                </div>
              </h2>
              <button className="ui red button" onClick={this.toggle}>
                <span className={this.props.fontSize}>
                  See Answer
                </span>
              </button>
            </div>
          </div>
          <div className="hidden" ref="answer">
            <div className="description">
              <h2 className="ui center aligned icon header">
                <div className={this.props.fontSize}>
                  <i className="red circular icon">A</i>
                  {this.state.answer}
                </div>
              </h2>
              <button className="ui red button" onClick={this.toggle}>
                <span className={this.props.fontSize}>
                  See Question
                </span>
              </button>
            </div>
          </div>
          <div className="hidden" ref="editForm">
            <CardForm question={this.state.question} answer={this.state.answer}
                      position={this.state.position} onCardSubmit={this.handleEditCard}
                      editing="true"></CardForm>
          </div>
        </div>
      </div>
    );
  }
})

module.exports = Card;

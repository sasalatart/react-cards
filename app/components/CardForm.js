import React from "react";
import { Router, Route, Link } from "react-router"
var Helper = require('./helpers');

var CardForm = React.createClass({
  getInitialState: function() {
    if (!this.props.editing) {
      return {editing: false, question: "Enter your question...", answer: "Enter your answer..."};
    } else {
      return {editing: true, question: this.props.question, answer: this.props.answer};
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var question = this.refs.question.value.trim();
    var answer = this.refs.answer.value.trim();
    var position = this.refs.position.value.trim();
    if (!question || !answer || !position) { return; }

    if (!this.state.editing) {
      this.refs.question.value = '';
      this.refs.answer.value = '';
      this.refs.position.defaultValue = this.props.lastPosition + 1;
    }

    this.props.onCardSubmit({question: question, answer: answer, position: position});

    return;
  },

  render: function() {
    if (!this.state.editing) {
      return (
        <div className="ui centered grid">
          <div className="row">
            <div className="ui ten wide column raised segment">
              <form className="ui form" onSubmit={this.handleSubmit}>
                <a className="ui big red ribbon label">Create a Card!</a>
                <div className="two fields">
                  <input type="text" placeholder={this.state.question} ref="question"/>
                  <input type="text" placeholder={this.state.answer} ref="answer"/>
                  <input type="number" value={this.props.lastPosition} ref="position" className="hidden"/>
                  <input type="submit" className="ui inverted red button"/>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="ui horizontal divider">Edit Card</div>
          <form className="ui form" onSubmit={this.handleSubmit}>
            <div className="field">
              <div className="ui pointing below red label">Question</div>
              <input type="text" defaultValue={this.state.question} ref="question"/>
            </div>
            <div className="field">
              <div className="ui pointing below red label">Answer</div>
              <input type="text" defaultValue={this.state.answer} ref="answer"/>
            </div>
            <div className="field">
              <div className="ui pointing below red label">Position</div>
              <input type="number" defaultValue={this.props.position} ref="position"/>
            </div>
            <div className="center aligned">
              <input type="submit" className="ui inverted red button"/>
            </div>
          </form>
        </div>
      );
    }
  }
})

module.exports = CardForm;

import React from "react";
import { Router, Route, Link } from "react-router";

var DeckForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.refs.name.value.trim();
    var size = this.refs.size.value.trim();
    if (!name || !size) { return; }

    this.props.onDeckSubmit({name: name, size: size});
    this.refs.name.value = '';
    this.refs.size.value = 'medium';
    return;
  },

  render: function() {
    return (
      <div className="ui two column centered grid">
        <div className="row">
          <div className="ui raised segment column">
            <form className="ui form" onSubmit={this.handleSubmit}>
            <a className="ui big red ribbon label">Create a Deck!</a>
              <div className="three fields">
                <input type="text" placeholder="Name" ref="name"/>
                <select ref="size">
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
                <input type="submit" className="ui inverted red button"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
})

module.exports = DeckForm;

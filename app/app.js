import React from "react"
import ReactDOM from "react-dom";
import Table from "./components/Table";
import Deck from "./components/Deck";
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';

render((
  <Router>
    <Route path="/" component={Table}></Route>
    <Route path="/decks/:id" component={Deck}></Route>
  </Router>
), document.getElementById("body"));

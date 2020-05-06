import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import Productlist from './components/Productlist'
import Details from './components/Details'
import Cart from './components/Cart'
import Default from './components/Default'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar></Navbar>
        <Productlist></Productlist>
        <Details></Details>
        <Cart></Cart>
        <Default></Default>
      </Fragment>
    );
  }
}

export default App;

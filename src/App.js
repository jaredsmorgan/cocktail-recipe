import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import Recipes from './components/Recipes';

class App extends Component {
  state = {
    recipes: [], //array to populate
    searchTerm: ''
  };

  //<--- freeCodeCamp --->
  getRecipe = async e => {
    e.preventDefault(); //prevent default behaviour

    const api_call = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.state.searchTerm}`
    );
    const data = await api_call.json();
    this.setState({ recipes: data.drinks }); // data pulled
  };

  // call back items
  componentDidMount = () => {
    const json = localStorage.getItem('recipes');
    const recipes = JSON.parse(json);
    this.setState({ recipes });
  };

  // store items
  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem('recipes', recipes);
  };
  onChange = e => {
    this.setState({ searchTerm: e.target.value }); //dynamic searching
  };

  //<--- stack overflow --->
  render() {
    // const { recipes } = this.state;  You weren't using this variable. You could deconstruct

    return (
      <div className='app'>
        <header className='app-header'>
          <div className='overlay'></div>
          <img className='app-header-logo' src='logo.svg' alt='logo' />
        </header>
        <Form getRecipe={this.getRecipe} onChange={this.onChange} />
        <Recipes recipes={this.state.recipes} />
        <footer className='footer'>
          <div className='credits'>
            © 2020 Designed & Built by{' '}
            <a href='https://rixiobarrios.github.io'>Rixio Barrios</a> using
          </div>
          <a href='https://www.thecocktaildb.com/'>
            <img className='logo' src='api.svg' alt='logo' />
          </a>
        </footer>
      </div>
    );
  }
}

export default App;

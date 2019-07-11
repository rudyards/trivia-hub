import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getAllCategories } from '../../services/trivia-api';
import GamePage from '../Game/GamePage';

class App extends Component  {

    state = {
        categories: []
    }

    getCategory = (idx) => {
        return this.state.categories[idx]
    }

    async componentDidMount(){
        const categories = await getAllCategories();
        this.setState({ categories: categories.trivia_categories})
    }

    render() {
        return (
            <div className="App">
              <header className="App-header">Trivia Hub</header>
              <Switch>
              <Route exact path='/' render={() => 
                <section>
                Welcome To Trivia Hub!

                <br/>Difficulty:
                <select name="difficulty">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
                </select>

                <br/>Category:
                <select name="category">
                {this.state.categories.map((category) =>
                    <option value={category.id}>{category.name}</option>
                    )}

                </select>


                <option value=""></option>
                </section>
                }/>
                <Route path='/Game/' render={(props) => 
                    <GamePage />
                }/>
              </Switch>
            </div>
          );
    }

}

export default App;

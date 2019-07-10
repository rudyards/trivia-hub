import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import GamePage from '../Game/GamePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">Trivia Hub</header>
      <Switch>
      <Route exact path='/' render={() => 
        <section>
        Welcome To Trivia Hub!

        <br/>Difficulty:

        <br/>Category:
        </section>
        }/>
        <Route path='/Game/' render={(props) => 
            <GamePage />
        }/>
      </Switch>
    </div>
  );
}

export default App;

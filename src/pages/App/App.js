import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { getAllCategories } from '../../services/trivia-api';
import GamePage from '../Game/GamePage';
import GameForm from '../../components/GameForm/GameForm'
import NavBar from '../../components/NavBar/NavBar'
import SignupPage from '../Signup/SignupPage';
import LoginPage from '../Login/LoginPage';
import userService from '../../utils/userService';
import tokenService from '../../utils/tokenService';

class App extends Component  {

    state = {
        categories: [],
        user: userService.getUser()
    }

    getCategory = (idx) => {
        return this.state.categories[idx]
    }

    async componentDidMount(){
        const categories = await getAllCategories();
        this.setState({ categories: categories.trivia_categories})
    }

    handleLogout = () => {
      userService.logout();
      this.setState({ user: null });
    }

    handleSignupOrLogin = () => {
      this.setState({user: userService.getUser()});
    }


    render() {
        return (
            <div className="App">
              <header className="App-header">Trivia Hub</header>
              <NavBar user={this.state.user} handleLogout = {this.handleLogout} />
              <br />
              <Switch>
              <Route exact path='/' render={() => 
                <section>


                Welcome To Trivia Hub!

                <GameForm categories={this.state.categories}/>

                </section>
                }/>
                <Route path='/game' render={(props) => 
                    <GamePage />
                }/>
                  <Route exact path='/signup' render={({ history }) => 
                    <SignupPage
                      history={history}
                      handleSignupOrLogin={this.handleSignupOrLogin}
                    />
                  }/>
                <Route exact path='/login' render={({ history }) => 
                  <LoginPage
                    history={history}
                    handleSignupOrLogin={this.handleSignupOrLogin}
                  />
                }/>


              </Switch>
            </div>
          );
    }

}

export default App;

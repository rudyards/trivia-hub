import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { getAllCategories, getQuestions } from '../../services/trivia-api';
import GamePage from '../Game/GamePage';
import GameForm from '../../components/GameForm/GameForm'
import NavBar from '../../components/NavBar/NavBar'
import SignupPage from '../Signup/SignupPage';
import LoginPage from '../Login/LoginPage';
import HighScores from '../HighScores/HighScores';
import userService from '../../utils/userService';
import tokenService from '../../utils/tokenService';
import scoresService from '../../utils/scoresService';

class App extends Component  {

    state = {
        categories: [],
        user: userService.getUser(),
        difficulty: 'easy',
        categoryString: '',
        category: 9,
        scores: []
    }

    getCategory = (idx) => {
        return this.state.categories[idx]
    }

    async componentDidMount(){
        const categories = await getAllCategories();
        this.setState({ categories: categories.trivia_categories})
        const scores = await scoresService.index();
        this.setState({ scores });
    }

    handleLogout = () => {
      userService.logout();
      this.setState({ user: null });
    }

    handleSignupOrLogin = () => {
      this.setState({user: userService.getUser()});
    }

    handleGameChange = (e) => {
      this.setState({
        // Using ES2015 Computed Property Names
        [e.target.name]: e.target.value
      });
    }

    handleUpdateScores = (scores) => {
      this.setState({ scores });
    }


    handleGameStart = async (e) => {
        e.preventDefault()
        localStorage.setItem('difficulty', this.state.difficulty);
        localStorage.setItem('category', this.state.category);
        localStorage.setItem('categoryString', this.state.categories.find(o => o.id === this.state.category).name)
        console.log(localStorage.categoryString)
        window.location="/game"
    }


    render() {
        return (
            <div className="App">
              <header className="App-header"><Link to='/'>Trivia Hub</Link></header>
              <NavBar user={this.state.user} handleLogout = {this.handleLogout} />
              <br />
              <Switch>
              <Route exact path='/' render={() => 
                <section>


                Welcome To Trivia Hub!

                <GameForm categories={this.state.categories} 
                handleGameChange={this.handleGameChange.bind(this)} handleGameStart={this.handleGameStart.bind(this)}/>

                </section>
                }/>
                <Route path='/game' render={(props) => 
                    <GamePage user={this.state.user} difficulty={localStorage.difficulty} category={localStorage.category} categoryString={localStorage.categoryString} />
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
                <Route exact path='/high-scores' render={() => 
                  userService.getUser() ? 
                    <HighScores
                      user={this.state.user}
                      handleUpdateScores={this.handleUpdateScores}
                      scores={this.state.scores}
                    />
                  :
                    <Redirect to='/login'/>
                }/>


              </Switch>
            </div>
          );
    }

}

export default App;

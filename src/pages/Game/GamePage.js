import React, { Component } from 'react';
import './Game.css';
import { getQuestions } from '../../services/trivia-api';

class GamePage extends Component {

    async componentDidMount(){
        const questions = await getQuestions(this.props.difficulty, this.props.category);
        console.log(questions)
    }

    render(props){
    return (
        <div className="GamePage">
            Here's the GamePage
        </div>
    );
    }
}

export default GamePage;

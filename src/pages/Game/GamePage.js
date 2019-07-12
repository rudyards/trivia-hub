import React, { Component } from 'react';
import './Game.css';
import { getQuestions } from '../../services/trivia-api';

class GamePage extends Component {

    state = {
        questions: [],
        score: 0
    }

    async componentDidMount(){
        const theseQuestions = await getQuestions(this.props.difficulty, this.props.category);
        this.setState({questions: theseQuestions.results})
    }

    handleCorrectGuess = (e) => {
        e.preventDefault()
        e.currentTarget.parentElement.setAttribute("style", "display: none");
        this.setState({score: this.state.score+1})
        console.log(this.state.score)
    }

    handleIncorrectGuess = (e) => {
        e.preventDefault()
        e.currentTarget.parentElement.setAttribute("style", "display: none");
    }

    render(props){
        const renderHTML = (escapedHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: escapedHTML } });

        return (
            <div className="GamePage">
                Here's the GamePage
                

                { this.state.questions.map((q, idx) =>
                    <span name={idx}>
                    
                    {renderHTML(q.question)}
                    <button name="correct" onClick={this.handleCorrectGuess}>{renderHTML(q.correct_answer)}</button>
                    {q.incorrect_answers.map((a, i) =>
                        <button name="incorrect" onClick={this.handleIncorrectGuess}>{renderHTML(a)}</button>
                        )}
                    
                    </span>
                    )}
                <br/><p name="score">Your Score: {this.state.score}</p>
            </div>
        );
    }
}

export default GamePage;

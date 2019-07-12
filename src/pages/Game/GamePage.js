import React, { Component } from 'react';
import './Game.css';
import { getQuestions } from '../../services/trivia-api';

class GamePage extends Component {

    state = {
        questions: []
    }

    async componentDidMount(){
        const theseQuestions = await getQuestions(this.props.difficulty, this.props.category);
        this.setState({questions: theseQuestions.results})
    }

    handleGuess = (e) => {
        e.preventDefault()
        e.currentTarget.parentElement.setAttribute("style", "display: none");
        console.log(e.currentTarget.parentElement)
    }

    render(props){
        const renderHTML = (escapedHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: escapedHTML } });

        return (
            <div className="GamePage">
                Here's the GamePage
                

                { this.state.questions.map((q, idx) =>
                    <span name={idx}>
                    
                    {renderHTML(q.question)}
                    <button name="correct" onClick={this.handleGuess}>{renderHTML(q.correct_answer)}</button>
                    {q.incorrect_answers.map((a, i) =>
                        <button name="incorrect" onClick={this.handleGuess}>{renderHTML(a)}</button>
                        )}
                    
                    </span>
                    )}
                
            </div>
        );
    }
}

export default GamePage;
